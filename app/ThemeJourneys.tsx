"use client";

import { useState } from "react";
import { gardenDeepLinkEvent } from "./deepLinks";
import { themeJourneys } from "./journeyData";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function ThemeJourneys() {
  const [routeIndex, setRouteIndex] = useState(0);
  const [stopIndex, setStopIndex] = useState(0);
  const route = themeJourneys[routeIndex];
  const stop = route.stops[stopIndex];

  const chooseRoute = (index: number) => {
    setRouteIndex(index);
    setStopIndex(0);
  };

  const openStop = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!stop.href.startsWith("#")) return;
    event.preventDefault();
    const targetId = decodeURIComponent(stop.href.replace(/^#/, ""));
    window.history.replaceState(null, "", stop.href);
    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent(gardenDeepLinkEvent, { detail: targetId }));
    }, 0);
  };

  return (
    <section className={`theme-journeys ${route.tone}`} id="journeys">
      <header className="journey-heading">
        <div><p className="section-kicker">CURATED PATHS</p><h2>主题漫游</h2></div>
        <p>不再随机抽取一件收藏。<br />选一条路，看它们为什么被放在一起。</p>
      </header>

      <div className="journey-shell">
        <div className="journey-route-list" role="list" aria-label="选择主题漫游路线">
          {themeJourneys.map((item, index) => (
            <button type="button" role="listitem" className={index === routeIndex ? "active" : ""} aria-pressed={index === routeIndex} onClick={() => chooseRoute(index)} key={item.slug}>
              <span>{item.index}</span>
              <div><small>{item.english}</small><strong>{item.title}</strong><i>{item.duration}</i></div>
              <b aria-hidden="true">→</b>
            </button>
          ))}
        </div>

        <article className="journey-stage" aria-live="polite">
          <div className="journey-stage-moons" aria-hidden="true"><span /><span /></div>
          <div className="journey-route-intro">
            <div><small>PATH {route.index}</small><span>{route.duration}</span></div>
            <h3>{route.title}</h3>
            <p>{route.introduction}</p>
          </div>

          <ol className="journey-stops" aria-label={`${route.title}路线节点`}>
            {route.stops.map((item, index) => (
              <li key={`${route.slug}-${item.title}`}>
                <button type="button" className={index === stopIndex ? "active" : ""} onClick={() => setStopIndex(index)} aria-current={index === stopIndex ? "step" : undefined}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><small>{item.type}</small><strong>{item.title}</strong></div>
                </button>
              </li>
            ))}
          </ol>

          <div className="journey-stop-detail">
            <div className="journey-stop-count"><span>{String(stopIndex + 1).padStart(2, "0")}</span><i /><small>{String(route.stops.length).padStart(2, "0")}</small></div>
            <div className="journey-stop-copy">
              <small>{stop.type} · {stop.meta}</small>
              <h4>{stop.title}</h4>
              <p>{stop.note}</p>
              <a href={stop.href} target={stop.href.startsWith("http") ? "_blank" : undefined} rel={stop.href.startsWith("http") ? "noreferrer" : undefined} onClick={openStop}>
                打开这一站 <Arrow />
              </a>
            </div>
          </div>

          <div className="journey-controls">
            <button type="button" onClick={() => setStopIndex((value) => Math.max(0, value - 1))} disabled={stopIndex === 0}>← 上一站</button>
            <div aria-label={`路线进度 ${stopIndex + 1}/${route.stops.length}`}><i style={{ width: `${((stopIndex + 1) / route.stops.length) * 100}%` }} /></div>
            {stopIndex < route.stops.length - 1 ? (
              <button type="button" onClick={() => setStopIndex((value) => Math.min(route.stops.length - 1, value + 1))}>下一站 →</button>
            ) : <span>路线已走完 · ○</span>}
          </div>

          {stopIndex === route.stops.length - 1 ? <blockquote>{route.closing}</blockquote> : null}
        </article>
      </div>
    </section>
  );
}
