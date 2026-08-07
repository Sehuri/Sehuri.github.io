"use client";

import { useEffect, useState } from "react";
import { murakamiBooks, readingRoutes, type MurakamiBook } from "./murakamiData";

function BookDialog({ book, onClose }: { book: MurakamiBook; onClose: () => void }) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="book-dialog-backdrop" onMouseDown={onClose}>
      <article className="book-dialog" role="dialog" aria-modal="true" aria-labelledby="book-dialog-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="book-dialog-close" type="button" onClick={onClose} aria-label="关闭作品详情" autoFocus>×</button>
        <div className="book-dialog-hero">
          <div className="book-dialog-cover"><img src={book.cover} alt={`《${book.title}》封面`} referrerPolicy="no-referrer" /></div>
          <div className="book-dialog-intro">
            <p>{book.year} · {book.type}{book.favorite ? " · 私人珍藏" : ""}</p>
            <h2 id="book-dialog-title">{book.title}</h2>
            <span>{book.originalTitle}</span>
            <blockquote>“{book.personalNote}”</blockquote>
          </div>
        </div>
        <div className="book-dialog-body">
          <section><small>STORY</small><h3>作品介绍</h3><p>{book.summary}</p><p>{book.background}</p></section>
          <section><small>STRUCTURE</small><h3>叙事与主题</h3><p>{book.structure}</p><div className="book-theme-list">{book.themes.map((theme) => <span key={theme}>{theme}</span>)}</div></section>
          <section><small>READING NOTE</small><h3>怎样走进这本书</h3><p>{book.recommendation}</p></section>
        </div>
      </article>
    </div>
  );
}

export default function MurakamiLibrary() {
  const [selectedBook, setSelectedBook] = useState<MurakamiBook | null>(null);
  const [showAll, setShowAll] = useState(false);
  const visibleBooks = showAll ? murakamiBooks : murakamiBooks.slice(0, 6);
  const favorites = murakamiBooks.filter((book) => book.favorite);

  return (
    <section className="murakami-library" id="murakami">
      <header className="murakami-heading">
        <div><p className="section-kicker">HARUKI&apos;S READING ROOM</p><h2>春树书房</h2></div>
        <p>在现实与另一个世界的缝隙里，<br />收藏我读过、也想继续重读的村上春树。</p>
      </header>

      <div className="murakami-personal">
        <div className="murakami-portrait">
          <span>私</span><i />
          <small>MY MURAKAMI</small>
        </div>
        <div className="murakami-why">
          <p>为什么喜欢村上春树</p>
          <h3>因为他的世界总在日常生活旁边，<br />悄悄打开另一扇门。</h3>
          <div>
            <p>我喜欢那些孤独却不绝望的人，也喜欢音乐、城市、夜晚与记忆共同构成的空气。人物经历失去，面对无法解释的世界，却仍然做饭、走路、听唱片，并寻找与他人的连接。</p>
            <p>“深绘里”的两个月亮、冷酷仙境和世界尽头，都来自这种影响：看清复杂的现实，也不放弃保存自己的内心世界。</p>
          </div>
        </div>
      </div>

      <div className="murakami-favorites">
        <header><p>THE BOOKS I RETURN TO</p><h3>最喜欢的两部作品</h3></header>
        <div>
          {favorites.map((book) => (
            <button type="button" key={book.title} onClick={() => setSelectedBook(book)}>
              <img src={book.cover} alt={`《${book.title}》封面`} loading="lazy" referrerPolicy="no-referrer" />
              <span>{book.year}</span><h4>{book.title}</h4><p>{book.personalNote}</p><strong>查看作品档案 ↗</strong>
            </button>
          ))}
        </div>
      </div>

      <div className="murakami-timeline">
        <div className="murakami-subheading"><div><p>BOOKS ACROSS TIME</p><h3>作品年图</h3></div><span>1979 — 2023</span></div>
        <div className="book-year-track">
          {murakamiBooks.map((book) => (
            <button type="button" key={book.title} onClick={() => setSelectedBook(book)} aria-label={`查看${book.year}年作品《${book.title}》`}>
              <span>{book.year}</span><i /><small>{book.title}</small>
            </button>
          ))}
        </div>
      </div>

      <div className="murakami-shelf">
        <div className="murakami-subheading"><div><p>BOOK ARCHIVE</p><h3>作品书架</h3></div><span>{murakamiBooks.length} 部主要长篇 · 仅作资料展示</span></div>
        <div className="murakami-book-grid">
          {visibleBooks.map((book) => (
            <button type="button" className="murakami-book" key={book.title} onClick={() => setSelectedBook(book)}>
              <div><img src={book.cover} alt={`《${book.title}》封面`} loading="lazy" referrerPolicy="no-referrer" />{book.favorite ? <span>FAVORITE</span> : null}</div>
              <p>{book.year} · {book.type}</p><h4>{book.title}</h4><small>{book.originalTitle}</small><strong>查看详情 ↗</strong>
            </button>
          ))}
        </div>
        <button className="murakami-show-all" type="button" onClick={() => setShowAll((value) => !value)}>{showAll ? "收起书架" : `展开全部 ${murakamiBooks.length} 部作品`} <span aria-hidden="true">{showAll ? "↑" : "↓"}</span></button>
      </div>

      <div className="reading-routes">
        <header><p>WHERE TO BEGIN</p><h3>怎样开始阅读村上春树</h3><span>没有唯一的阅读顺序，从你此刻最感兴趣的入口开始。</span></header>
        <div>{readingRoutes.map((route, index) => {
          const book = murakamiBooks.find((item) => item.title === route.book);
          return <button type="button" key={route.book} onClick={() => book && setSelectedBook(book)}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{route.label}</small><h4>《{route.book}》</h4><p>{route.note}</p></div><strong>↗</strong></button>;
        })}</div>
      </div>

      {selectedBook ? <BookDialog book={selectedBook} onClose={() => setSelectedBook(null)} /> : null}
    </section>
  );
}
