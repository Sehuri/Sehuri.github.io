"use client";

import { useState } from "react";

const todayNotes = [
  {
    index: "01",
    kind: "最近足迹",
    title: "绍兴",
    meta: "2026.06.26 · 中国",
    description: "在乌篷船与青石板路之间，感受古越水乡。",
    href: "https://sehuri.github.io/travel-map/#memories",
    action: "沿时间重走",
    tone: "travel",
  },
  {
    index: "02",
    kind: "正在阅读",
    title: "《潮骚》",
    meta: "三岛由纪夫 · 已读 10%",
    description: "最近停留在这本书里，让海风继续翻动下一页。",
    href: "https://yueji-reading-room.shenhuil.chatgpt.site",
    action: "回到阅览室",
    tone: "reading",
  },
  {
    index: "03",
    kind: "最近收录",
    title: "Kimi K3",
    meta: "开放模型 · 2026.07.29",
    description: "从模型权重到开放技术栈，继续理解智能如何生长。",
    href: "https://sehuri.github.io/Sehuri-knowledge-wiki/",
    action: "进入知识花园",
    tone: "knowledge",
  },
] as const;

const wanderStops = [
  {
    eyebrow: "TRAVEL · MAP",
    title: "把旅程摊开来看",
    description: "去地图上看看，过去的足迹如何连成一片。",
    href: "https://sehuri.github.io/travel-map/#map-section",
    action: "前往旅行地图",
  },
  {
    eyebrow: "TRAVEL · MEMORY",
    title: "沿时间，重走一遍",
    description: "从某一年出发，重新遇见一座走过的城市。",
    href: "https://sehuri.github.io/travel-map/#memories",
    action: "翻开旅行时间线",
  },
  {
    eyebrow: "TRAVEL · NEXT",
    title: "仍在期待的远方",
    description: "看看下一段旅程，也许会从一个念头开始。",
    href: "https://sehuri.github.io/travel-map/#wishlist",
    action: "看看下一站",
  },
  {
    eyebrow: "READING · SHELF",
    title: "在书架间停一会儿",
    description: "从最近读过的书里，随机接住一句新的回声。",
    href: "https://yueji-reading-room.shenhuil.chatgpt.site#shelf",
    action: "走进阅览室",
  },
  {
    eyebrow: "READING · NOTES",
    title: "重读一段留下的线",
    description: "去读书笔记里，看看哪句话曾让我停下来。",
    href: "https://yueji-reading-room.shenhuil.chatgpt.site",
    action: "翻看阅读痕迹",
  },
  {
    eyebrow: "KNOWLEDGE · GARDEN",
    title: "从一个概念出发",
    description: "走进知识之间的缝隙，看看它们如何彼此连接。",
    href: "https://sehuri.github.io/Sehuri-knowledge-wiki/",
    action: "漫游知识花园",
  },
] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function GardenFeatures() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const chooseStop = () => {
    let next = Math.floor(Math.random() * wanderStops.length);
    if (wanderStops.length > 1 && next === selectedIndex) {
      next = (next + 1) % wanderStops.length;
    }
    setSelectedIndex(next);
  };

  const selected = selectedIndex === null ? null : wanderStops[selectedIndex];

  return (
    <section className="garden-today" id="today">
      <header className="garden-heading">
        <div>
          <p className="section-kicker">TODAY IN THE GARDEN</p>
          <h2>今日庭院</h2>
        </div>
        <div className="garden-date">
          <span>2026.07.30</span>
          <i />
          <p>
            三处空间，在今天相遇。
            <br />
            看看最近留下了什么。
          </p>
        </div>
      </header>

      <div className="garden-layout">
        <div className="today-list">
          {todayNotes.map((note) => (
            <a
              className={`today-note ${note.tone}`}
              href={note.href}
              key={note.kind}
              aria-label={`${note.kind}：${note.title}，${note.action}`}
            >
              <div className="today-index">
                <span>{note.index}</span>
                <i />
              </div>
              <div className="today-copy">
                <p>{note.kind}</p>
                <h3>{note.title}</h3>
                <span>{note.meta}</span>
                <small>{note.description}</small>
              </div>
              <strong>
                {note.action} <Arrow />
              </strong>
            </a>
          ))}
        </div>

        <aside className="wander-card" id="wander">
          <div className="wander-moons" aria-hidden="true">
            <span />
            <span />
          </div>
          <p className="wander-eyebrow">A RANDOM WALK</p>
          <h2>随便走走</h2>
          <div className="wander-result" aria-live="polite">
            {selected ? (
              <>
                <span>{selected.eyebrow}</span>
                <h3>{selected.title}</h3>
                <p>{selected.description}</p>
              </>
            ) : (
              <>
                <span>WHERE TO NEXT?</span>
                <h3>今晚，想去哪里？</h3>
                <p>让两个月亮替你选一处，旅行、阅读或知识都可能出现。</p>
              </>
            )}
          </div>
          <div className="wander-actions">
            <button type="button" onClick={chooseStop}>
              {selected ? "再选一处" : "替我选一处"}
              <span aria-hidden="true">✦</span>
            </button>
            {selected ? (
              <a href={selected.href}>
                {selected.action} <Arrow />
              </a>
            ) : null}
          </div>
          <small>每一次漫游，都是进入深绘里的另一条路。</small>
        </aside>
      </div>
    </section>
  );
}
