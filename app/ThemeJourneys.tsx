"use client";
import { useState, type MouseEvent } from "react";
import { IconArrowLeft, IconArrowRight, IconArrowUpRight, IconChevronDown } from "@tabler/icons-react";
import { gardenDeepLinkEvent } from "./deepLinks";
import { themeJourneys, type JourneyStop } from "./journeyData";
import { murakamiBooks } from "./murakamiData";
import { albumTimeline } from "./albumData";
import { films } from "./filmData";
import { gardenNotes } from "./noteData";

function artworkFor(stop: JourneyStop) {
  const title = stop.title.replace(/[《》]/g, "");
  if (stop.type === "庭院手记") return { src: "/garden/note-page.webp", kind: "note" };
  if (stop.type === "光影馆") return { src: films.find((film) => film.title === title)?.poster ?? "/movie-posters/2001-a-space-odyssey.jpg", kind: "film" };
  if (stop.type === "唱片室") return { src: title === "1Q84 OST" ? "/garden/1q84-ost.webp" : albumTimeline.find((album) => album.title === title)?.artwork ?? "/garden/1q84-ost.webp", kind: "record" };
  if (stop.type === "村上书房") return { src: murakamiBooks.find((book) => book.title === title)?.cover ?? "/book-covers/9787532777624.jpg", kind: "book" };
  if (stop.type === "旅行地图") return { src: "/garden/travel-map.jpg", kind: "photo" };
  if (stop.type === "阅览室") return { src: "/garden/reading-room.webp", kind: "photo" };
  return { src: "/garden/knowledge-garden.jpg", kind: "photo" };
}
export default function ThemeJourneys() {
  const [routeIndex, setRouteIndex] = useState(0);
  const [stopIndex, setStopIndex] = useState(2);
  const [dayExpanded, setDayExpanded] = useState(false);
  const route = themeJourneys[routeIndex];
  const stop = route.stops[stopIndex];
  const art = artworkFor(stop);
  const note = stop.type === "庭院手记" ? gardenNotes.find((item) => item.title === stop.title) : undefined;
  const chooseRoute = (index: number) => { setRouteIndex(index); setStopIndex(0); };
  const openStop = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!stop.href.startsWith("#")) return;
    event.preventDefault();
    const targetId = decodeURIComponent(stop.href.slice(1));
    window.history.replaceState(null, "", stop.href);
    window.dispatchEvent(new CustomEvent(gardenDeepLinkEvent, { detail: targetId }));
  };
  const moveStop = (offset: number) => setStopIndex((value) => Math.max(0, Math.min(route.stops.length - 1, value + offset)));
  return <section className={`garden-atlas ${dayExpanded ? "day-expanded" : ""}`} id="journeys" aria-label="主题漫游">
    <div className="day-route-letter day-only"><div><p className="entrance-kicker">本期漫游 / CURATED PATHS</p><h2>{route.title}</h2><p>从一座城、一本书，走进彼此相连的收藏。</p><button className="entrance-primary" type="button" aria-expanded={dayExpanded} aria-controls="journey-route-panel" onClick={() => setDayExpanded((value) => !value)}>{dayExpanded ? "收起这段漫游" : "开始这段漫游"}<IconChevronDown size={18} stroke={1.4} /></button></div><img src="/garden/twilight-landscape.webp" alt="双月升起的夜晚庭院" width="1672" height="941" loading="lazy" /></div>
    <div className="atlas-route-heading"><div className="night-only"><h2>本次路线 / {route.title}</h2><p>{route.duration}</p></div><div className="atlas-route-tabs" role="tablist" aria-label="选择主题漫游路线">{themeJourneys.map((item, index) => <button type="button" role="tab" id={`route-tab-${item.slug}`} aria-controls="journey-route-panel" aria-selected={index === routeIndex} tabIndex={index === routeIndex ? 0 : -1} key={item.slug} onClick={() => chooseRoute(index)} onKeyDown={(event) => {
      const next = event.key === "ArrowRight" ? (index + 1) % themeJourneys.length : event.key === "ArrowLeft" ? (index + themeJourneys.length - 1) % themeJourneys.length : event.key === "Home" ? 0 : event.key === "End" ? themeJourneys.length - 1 : null;
      if (next !== null) { event.preventDefault(); chooseRoute(next); document.getElementById(`route-tab-${themeJourneys[next].slug}`)?.focus(); }
    }}>{item.title}</button>)}</div></div>
    <div className="atlas-panel" id="journey-route-panel" role="tabpanel" aria-labelledby={`route-tab-${route.slug}`}>
      <div className="atlas-walk"><img className="atlas-trail" src="/garden/collection-trail.webp" alt="" aria-hidden="true" width="1600" height="400" /><ol className="atlas-stops" aria-label={`${route.title}路线节点`}>{route.stops.map((item, index) => {
        const image = artworkFor(item);
        return <li key={`${route.slug}-${item.title}`}><button type="button" className={`atlas-node ${image.kind} ${index === stopIndex ? "selected" : ""}`} aria-current={index === stopIndex ? "step" : undefined} aria-label={`${String(index + 1).padStart(2, "0")} ${item.type} ${item.title}`} onClick={() => setStopIndex(index)}><span className="atlas-object"><img src={image.src} alt="" width="180" height="240" loading="lazy" referrerPolicy="no-referrer" /></span><span className="atlas-node-copy"><small>{String(index + 1).padStart(2, "0")}</small><strong>{item.type === "唱片室" ? "听潮" : item.type}</strong><span>{item.title}</span></span></button></li>;
      })}</ol></div>
      <article className="atlas-detail" id="journey-detail" aria-live="polite" aria-atomic="true">
        <div className={`atlas-detail-image ${art.kind}`}><img src={note ? "/garden/moon-note.webp" : art.src} alt={note ? "月下花草间的手记纸页" : stop.title} width="1200" height="900" loading="lazy" referrerPolicy="no-referrer" /></div>
        <div className="atlas-detail-copy"><p className="atlas-meta"><b>{String(stopIndex + 1).padStart(2, "0")}</b> / {String(route.stops.length).padStart(2, "0")} · {stop.type}</p><h3>{stop.title.replace(/[《》]/g, "")}</h3><p className="atlas-excerpt">{note?.excerpt ?? stop.note}</p><p className="atlas-date">{note?.date ?? stop.meta}</p><a className="entrance-primary" href={stop.href} target={stop.href.startsWith("http") ? "_blank" : undefined} rel={stop.href.startsWith("http") ? "noreferrer" : undefined} onClick={openStop}>{note ? "翻开这篇手记" : "打开这一站"}<IconArrowUpRight size={18} stroke={1.4} /></a></div>
        <div className="atlas-controls"><button type="button" onClick={() => moveStop(-1)} disabled={stopIndex === 0}><span><IconArrowLeft size={17} stroke={1.3} /> 上一站</span>{stopIndex > 0 && <small>{route.stops[stopIndex - 1].type}<br />{route.stops[stopIndex - 1].title}</small>}</button><button type="button" onClick={() => moveStop(1)} disabled={stopIndex === route.stops.length - 1}><span>下一站 <IconArrowRight size={17} stroke={1.3} /></span>{stopIndex < route.stops.length - 1 && <small>{route.stops[stopIndex + 1].type}<br />{route.stops[stopIndex + 1].title}</small>}</button><div className="atlas-progress" aria-label={`路线进度 ${stopIndex + 1}/${route.stops.length}`}>{route.stops.map((item, index) => <button type="button" aria-label={`前往第 ${index + 1} 站`} aria-current={index === stopIndex ? "step" : undefined} onClick={() => setStopIndex(index)} key={item.href}><span /></button>)}</div></div>
      </article>
    </div>
  </section>;
}
