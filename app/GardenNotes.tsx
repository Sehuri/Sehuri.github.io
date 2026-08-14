"use client";

import { useEffect, useState } from "react";
import { gardenNotes, type GardenNote } from "./noteData";

function NoteDialog({ note, onClose }: { note: GardenNote; onClose: () => void }) {
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
    <div className="note-dialog-backdrop" onMouseDown={onClose}>
      <article className="note-dialog" role="dialog" aria-modal="true" aria-labelledby="note-dialog-title" onMouseDown={(event) => event.stopPropagation()}>
        <button type="button" onClick={onClose} aria-label="关闭庭院手记" autoFocus>×</button>
        <p>{note.category} · {note.date}</p>
        <h2 id="note-dialog-title">{note.title}</h2>
        <blockquote>“{note.excerpt}”</blockquote>
        <div>{note.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        {note.related ? <a href={note.related.href} onClick={onClose}>{note.related.label} ↗</a> : null}
      </article>
    </div>
  );
}

export default function GardenNotes() {
  const [selected, setSelected] = useState<GardenNote | null>(null);

  return (
    <section className="garden-notes" id="notes">
      <header className="notes-heading">
        <div><p className="section-kicker">NOTES FROM THE GARDEN</p><h2>庭院手记</h2></div>
        <p>不必写成正式的文章。<br />只把某个时刻留下来，等它以后再次发芽。</p>
      </header>
      <div className="notes-grid">
        {gardenNotes.map((note, index) => (
          <button className={index === 0 ? "note-card note-featured" : "note-card"} type="button" key={note.slug} onClick={() => setSelected(note)}>
            <div><span>{String(index + 1).padStart(2, "0")}</span><time>{note.date}</time></div>
            <small>{note.category}</small>
            <h3>{note.title}</h3>
            <p>{note.excerpt}</p>
            <strong>展开手记 ↗</strong>
          </button>
        ))}
      </div>
      <p className="notes-closing">有新的念头时，就回来添一页。</p>
      {selected ? <NoteDialog note={selected} onClose={() => setSelected(null)} /> : null}
    </section>
  );
}
