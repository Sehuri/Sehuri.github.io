"use client";

import { useEffect, useState } from "react";

type QrContact = {
  name: string;
  handle: string;
  note: string;
  image: string;
};

const qrContacts: QrContact[] = [
  { name: "微信", handle: "FukaEri_MarPsc", note: "扫描二维码，添加我为好友", image: "/contact/wechat.jpg" },
  { name: "抖音", handle: "@深绘里 · 1100228514", note: "使用抖音扫码找到我", image: "/contact/douyin.jpg" },
  { name: "小红书", handle: "深绘里 · 3895534355", note: "扫描二维码，在小红书找到我", image: "/contact/xiaohongshu.jpg" },
];

function QrDialog({ contact, onClose }: { contact: QrContact; onClose: () => void }) {
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
    <div className="contact-dialog-backdrop" onMouseDown={onClose}>
      <section className="contact-dialog" role="dialog" aria-modal="true" aria-labelledby="contact-dialog-title" onMouseDown={(event) => event.stopPropagation()}>
        <button type="button" onClick={onClose} aria-label="关闭二维码" autoFocus><span aria-hidden="true">×</span></button>
        <p>SCAN TO FIND ME</p>
        <h2 id="contact-dialog-title">{contact.name}</h2>
        <img src={contact.image} alt={`${contact.name}二维码`} />
        <strong>{contact.handle}</strong>
        <span>{contact.note}</span>
      </section>
    </div>
  );
}

export default function ContactSection() {
  const [selected, setSelected] = useState<QrContact | null>(null);

  return (
    <section className="contact-section" id="contact">
      <header className="contact-heading">
        <div><p className="section-kicker">WAYS TO FIND ME</p><h2>与我相遇</h2></div>
        <p>如果你也喜欢旅行、阅读、音乐与电影，<br />欢迎从这里找到我，说一声你好。</p>
      </header>

      <div className="contact-layout">
        <div className="contact-qr-grid">
          {qrContacts.map((contact, index) => (
            <button type="button" className="contact-qr-card" key={contact.name} onClick={() => setSelected(contact)}>
              <div className="contact-qr-image"><img src={contact.image} alt={`${contact.name}二维码预览`} loading="lazy" /><span>{String(index + 1).padStart(2, "0")}</span></div>
              <div><small>SCAN QR CODE</small><h3>{contact.name}</h3><p>{contact.handle}</p><strong>放大二维码 ↗</strong></div>
            </button>
          ))}
        </div>

        <div className="contact-links">
          <a href="https://x.com/lyxun72688466" target="_blank" rel="noreferrer"><span>X</span><div><small>SOCIAL</small><h3>@lyxun72688466</h3></div><i>↗</i></a>
          <a href="https://www.instagram.com/shenhuili70/" target="_blank" rel="noreferrer"><span>IG</span><div><small>INSTAGRAM</small><h3>shenhuili70</h3></div><i>↗</i></a>
          <a href="mailto:01326039@wisedu.com"><span>01</span><div><small>EMAIL · WORK</small><h3>01326039@wisedu.com</h3></div><i>↗</i></a>
          <a href="mailto:1174156948@qq.com"><span>02</span><div><small>EMAIL · PERSONAL</small><h3>1174156948@qq.com</h3></div><i>↗</i></a>
          <a href="https://github.com/Sehuri" target="_blank" rel="noreferrer"><span>GH</span><div><small>GITHUB</small><h3>Sehuri</h3></div><i>↗</i></a>
        </div>
      </div>

      <p className="contact-note">二维码只用于添加联系账号，请勿将它们用于其他用途。</p>
      {selected ? <QrDialog contact={selected} onClose={() => setSelected(null)} /> : null}
    </section>
  );
}
