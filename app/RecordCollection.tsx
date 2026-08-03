"use client";

import { useEffect, useState } from "react";
import {
  albumTimeline,
  featuredAlbum,
  recordCount,
  type Album,
} from "./albumData";

function TwoMoonCover({ label }: { label: string }) {
  return (
    <div className="album-cover" aria-label={label}>
      <div className="album-cover-moons" aria-hidden="true">
        <span />
        <span />
      </div>
      <div className="album-cover-title">
        <small>SEHURI&apos;S COLLECTION</small>
        <strong>1Q84</strong>
        <span>ORIGINAL SOUNDTRACK</span>
      </div>
      <i aria-hidden="true">SIDE A</i>
    </div>
  );
}

function AlbumDialog({
  album,
  onClose,
}: {
  album: Album;
  onClose: () => void;
}) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  return (
    <div className="album-dialog-backdrop" onMouseDown={onClose}>
      <section
        className="album-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="album-dialog-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          className="album-dialog-close"
          type="button"
          onClick={onClose}
          aria-label="关闭专辑详情"
          autoFocus
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className="album-dialog-top">
          {album.featured ? (
            <TwoMoonCover label={`${album.title} 专辑封面`} />
          ) : (
            <div className="album-dialog-artwork">
              <img
                src={album.artwork}
                alt={`${album.artist}《${album.title}》封面`}
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          <div className="album-dialog-copy">
            <p className="album-dialog-kicker">
              {album.featured ? "ALWAYS FIRST" : album.year}
            </p>
            <h2 id="album-dialog-title">{album.title}</h2>
            <p className="album-dialog-meta">
              {album.artist} <span>·</span> {album.year} <span>·</span>{" "}
              {album.detail}
            </p>
            <blockquote>“{album.note}”</blockquote>
            <p className="album-dialog-description">{album.description}</p>
          </div>
        </div>

        <div className="album-dialog-tracks">
          <div className="album-dialog-section-title">
            <span>TRACK LIST</span>
            <i />
            <p>{album.tracks.length ? `${album.tracks.length} 首` : "待整理"}</p>
          </div>

          {album.tracks.length ? (
            <ol>
              {album.tracks.map((track, index) => (
                <li key={`${track}-${index}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{track}</p>
                </li>
              ))}
            </ol>
          ) : (
            <p className="album-dialog-empty">
              具体版本仍在确认，曲目单会在整理完成后补充。
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default function RecordCollection() {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const chronologicalAlbums = [...albumTimeline].sort((a, b) =>
    a.releaseDate.localeCompare(b.releaseDate),
  );

  return (
    <>
      <div className="album-list">
        <button
          className="album-card album-featured album-open-button"
          type="button"
          onClick={() => setSelectedAlbum(featuredAlbum)}
          aria-label={`查看《${featuredAlbum.title}》专辑详情`}
        >
          <TwoMoonCover label={`${featuredAlbum.title} 专辑封面`} />

          <div className="album-copy">
            <div className="album-number">
              <span>01</span>
              <i />
              <small>ALWAYS FIRST</small>
            </div>
            <h3>{featuredAlbum.title}</h3>
            <p className="album-meta">
              {featuredAlbum.artist} <span>·</span> {featuredAlbum.year}{" "}
              <span>·</span> {featuredAlbum.detail}
            </p>
            <blockquote>“{featuredAlbum.note}”</blockquote>
            <span className="album-detail-hint">查看专辑详情 ↗</span>
          </div>
        </button>
      </div>

      <div className="album-timeline-heading">
        <span>1997</span>
        <i />
        <p>其余收藏，按发行时间慢慢排开</p>
        <i />
        <span>2025</span>
      </div>

      <div className="album-gallery">
        {chronologicalAlbums.map((album, index) => (
          <button
            className="album-tile"
            type="button"
            key={`${album.artist}-${album.title}`}
            onClick={() => setSelectedAlbum(album)}
            aria-label={`查看${album.artist}《${album.title}》专辑详情`}
          >
            <div className="album-artwork">
              <img
                src={album.artwork}
                alt={`${album.artist}《${album.title}》封面`}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <span>{String(index + 2).padStart(2, "0")}</span>
            </div>
            <div className="album-tile-copy">
              <p>{album.year}</p>
              <h3>{album.title}</h3>
              <div className="album-tile-meta">
                <span>{album.artist}</span>
                <i />
                <span>{album.detail}</span>
              </div>
              <blockquote>“{album.note}”</blockquote>
              <span className="album-detail-hint">查看详情 ↗</span>
            </div>
          </button>
        ))}
      </div>

      <p className="records-note">
        {recordCount} 张唱片，依时间排开。下一张喜欢的专辑，会继续摆在这里。
      </p>

      {selectedAlbum ? (
        <AlbumDialog
          album={selectedAlbum}
          onClose={() => setSelectedAlbum(null)}
        />
      ) : null}
    </>
  );
}
