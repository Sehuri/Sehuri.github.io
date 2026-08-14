"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { albumTimeline, featuredAlbum } from "./albumData";
import { films } from "./filmData";
import { gardenNotes } from "./noteData";
import { murakamiBooks } from "./murakamiData";
import { bookRecommendations } from "./recommendationData";

type SearchItem = {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  keywords: string;
};

const localItems: SearchItem[] = [
  featuredAlbum,
  ...albumTimeline,
].map((album) => ({
  id: `album-${album.artist}-${album.title}`,
  type: "唱片",
  title: album.title,
  subtitle: `${album.artist} · ${album.year}`,
  description: album.note,
  href: "#records",
  keywords: `${album.title} ${album.artist} ${album.year} ${album.description} ${album.tracks.join(" ")}`,
})).concat(
  films.map((film) => ({
    id: `film-${film.slug}`,
    type: film.format ?? "电影",
    title: film.title,
    subtitle: `${film.director} · ${film.year}`,
    description: film.note,
    href: "#films",
    keywords: `${film.title} ${film.originalTitle} ${film.format ?? "电影"} 影视 剧集 ${film.director} ${film.country} ${film.genres.join(" ")} ${film.summary}`,
  })),
  murakamiBooks.map((book) => ({
    id: `murakami-${book.title}`,
    type: "书籍",
    title: book.title,
    subtitle: `村上春树 · ${book.year}`,
    description: book.personalNote,
    href: "#murakami",
    keywords: `${book.title} ${book.originalTitle} 村上春树 ${book.publisher ?? ""} ${book.themes.join(" ")} ${book.summary}`,
  })),
  bookRecommendations.map((book) => ({
    id: `reading-${book.title}`,
    type: "书籍",
    title: book.title.replace(/[《》]/g, ""),
    subtitle: book.meta,
    description: book.description,
    href: book.href,
    keywords: `${book.title} ${book.meta} ${book.description}`,
  })),
  gardenNotes.map((note) => ({
    id: `note-${note.slug}`,
    type: "手记",
    title: note.title,
    subtitle: `${note.category} · ${note.date}`,
    description: note.excerpt,
    href: "#notes",
    keywords: `${note.title} ${note.category} ${note.excerpt} ${note.paragraphs.join(" ")}`,
  })),
);

const normalize = (value: string) => value.toLocaleLowerCase("zh-CN").replace(/[《》·，。！？：；、\s_-]/g, "");
const typeOrder = ["城市", "书籍", "唱片", "电影", "电视剧", "知识", "手记"];

export default function GlobalExperience() {
  const [theme, setTheme] = useState<"night" | "day">("night");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [externalItems, setExternalItems] = useState<SearchItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("shenhuili-theme");
    const initial = stored === "day" ? "day" : "night";
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
    fetch("/search-external.json").then((response) => response.json()).then(setExternalItems).catch(() => setExternalItems([]));
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => { document.body.style.overflow = overflow; };
  }, [searchOpen]);

  const allItems = useMemo(() => [...localItems, ...externalItems], [externalItems]);
  const results = useMemo(() => {
    const needle = normalize(query);
    if (!needle) return [];
    return allItems.filter((item) => normalize(`${item.type}${item.title}${item.subtitle}${item.description}${item.keywords}`).includes(needle));
  }, [allItems, query]);
  const grouped = typeOrder.map((type) => ({ type, items: results.filter((item) => item.type === type) })).filter((group) => group.items.length);
  const counts = typeOrder.map((type) => ({ type, count: allItems.filter((item) => item.type === type).length })).filter((item) => item.count);

  const switchTheme = () => {
    const next = theme === "night" ? "day" : "night";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("shenhuili-theme", next);
  };

  return (
    <>
      <div className="global-tools">
        <button className="search-trigger" type="button" onClick={() => setSearchOpen(true)} aria-label="搜索全部收藏"><span aria-hidden="true">⌕</span><i>搜索</i><kbd>⌘ K</kbd></button>
        <button className="theme-trigger" type="button" onClick={switchTheme} aria-label={theme === "night" ? "切换到白天模式" : "切换到夜晚模式"}><span aria-hidden="true">{theme === "night" ? "☼" : "☾"}</span><i>{theme === "night" ? "白天" : "夜晚"}</i></button>
      </div>

      {searchOpen ? (
        <div className="search-backdrop" onMouseDown={() => setSearchOpen(false)}>
          <section className="search-panel" role="dialog" aria-modal="true" aria-labelledby="global-search-title" onMouseDown={(event) => event.stopPropagation()}>
            <header><div><p>SEARCH THE GARDEN</p><h2 id="global-search-title">在庭院里寻找</h2></div><button type="button" onClick={() => setSearchOpen(false)} aria-label="关闭全局搜索">×</button></header>
            <label className="search-input"><span aria-hidden="true">⌕</span><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索城市、书、唱片、电影、知识或手记……" /><kbd>ESC</kbd></label>
            <div className="search-body">
              {!query ? (
                <div className="search-intro"><p>一只搜索框，穿过整座庭院。</p><div>{counts.map((item) => <button type="button" key={item.type} onClick={() => setQuery(item.type)}><strong>{item.count}</strong><span>{item.type}</span></button>)}</div><small>试试搜索“村上”“上海”“时间”或一位歌手。</small></div>
              ) : grouped.length ? grouped.map((group) => (
                <section className="search-group" key={group.type}><header><h3>{group.type}</h3><span>{group.items.length}</span></header><div>{group.items.map((item) => <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined} key={item.id} onClick={() => setSearchOpen(false)}><small>{item.type}</small><h4>{item.title}</h4><span>{item.subtitle}</span><p>{item.description}</p><i>↗</i></a>)}</div></section>
              )) : <div className="search-empty"><span>○</span><h3>没有找到这件收藏</h3><p>换一个更短的词试试，也许它藏在另一条路上。</p></div>}
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
