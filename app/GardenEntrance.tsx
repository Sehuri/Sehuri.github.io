"use client";
import { useRef, type MouseEvent } from "react";
import { IconArrowUpRight, IconArrowRight, IconMenu2 } from "@tabler/icons-react";
import GlobalExperience from "./GlobalExperience";
import HeroMoonExperience from "./HeroMoonExperience";
import ThemeJourneys from "./ThemeJourneys";
import { gardenDeepLinkEvent, searchTargetId } from "./deepLinks";
import { gardenNotes } from "./noteData";

const destinations = [
  ["远行", "https://sehuri.github.io/travel-map/"],
  ["阅迹", "https://yueji-reading-room.shenhuil.chatgpt.site"],
  ["知庭", "https://sehuri.github.io/Sehuri-knowledge-wiki/"],
  ["听潮", "#records"], ["光影", "#films"], ["手记", "#notes"], ["村上书房", "#murakami"],
] as const;
export function SpaceDirectory({ className = "" }: { className?: string }) {
  return <nav className={`entrance-directory ${className}`} aria-label="浏览收藏空间">{destinations.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</nav>;
}
function openCollection(event: MouseEvent<HTMLAnchorElement>, target: string) {
  event.preventDefault();
  window.history.replaceState(null, "", `#${target}`);
  window.dispatchEvent(new CustomEvent(gardenDeepLinkEvent, { detail: target }));
}
export default function GardenEntrance() {
  const menu = useRef<HTMLDetailsElement>(null);
  const geography = gardenNotes.find((note) => note.slug === "geography-underfoot")!;
  const bookId = searchTargetId("murakami", "世界尽头与冷酷仙境");
  const albumId = searchTargetId("album", "原声音乐-1Q84 OST");
  const noteId = searchTargetId("note", geography.slug);
  const latestId = searchTargetId("note", gardenNotes[0].slug);
  return <div className="garden-entrance" id="top">
    <div className="entrance-landscape night-only"><picture><source media="(max-width:760px)" srcSet="/garden/night-landscape-mobile.webp" /><img src="/garden/night-landscape.webp" alt="" width="1600" height="1120" fetchPriority="high" /></picture><HeroMoonExperience /></div>
    <div className="entrance-frontispiece">
    <div className="entrance-day-landscape day-only" aria-hidden="true"><img src="/garden/day-landscape.webp" alt="" width="1672" height="941" fetchPriority="high" /></div>
    <header className="entrance-masthead">
      <a className="entrance-wordmark" href="#top" aria-label="深绘里首页"><span className="entrance-seal" aria-hidden="true">深</span><span><strong>深绘里</strong><small>SEHURI&apos;S DIGITAL GARDEN</small></span></a>
      <nav className="entrance-nav" aria-label="主导航"><a href="/now/">此刻</a><a href="#spaces">空间</a><a href="#journeys">漫游</a><a href="#about">关于</a></nav>
      <GlobalExperience />
      <details className="entrance-mobile-menu" ref={menu}><summary aria-label="打开导航菜单"><IconMenu2 size={23} stroke={1.3} /></summary><nav aria-label="手机导航" onClick={() => { if (menu.current) menu.current.open = false; }}><a href="#top">返回庭院</a><a href="/now/">此刻</a><a href="#spaces">我的空间</a><a href="#journeys">主题漫游</a><a href="#about">关于我</a><a href="#contact">与我相遇</a></nav></details>
    </header>
    <div className="entrance-night-intro night-only">
      <p className="entrance-kicker">A WALK THROUGH MY INNER WORLD</p>
      <h1>两个月亮之间，<br />收藏彼此相遇。</h1>
      <p className="entrance-intro">一座城、一本书、一首歌，<br />有时会通向同一个地方。</p>
      <div className="entrance-actions"><a className="entrance-primary" href="#journeys">沿这条路走走 <IconArrowUpRight size={19} stroke={1.4} /></a><a className="entrance-text-link" href="#garden-directory">按空间浏览 <IconArrowRight size={18} stroke={1.4} /></a></div>
    </div>
    <section className="entrance-day-intro day-only" aria-label="白昼庭院">
      <div className="day-letter"><p className="entrance-kicker">LETTER FROM THE GARDEN</p><h1>把生活，<br />慢慢绘成自己的世界。</h1><p className="entrance-intro">在旅行、阅读与知识之间，收藏我看见的世界。</p><a className="entrance-primary" href="#journal">翻开这一页 <IconArrowUpRight size={18} stroke={1.4} /></a><img className="day-signature" src="/garden/signature-botanical.webp" alt="深绘里 Sehuri 签名与植物枝叶" width="900" height="540" /></div>
      <p className="day-landscape-caption">白昼庭院 / 在自己的世界里，慢慢生长。</p>
    </section>
    </div>
    <SpaceDirectory className="day-only" />
    <section className="day-journal day-only" id="journal" aria-labelledby="journal-heading">
      <div className="day-journal-main"><header><div><h2 id="journal-heading">最近，留下的几页</h2><p className="entrance-kicker">FROM MY DAYS</p></div><a className="entrance-text-link" href="#notes">翻阅手记 <IconArrowUpRight size={17} stroke={1.4} /></a></header>
        <a className="journal-photo" href="https://sehuri.github.io/travel-map/#memories"><img src="/garden/kamakura-sea.jpg" alt="镰仓海边，阳光穿过云层落在海面和沙滩上" width="800" height="450" loading="lazy" /></a>
        <article className="journal-copy"><p className="journal-category">远行 · 镰仓</p><h3><a href={`#${noteId}`} onClick={(event) => openCollection(event, noteId)}>{geography.title}</a></h3><time>{geography.date}</time><p>{geography.excerpt}</p><a className="entrance-text-link" href={`#${noteId}`} onClick={(event) => openCollection(event, noteId)}>沿着足迹看看 <IconArrowUpRight size={17} stroke={1.4} /></a></article>
        <a className="journal-latest" href={`#${latestId}`} onClick={(event) => openCollection(event, latestId)}><small>又添一页 · {gardenNotes[0].date}</small><span>{gardenNotes[0].title}</span><IconArrowUpRight size={17} stroke={1.4} /></a>
      </div>
      <aside className="day-desk" aria-label="此刻的书桌"><h2>此刻的书桌</h2><p className="entrance-kicker">ON MY DESK</p>
        <a className="desk-object" href={`#${bookId}`} onClick={(event) => openCollection(event, bookId)}><div className="desk-book"><img src="/garden/reading-still-life.webp" alt="《世界尽头与冷酷仙境》书封" width="400" height="600" loading="lazy" /></div><small>反复翻阅</small><strong>世界尽头与冷酷仙境</strong></a>
        <a className="desk-object" href={`#${albumId}`} onClick={(event) => openCollection(event, albumId)}><img className="desk-record" src="/garden/1q84-ost.webp" alt="1Q84 OST 双月选集封面" width="1024" height="1024" loading="lazy" /><small>私藏声音</small><strong>一张双面选集</strong></a>
      </aside>
    </section>
    <ThemeJourneys />
    <div className="night-directory night-only" id="garden-directory"><p>也可以，从一处空间开始</p><SpaceDirectory /></div>
  </div>;
}
