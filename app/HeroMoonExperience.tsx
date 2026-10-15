"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { featuredTrackSections, type ConceptTrack } from "./albumData";
import { moonHitBoxes } from "./moonGeometry";

type MoonSide = 0 | 1;

function pickTrack(side: MoonSide, previous?: ConceptTrack | null) {
  const tracks = featuredTrackSections[side].tracks;
  let index = Math.floor(Math.random() * tracks.length);
  if (tracks.length > 1 && tracks[index] === previous) index = (index + 1) % tracks.length;
  return tracks[index];
}

export default function HeroMoonExperience() {
  const [side, setSide] = useState<MoonSide | null>(null);
  const [track, setTrack] = useState<ConceptTrack | null>(null);
  const [dayNotice, setDayNotice] = useState(false);
  const layer = useRef<HTMLDivElement>(null);
  const [hitBoxes, setHitBoxes] = useState<ReturnType<typeof moonHitBoxes>>([]);

  useEffect(() => {
    const landscape = layer.current?.parentElement;
    const image = landscape?.querySelector("img");
    if (!landscape || !image) return;
    const position = (value: string) => {
      if (value === "right" || value === "bottom") return 1;
      if (value === "left" || value === "top") return 0;
      return value.endsWith("%") ? parseFloat(value) / 100 : .5;
    };
    const measure = () => {
      if (!image.naturalWidth || !landscape.clientWidth || !landscape.clientHeight) return;
      const [x, y = "50%"] = getComputedStyle(image).objectPosition.split(" ");
      setHitBoxes(moonHitBoxes(
        landscape.clientWidth, landscape.clientHeight,
        image.naturalWidth, image.naturalHeight,
        position(x), position(y), image.currentSrc.includes("night-landscape-mobile"),
      ));
    };
    const observer = new ResizeObserver(measure);
    observer.observe(landscape);
    image.addEventListener("load", measure);
    window.addEventListener("resize", measure);
    measure();
    return () => {
      observer.disconnect();
      image.removeEventListener("load", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const enterWorld = (nextSide: MoonSide) => {
    setSide(nextSide);
    setTrack(pickTrack(nextSide, side === nextSide ? track : null));
  };

  const close = () => {
    setSide(null);
    setTrack(null);
  };

  useEffect(() => {
    if (!track) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && close();
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [track]);

  useEffect(() => {
    const showDayNotice = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href="#moon-guide"]') : null;
      if (!target || document.documentElement.dataset.theme !== "day") return;
      event.preventDefault();
      setDayNotice(true);
    };
    document.addEventListener("click", showDayNotice);
    return () => document.removeEventListener("click", showDayNotice);
  }, []);

  useEffect(() => {
    if (!dayNotice) return;
    const timer = window.setTimeout(() => setDayNotice(false), 6000);
    return () => window.clearTimeout(timer);
  }, [dayNotice]);

  const switchToNight = () => {
    document.querySelector<HTMLButtonElement>(".theme-trigger")?.click();
    setDayNotice(false);
  };

  const section = side === null ? null : featuredTrackSections[side];

  return (
    <>
      <div className="entrance-moon-layer" id="moon-guide" ref={layer}>
        {hitBoxes.map(({ side: moonSide, left, top, size }) => <button
          key={moonSide}
          className={`hero-moon-hit hero-moon-${moonSide === 0 ? "cold" : "warm"}`}
          style={{ left, top, width: size, height: size }}
          type="button"
          onClick={() => enterWorld(moonSide)}
          aria-label={moonSide === 0 ? "进入冷酷仙境" : "进入世界尽头"}
        />)}
      </div>

      {dayNotice ? createPortal(
        <aside className="day-moon-notice" role="status" aria-live="polite">
          <span aria-hidden="true">☼</span>
          <div><small>DAYLIGHT</small><p>太阳还没有落下，两个月亮的世界还未出现。</p></div>
          <button type="button" onClick={switchToNight}>切换到夜晚</button>
          <button className="day-moon-notice-close" type="button" onClick={() => setDayNotice(false)} aria-label="关闭提示">×</button>
        </aside>, document.body,
      ) : null}

      {track && section ? createPortal(
        <div className="hero-moon-backdrop" onMouseDown={close}>
          <article className={`hero-moon-dialog ${side === 0 ? "wonderland" : "world-end"}`} role="dialog" aria-modal="true" aria-labelledby="hero-moon-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="hero-moon-close" type="button" onClick={close} aria-label="关闭双月歌曲窗口" autoFocus>×</button>
            <div className="hero-moon-artwork">
              <img src={track.artwork} alt={`${track.artist}《${track.album}》封面`} referrerPolicy="no-referrer" />
              <span>SIDE {side === 0 ? "A" : "B"}</span>
            </div>
            <div className="hero-moon-copy">
              <p>{section.englishTitle}</p>
              <h2 id="hero-moon-title">{track.title}</h2>
              <div className="hero-moon-meta"><span>{track.artist}</span><i /><span>《{track.album}》 · {track.year}</span></div>
              <blockquote>“{track.interpretation}”</blockquote>
              <div className="hero-moon-reason">
                <small>为什么在这一面</small>
                <p>{side === 0
                  ? "它不回避时代、欲望与失去，让我们先看清身处的世界。"
                  : "它把目光带回爱、故乡与成长，提醒我们仍可以选择怎样生活。"}</p>
              </div>
              <div className="hero-moon-actions">
                <button type="button" onClick={() => side !== null && enterWorld(side)}>再遇见一首 ✦</button>
                <a href="#records" onClick={close}>查看完整歌单 ↓</a>
              </div>
            </div>
          </article>
        </div>, document.body,
      ) : null}
    </>
  );
}
