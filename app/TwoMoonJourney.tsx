"use client";

import { useState } from "react";
import { featuredTrackSections, type ConceptTrack } from "./albumData";

type MoonSide = 0 | 1;

function pickAnother(side: MoonSide, previous?: ConceptTrack | null) {
  const tracks = featuredTrackSections[side].tracks;
  let next = Math.floor(Math.random() * tracks.length);
  if (tracks.length > 1 && tracks[next] === previous) next = (next + 1) % tracks.length;
  return tracks[next];
}

export default function TwoMoonJourney() {
  const [side, setSide] = useState<MoonSide | null>(null);
  const [track, setTrack] = useState<ConceptTrack | null>(null);

  const enterWorld = (nextSide: MoonSide) => {
    setSide(nextSide);
    setTrack(pickAnother(nextSide, side === nextSide ? track : null));
  };

  const section = side === null ? null : featuredTrackSections[side];

  return (
    <section className="moon-journey" id="moons">
      <header className="moon-journey-heading">
        <div>
          <p className="section-kicker">TWO MOONS, TWO WORLDS</p>
          <h2>两个月亮</h2>
        </div>
        <p>同一片夜空下，一轮凝视现实，一轮保存理想。<br />今晚，你想走向哪一个世界？</p>
      </header>

      <div className="moon-journey-stage">
        <div className="moon-choices" aria-label="选择进入冷酷仙境或世界尽头">
          <button
            className={`moon-choice wonderland ${side === 0 ? "is-active" : ""}`}
            type="button"
            onClick={() => enterWorld(0)}
            aria-pressed={side === 0}
          >
            <span className="interactive-moon moon-dark" aria-hidden="true"><i /></span>
            <small>SIDE A</small>
            <strong>冷酷仙境</strong>
            <p>从现实的裂缝里，随机遇见一首歌。</p>
          </button>
          <div className="moon-orbit" aria-hidden="true"><span>1Q84</span><i /></div>
          <button
            className={`moon-choice world-end ${side === 1 ? "is-active" : ""}`}
            type="button"
            onClick={() => enterWorld(1)}
            aria-pressed={side === 1}
          >
            <span className="interactive-moon moon-light" aria-hidden="true"><i /></span>
            <small>SIDE B</small>
            <strong>世界尽头</strong>
            <p>从心里想去的地方，随机遇见一首歌。</p>
          </button>
        </div>

        <div className={`moon-song ${section ? (side === 0 ? "wonderland" : "world-end") : "is-empty"}`} aria-live="polite">
          {track && section ? (
            <>
              <div className="moon-song-artwork">
                <img src={track.artwork} alt={`${track.artist}《${track.album}》封面`} referrerPolicy="no-referrer" />
                <span>{side === 0 ? "A" : "B"}</span>
              </div>
              <div className="moon-song-copy">
                <p>{section.title} · TONIGHT&apos;S ECHO</p>
                <h3>{track.title}</h3>
                <div className="moon-song-meta"><span>{track.artist}</span><i /><span>《{track.album}》· {track.year}</span></div>
                <blockquote>“{track.interpretation}”</blockquote>
                <div className="moon-song-reason">
                  <small>为什么在这一面</small>
                  <p>{side === 0
                    ? "它不回避时代、欲望与失去，让我们先看清身处的世界。"
                    : "它把目光带回爱、故乡与成长，提醒我们仍可以选择怎样生活。"}</p>
                </div>
                <div className="moon-song-actions">
                  <button type="button" onClick={() => side !== null && enterWorld(side)}>再遇见一首 <span aria-hidden="true">✦</span></button>
                  <a href="#records" onClick={() => setTrack(null)}>查看完整歌单 <span aria-hidden="true">↓</span></a>
                </div>
              </div>
            </>
          ) : (
            <div className="moon-song-placeholder">
              <span>THE NIGHT IS WAITING</span>
              <h3>请点击一轮月亮。</h3>
              <p>月亮会从对应世界的八首歌里，为你挑选今晚的一首。</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
