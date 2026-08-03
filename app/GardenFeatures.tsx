"use client";

import { useMemo, useState } from "react";
import { albumTimeline, featuredAlbum } from "./albumData";
import { bookRecommendations, knowledgeRecommendations, travelRecommendations, type RecommendationItem } from "./recommendationData";

type TodayNote = RecommendationItem & {
  index: string;
  kind: string;
  action: string;
  tone: "travel" | "reading" | "knowledge" | "music";
};

const wanderStops = [
  { eyebrow: "TRAVEL · MAP", title: "把旅程摊开来看", description: "去地图上看看，过去的足迹如何连成一片。", href: "https://sehuri.github.io/travel-map/#map-section", action: "前往旅行地图" },
  { eyebrow: "TRAVEL · MEMORY", title: "沿时间，重走一遍", description: "从某一年出发，重新遇见一座走过的城市。", href: "https://sehuri.github.io/travel-map/#memories", action: "翻开旅行时间线" },
  { eyebrow: "READING · SHELF", title: "在书架间停一会儿", description: "从最近读过的书里，随机接住一句新的回声。", href: "https://yueji-reading-room.shenhuil.chatgpt.site#shelf", action: "走进阅览室" },
  { eyebrow: "KNOWLEDGE · GARDEN", title: "从一个概念出发", description: "走进知识之间的缝隙，看看它们如何彼此连接。", href: "https://sehuri.github.io/Sehuri-knowledge-wiki/", action: "漫游知识花园" },
  { eyebrow: "MUSIC · TWO MOONS", title: "等两个月亮升起", description: "从永远排在第一位的 1Q84 OST，进入深绘里的声音世界。", href: "#records", action: "去听潮" },
  { eyebrow: "MUSIC · RECORDS", title: "从一张旧唱片开始", description: "沿着唱片时间线，随机遇见一段熟悉的旋律。", href: "#records", action: "翻看唱片收藏" },
] as const;

function Arrow() { return <span aria-hidden="true">↗</span>; }

const todayLabel = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric", month: "2-digit", day: "2-digit", timeZone: "Asia/Shanghai",
}).format(new Date()).replaceAll("/", ".");
const dailySeed = Number(todayLabel.replaceAll(".", ""));

function pick<T>(items: readonly T[], seed: number, salt: number) {
  let value = (seed + salt * 2654435761) >>> 0;
  value ^= value >>> 16;
  value = Math.imul(value, 2246822519) >>> 0;
  value ^= value >>> 13;
  return items[value % items.length];
}

function makeTodayNotes(seed: number): TodayNote[] {
  const travel = pick(travelRecommendations, seed, 1);
  const book = pick(bookRecommendations, seed, 2);
  const knowledge = pick(knowledgeRecommendations, seed, 3);
  const album = pick([featuredAlbum, ...albumTimeline], seed, 4);
  return [
    { ...travel, index: "01", kind: "足迹推荐", action: "重走这段旅程", tone: "travel" },
    { ...book, index: "02", kind: "书架推荐", action: "去书架看看", tone: "reading" },
    { ...knowledge, index: "03", kind: "知识推荐", action: "进入知识花园", tone: "knowledge" },
    { title: `《${album.title}》`, meta: `${album.artist} · ${album.year}`, description: album.note, href: "#records", index: "04", kind: "唱片推荐", action: "去唱片室", tone: "music" },
  ];
}

export default function GardenFeatures() {
  const [seed, setSeed] = useState(dailySeed);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const todayNotes = useMemo(() => makeTodayNotes(seed), [seed]);
  const chooseStop = () => {
    let next = Math.floor(Math.random() * wanderStops.length);
    if (wanderStops.length > 1 && next === selectedIndex) next = (next + 1) % wanderStops.length;
    setSelectedIndex(next);
  };
  const selected = selectedIndex === null ? null : wanderStops[selectedIndex];

  return (
    <section className="garden-today" id="today">
      <header className="garden-heading">
        <div><p className="section-kicker">TODAY IN THE GARDEN</p><h2>今日推荐</h2></div>
        <div className="garden-date">
          <span>{todayLabel}</span><i />
          <div><p>从四处空间，各抽取一份今天的相遇。</p>
            <button className="garden-refresh" type="button" onClick={() => setSeed(Date.now() + Math.floor(Math.random() * 100000))}>换一组推荐 <span aria-hidden="true">✦</span></button>
          </div>
        </div>
      </header>

      <div className="garden-layout"><div className="today-list">
        {todayNotes.map((note) => (
          <a className={`today-note ${note.tone}`} href={note.href} key={note.tone} aria-label={`${note.kind}：${note.title}，${note.action}`}>
            <div className="today-index"><span>{note.index}</span><i /></div>
            <div className="today-copy"><p>{note.kind}</p><h3>{note.title}</h3><span>{note.meta}</span><small>{note.description}</small></div>
            <strong>{note.action} <Arrow /></strong>
          </a>
        ))}
      </div>
      <aside className="wander-card" id="wander">
        <div className="wander-moons" aria-hidden="true"><span /><span /></div>
        <p className="wander-eyebrow">A RANDOM WALK</p><h2>随便走走</h2>
        <div className="wander-result" aria-live="polite">
          {selected ? <><span>{selected.eyebrow}</span><h3>{selected.title}</h3><p>{selected.description}</p></> : <><span>WHERE TO NEXT?</span><h3>今晚，想去哪里？</h3><p>让两个月亮替你选一处，旅行、阅读、知识或音乐都可能出现。</p></>}
        </div>
        <div className="wander-actions">
          <button type="button" onClick={chooseStop}>{selected ? "再选一处" : "替我选一处"}<span aria-hidden="true">✦</span></button>
          {selected ? <a href={selected.href}>{selected.action} <Arrow /></a> : null}
        </div>
        <small>每一次漫游，都是进入深绘里的另一条路。</small>
      </aside></div>
    </section>
  );
}
