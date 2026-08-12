"use client";

import { useEffect, useMemo, useState } from "react";
import { films, type Film } from "./filmData";

const filters = ["全部", "剧情人性", "犯罪悬疑", "科幻奇想", "动画", "战争历史"] as const;
type FilmFilter = (typeof filters)[number];

function belongsTo(film: Film, filter: FilmFilter) {
  if (filter === "全部") return true;
  const genres = film.genres.join("/");
  if (filter === "剧情人性") return /剧情|爱情|家庭|成长|女性|公路/.test(genres);
  if (filter === "犯罪悬疑") return /犯罪|悬疑|惊悚/.test(genres);
  if (filter === "科幻奇想") return /科幻|奇幻|冒险|史诗|哲思/.test(genres);
  if (filter === "动画") return genres.includes("动画");
  return /战争|历史|传记|灾难/.test(genres);
}

function FilmDialog({ film, onClose }: { film: Film; onClose: () => void }) {
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
        <button className="film-dialog-close" type="button" onClick={onClose} aria-label="关闭电影详情" autoFocus><span aria-hidden="true">×</span></button>
        <div className="film-dialog-poster">
          <img src={film.poster} alt={`${film.title}发行海报`} />
          <span>{film.year}</span>
        </div>
        <div className="film-dialog-copy">
          <p className="film-dialog-kicker">A FILM I KEEP · {film.year}</p>
          <h2 id="film-dialog-title">{film.title}</h2>
          <p className="film-original-title">{film.originalTitle}</p>
          <dl>
            <div><dt>导演</dt><dd>{film.director}</dd></div>
            <div><dt>地区</dt><dd>{film.country}</dd></div>
            <div><dt>类型</dt><dd>{film.genres.join(" · ")}</dd></div>
          </dl>
          <div className="film-dialog-story"><small>ABOUT THE FILM</small><p>{film.summary}</p></div>
          <blockquote>“{film.note}”</blockquote>
          {film.chapters ? (
            <div className="film-series-list">
              <small>THE EIGHT FILMS</small>
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

  const chooseFilter = (next: FilmFilter) => {
    setFilter(next);
    setShowAll(false);
  };

  return (
    <>
      <div className="film-toolbar">
        <div className="film-filters" aria-label="按电影类型筛选">
          {filters.map((item) => <button className={filter === item ? "active" : ""} type="button" key={item} onClick={() => chooseFilter(item)}>{item}</button>)}
        </div>
        <p><strong>{filteredFilms.length}</strong> 部 · 按上映时间排列</p>
      </div>

      <div className="film-grid">
        {visibleFilms.map((film, index) => (
          <button className="film-card" type="button" key={film.slug} onClick={() => setSelectedFilm(film)} aria-label={`查看《${film.title}》电影详情`}>
            <div className="film-poster">
              <img src={film.poster} alt={`${film.title}发行海报`} loading="lazy" />
              <span>{String(films.indexOf(film) + 1).padStart(2, "0")}</span>
              <i>VIEW FILM</i>
            </div>
            <div className="film-card-copy">
              <p>{film.year}</p>
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
