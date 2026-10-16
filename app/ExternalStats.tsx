"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type TravelVisit = { name: string; country: string; date?: string; desc?: string };
type WikiEntry = { id: string; title: string; author?: string; summary?: string; topics?: string[]; concepts?: string[] };
type TravelStats = { cities: number; countries: number; visits: TravelVisit[] };
type ReadingStats = { annualRead: number; publicBooks: number };
type WikiStats = { entries: number; items: WikiEntry[] };
type SourceState<T> = T | null | undefined;

type ExternalStats = {
  travel: SourceState<TravelStats>;
  reading: SourceState<ReadingStats>;
  wiki: SourceState<WikiStats>;
};

const ExternalStatsContext = createContext<ExternalStats>({
  travel: undefined,
  reading: undefined,
  wiki: undefined,
});

declare global {
  interface Window {
    TRAVEL_DATA?: { visits?: Array<{ name?: string; country?: string; date?: string; desc?: string }> };
  }
}

function asCount(value: unknown): number | null {
  if (typeof value !== "number" && typeof value !== "string") return null;
  const normalized = String(value).replaceAll(",", "").trim().replace(/\s*本$/, "");
  if (!/^\d+$/.test(normalized)) return null;
  const count = Number(normalized);
  return Number.isSafeInteger(count) ? count : null;
}

function decodeGitHubContent(encoded: string): string {
  const bytes = Uint8Array.from(atob(encoded.replaceAll("\n", "")), (character) => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

async function githubFile(repository: string, path: string): Promise<string> {
  const response = await fetch(`https://api.github.com/repos/Sehuri/${repository}/contents/${path}?ref=main`, {
    headers: { Accept: "application/vnd.github+json" },
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error(`GitHub data request failed: ${response.status}`);
  const body = await response.json() as { content?: string };
  if (!body.content) throw new Error("GitHub data is empty");
  return decodeGitHubContent(body.content);
}

function travelFromVisits(visits: Array<{ name?: string; country?: string; date?: string; desc?: string }>): TravelStats {
  const valid = visits.filter((visit): visit is TravelVisit => typeof visit.name === "string" && !!visit.name.trim() && typeof visit.country === "string" && !!visit.country.trim());
  if (!valid.length || valid.length !== visits.length) throw new Error("Travel records are incomplete");
  return { cities: valid.length, countries: new Set(valid.map((visit) => visit.country)).size, visits: valid };
}

function parseTravelVisits(source: string): TravelVisit[] {
  const section = source.match(/visits:\s*\[([\s\S]*?)\n  \],\s*\n  [A-Za-z]\w*:/)?.[1];
  if (!section) throw new Error("Travel records were not found");
  const field = (row: string, key: string): string | undefined => {
    const value = row.match(new RegExp(`${key}:\\s*("(?:\\\\.|[^"\\\\])*")`))?.[1];
    return value ? JSON.parse(value) as string : undefined;
  };
  return section.split("\n").filter((row) => /^\s*\{\s*name:/.test(row)).map((row) => ({
    name: field(row, "name") ?? "",
    country: field(row, "country") ?? "",
    date: field(row, "date"),
    desc: field(row, "desc"),
  }));
}

async function travelStats(): Promise<TravelStats> {
  try {
    const visits = await new Promise<Array<{ name?: string; country?: string; date?: string; desc?: string }>>((resolve, reject) => {
      if (window.TRAVEL_DATA?.visits) return resolve(window.TRAVEL_DATA.visits);
      const script = document.createElement("script");
      const timeout = window.setTimeout(() => reject(new Error("Travel data request timed out")), 12000);
      script.src = `https://sehuri.github.io/travel-map/assets/data.js?sync=${Date.now()}`;
      script.async = true;
      script.onload = () => {
        window.clearTimeout(timeout);
        window.TRAVEL_DATA?.visits ? resolve(window.TRAVEL_DATA.visits) : reject(new Error("Travel data is missing"));
      };
      script.onerror = () => {
        window.clearTimeout(timeout);
        reject(new Error("Travel data could not be loaded"));
      };
      document.head.appendChild(script);
    });
    return travelFromVisits(visits);
  } catch {
    // The public repository is a fallback when a browser blocks the deployed script.
    const source = await githubFile("travel-map", "assets/data.js");
    return travelFromVisits(parseTravelVisits(source));
  }
}

async function readingStats(): Promise<ReadingStats> {
  const response = await fetch("https://sehuri.github.io/Reading-room/data.json", {
    cache: "no-cache",
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error(`Reading data request failed: ${response.status}`);
  const data = await response.json() as {
    generatedAt?: string;
    stats?: { annualRead?: unknown; publicBooks?: unknown };
  };
  const annualRead = asCount(data.stats?.annualRead);
  const publicBooks = asCount(data.stats?.publicBooks);
  if (!data.generatedAt || annualRead === null || publicBooks === null) throw new Error("Reading data is incomplete");
  return { annualRead, publicBooks };
}

function parseWikiStats(source: string): WikiStats {
  const json = source.match(/export const publicWikiData\s*=\s*({[\s\S]*})\s+as const;?\s*$/)?.[1];
  if (!json) throw new Error("Wiki index was not found");
  const data = JSON.parse(json) as { items?: unknown };
  if (!Array.isArray(data.items)) throw new Error("Wiki index is incomplete");
  const items = data.items.filter((item): item is WikiEntry => typeof item?.id === "string" && typeof item?.title === "string");
  if (items.length !== data.items.length) throw new Error("Wiki index has invalid entries");
  return { entries: items.length, items };
}

async function wikiStats(): Promise<WikiStats> {
  try {
    const response = await fetch("https://raw.githubusercontent.com/Sehuri/Sehuri-knowledge-wiki/main/pages/wiki-public-data.ts", {
      cache: "no-cache",
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) throw new Error(`Wiki data request failed: ${response.status}`);
    return parseWikiStats(await response.text());
  } catch {
    return parseWikiStats(await githubFile("Sehuri-knowledge-wiki", "pages/wiki-public-data.ts"));
  }
}

export function ExternalStatsProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<ExternalStats>({ travel: undefined, reading: undefined, wiki: undefined });

  useEffect(() => {
    let active = true;
    const load = <K extends keyof ExternalStats>(key: K, request: Promise<NonNullable<ExternalStats[K]>>) => {
      request.then(
        (value) => { if (active) setStats((current) => ({ ...current, [key]: value })); },
        () => { if (active) setStats((current) => ({ ...current, [key]: null })); },
      );
    };
    load("travel", travelStats());
    load("reading", readingStats());
    load("wiki", wikiStats());
    return () => { active = false; };
  }, []);

  return <ExternalStatsContext.Provider value={stats}>{children}</ExternalStatsContext.Provider>;
}

export function useExternalStats() {
  return useContext(ExternalStatsContext);
}

export function ExternalStatValue({ kind }: { kind: "travel" | "reading" | "wiki" }) {
  const stats = useExternalStats();
  const value = kind === "travel" ? stats.travel?.cities : kind === "reading" ? stats.reading?.annualRead : stats.wiki?.entries;
  return <span className="external-stat-number" aria-live="polite">{value ?? "—"}</span>;
}

export function ExternalSpaceDetail({ kind }: { kind: "travel" | "reading" | "wiki" }) {
  const stats = useExternalStats();
  const source = stats[kind];
  if (source === undefined) return <>正在同步最新数据</>;
  if (source === null) return <>暂无法读取最新数据</>;
  if (kind === "travel") return <>{stats.travel!.cities} 座城市 · {stats.travel!.countries} 个国家</>;
  if (kind === "reading") return <>公开书架 {stats.reading!.publicBooks} 本 · 持续更新</>;
  return <>收录 {stats.wiki!.entries} 条内容 · 持续更新</>;
}
