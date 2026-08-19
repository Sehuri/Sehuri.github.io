"use client";

import { useEffect, useMemo, useState } from "react";
import { films, type Film } from "./filmData";
import { currentSearchTarget, gardenDeepLinkEvent, revealSearchTarget, searchTargetId } from "./deepLinks";
import ShareCard from "./ShareCard";

const filmTargetId = (film: Film) => searchTargetId("film", film.slug);

const filters = ["全部", "电影", "电视剧", "剧情人性", "犯罪悬疑", "科幻奇想", "动画", "战争历史"] as const;
type FilmFilter = (typeof filters)[number];

function belongsTo(film: Film, filter: FilmFilter) {
  if (filter === "全部") return true;
  if (filter === "电影") return (film.format ?? "电影") === "电影";
  if (filter === "电视剧") return film.format === "电视剧";
  const genres = film.genres.join("/");
  if (filter === "剧情人性") return /剧情|爱情|家庭|成长|女性|公路/.test(genres);
  if (filter === "犯罪悬疑") return /犯罪|悬疑|惊悚/.test(genres);
  if (filter === "科幻奇想") return /科幻|奇幻|冒险|史诗|哲思/.test(genres);
  if (filter === "动画") return genres.includes("动画");
  return /战争|历史|传记|灾难/.test(genres);
}

function FilmDialog({ film, onClose }: { film: Film; onClose: () => void }) {
  const format = film.format ?? "电影";
  useEffect(() => {
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="film-dialog-backdrop" onMouseDown={onClose}>
      <section className="film-dialog" role="dialog" aria-modal="true" aria-labelledby="film-dialog-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="film-dialog-close" type="button" onClick={onClose} aria-label="关闭影视详情" autoFocus><span aria-hidden="true">×</span></button>
        <div className="film-dialog-poster">
          <img src={film.poster} alt={`${film.title}发行海报`} />
          <span>{film.year}</span>
        </div>
        <div className="film-dialog-copy">
          <p className="film-dialog-kicker">{format === "电视剧" ? "A SERIES I KEEP" : "A FILM I KEEP"} · {film.year}</p>
          <h2 id="film-dialog-title">{film.title}</h2>
          <p className="film-original-title">{film.originalTitle}</p>
          <dl>
            <div><dt>{format === "电视剧" ? "主创" : "导演"}</dt><dd>{film.director}</dd></div>
            <div><dt>地区</dt><dd>{film.country}</dd></div>
            <div><dt>类型</dt><dd>{film.genres.join(" · ")}</dd></div>
          </dl>
          <div className="film-dialog-story"><small>{format === "电视剧" ? "ABOUT THE SERIES" : "ABOUT THE FILM"}</small><p>{film.summary}</p></div>
          <blockquote>“{film.note}”</blockquote>
          <ShareCard data={{
            category: "影视",
            title: `《${film.title}》`,
            meta: `${film.director} · ${film.year} · ${format}`,
            quote: film.note,
            targetId: filmTargetId(film),
            tone: "film",
            coverUrls: [film.poster],
            coverLabel: film.title,
          }} />
          {film.chapters ? (
            <div className="film-series-list">
              <small>{film.seriesLabel ?? "SERIES COLLECTION"}</small>
              <ol>{film.chapters.map((chapter, index) => <li key={chapter.title}><span>{String(index + 1).padStart(2, "0")}</span><p>{chapter.title}</p><i>{chapter.year}</i></li>)}</ol>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

export default function FilmCollection() {
  const [filter, setFilter] = useState<FilmFilter>("全部");
  const [showAll, setShowAll] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  const filteredFilms = useMemo(() => films.filter((film) => belongsTo(film, filter)), [filter]);
  const visibleFilms = showAll ? filteredFilms : filteredFilms.slice(0, 15);

  useEffect(() => {
    const openLinkedFilm = (targetId = currentSearchTarget()) => {
      if (!targetId.startsWith("film-")) return;
      const targetFilm = films.find((film) => filmTargetId(film) === targetId);
      if (!targetFilm) return;
      setFilter("全部");
      setShowAll(true);
      revealSearchTarget(targetId);
    };
    const onDeepLink = (event: Event) => openLinkedFilm((event as CustomEvent<string>).detail);
    const onHashChange = () => openLinkedFilm();
    openLinkedFilm();
    window.addEventListener(gardenDeepLinkEvent, onDeepLink);
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener(gardenDeepLinkEvent, onDeepLink);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  const chooseFilter = (next: FilmFilter) => {
    setFilter(next);
    setShowAll(false);
  };

  return (
    <>
      <div className="film-toolbar">
        <div className="film-filters" aria-label="按影视类型筛选">
          {filters.map((item) => <button className={filter === item ? "active" : ""} type="button" key={item} onClick={() => chooseFilter(item)}>{item}</button>)}
        </div>
        <p><strong>{filteredFilms.length}</strong> 部影视作品 · 按首映时间排列</p>
      </div>

      <div className="film-grid">
        {visibleFilms.map((film, index) => (
          <button className="film-card" type="button" id={filmTargetId(film)} key={film.slug} onClick={() => setSelectedFilm(film)} aria-label={`查看《${film.title}》影视详情`}>
            <div className="film-poster">
              <img src={film.poster} alt={`${film.title}发行海报`} loading="lazy" />
              <span>{String(films.indexOf(film) + 1).padStart(2, "0")}</span>
              <i>{film.format === "电视剧" ? "VIEW SERIES" : "VIEW FILM"}</i>
            </div>
            <div className="film-card-copy">
              <p>{film.year} · {film.format ?? "电影"}</p>
              <h3>{film.title}</h3>
              <span>{film.originalTitle}</span>
              <div><small>{film.director}</small><i /><small>{film.genres.slice(0, 2).join(" · ")}</small></div>
            </div>
          </button>
        ))}
      </div>

      {filteredFilms.length > 15 ? <button className="film-show-all" type="button" onClick={() => setShowAll((value) => !value)}>{showAll ? "收起片单" : `展开全部 ${filteredFilms.length} 部`} <span aria-hidden="true">{showAll ? "↑" : "↓"}</span></button> : null}
      {selectedFilm ? <FilmDialog film={selectedFilm} onClose={() => setSelectedFilm(null)} /> : null}
    </>
  );
}
