"use client";

import { useEffect, useRef, useState } from "react";

export type ShareCardData = {
  category: "唱片" | "影视" | "庭院手记" | "村上书房";
  title: string;
  meta: string;
  quote: string;
  targetId: string;
  tone: "record" | "film" | "note" | "book";
};

const canonicalRoot = "https://sehuri.github.io/";

const palettes = {
  record: { background: "#eee8e5", ink: "#071525", accent: "#876d8d", soft: "#d9c9d6" },
  film: { background: "#091a29", ink: "#f1ece2", accent: "#c79563", soft: "#24384a" },
  note: { background: "#f2eee7", ink: "#071525", accent: "#628d94", soft: "#d5dfdc" },
  book: { background: "#eee9df", ink: "#071525", accent: "#8b6c52", soft: "#d9cbbd" },
} as const;

function wrapText(context: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const lines: string[] = [];
  let current = "";
  for (const character of Array.from(text)) {
    const next = current + character;
    if (current && context.measureText(next).width > maxWidth) {
      lines.push(current);
      current = character;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function drawWrappedText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number,
) {
  const lines = wrapText(context, text, maxWidth);
  const visible = lines.slice(0, maxLines);
  if (lines.length > maxLines) {
    let last = visible[maxLines - 1] ?? "";
    while (last && context.measureText(last + "…").width > maxWidth) last = last.slice(0, -1);
    visible[maxLines - 1] = last.replace(/[，。！？、；：,.!?;:]$/u, "") + "…";
  }
  visible.forEach((line, index) => context.fillText(line, x, y + index * lineHeight));
  return y + visible.length * lineHeight;
}

function roundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
}

function loadAvatar() {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = "/favicon-shenhuili.png";
  });
}

async function paintCard(canvas: HTMLCanvasElement, data: ShareCardData) {
  const context = canvas.getContext("2d");
  if (!context) return;
  const palette = palettes[data.tone];
  const width = 1080;
  const height = 1350;
  canvas.width = width;
  canvas.height = height;

  context.fillStyle = palette.background;
  context.fillRect(0, 0, width, height);

  const wash = context.createRadialGradient(900, 160, 20, 900, 160, 620);
  wash.addColorStop(0, palette.soft);
  wash.addColorStop(1, "transparent");
  context.fillStyle = wash;
  context.fillRect(0, 0, width, height);

  context.strokeStyle = palette.accent;
  context.globalAlpha = 0.42;
  context.lineWidth = 2;
  roundedRect(context, 62, 62, 956, 1226, 36);
  context.stroke();
  context.globalAlpha = 1;

  context.fillStyle = palette.accent;
  context.font = '600 24px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
  context.letterSpacing = "5px";
  context.fillText("SEHURI'S DIGITAL GARDEN", 112, 145);
  context.letterSpacing = "0px";

  context.fillStyle = palette.ink;
  context.font = '600 34px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
  context.fillText("深绘里的收藏", 112, 214);

  context.fillStyle = palette.accent;
  context.font = '600 22px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
  context.fillText(data.category, 112, 278);

  context.fillStyle = palette.ink;
  context.font = '500 68px "Songti SC", "STSong", serif';
  const titleBottom = drawWrappedText(context, data.title, 112, 390, 820, 86, 3);

  context.globalAlpha = 0.58;
  context.font = '400 28px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
  const metaBottom = drawWrappedText(context, data.meta, 112, titleBottom + 18, 820, 42, 2);
  context.globalAlpha = 1;

  const quoteTop = Math.max(690, metaBottom + 90);
  context.fillStyle = palette.accent;
  context.fillRect(112, quoteTop - 20, 3, 270);
  context.fillStyle = palette.ink;
  context.font = '400 42px "Songti SC", "STSong", serif';
  drawWrappedText(context, `“${data.quote}”`, 154, quoteTop + 30, 760, 66, 4);

  context.strokeStyle = palette.accent;
  context.globalAlpha = 0.32;
  context.beginPath();
  context.moveTo(112, 1080);
  context.lineTo(968, 1080);
  context.stroke();
  context.globalAlpha = 1;

  try {
    const avatar = await loadAvatar();
    context.save();
    context.beginPath();
    context.arc(158, 1172, 52, 0, Math.PI * 2);
    context.clip();
    context.drawImage(avatar, 106, 1120, 104, 104);
    context.restore();
  } catch {
    context.fillStyle = palette.ink;
    context.beginPath();
    context.arc(158, 1172, 52, 0, Math.PI * 2);
    context.fill();
  }

  context.fillStyle = palette.ink;
  context.font = '600 26px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
  context.fillText("深绘里", 232, 1163);
  context.globalAlpha = 0.55;
  context.font = '400 21px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
  context.fillText("sehuri.github.io", 232, 1202);
  context.globalAlpha = 1;

  context.fillStyle = data.tone === "film" ? "#ead8b8" : "#ead6a9";
  context.beginPath();
  context.arc(882, 1143, 34, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = data.tone === "film" ? "#a8b9ba" : "#b7c2bd";
  context.beginPath();
  context.arc(936, 1195, 24, 0, Math.PI * 2);
  context.fill();
}

function canvasBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png", 1));
}

export default function ShareCard({ data }: { data: ShareCardData }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shareUrl = `${canonicalRoot}#${encodeURIComponent(data.targetId)}`;

  useEffect(() => {
    if (!open || !canvasRef.current) return;
    void paintCard(canvasRef.current, data);
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [data, open]);

  const saveImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `深绘里-${data.category}-${data.title.replace(/[《》「」]/g, "")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    setStatus("卡片已保存");
  };

  const shareImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const blob = await canvasBlob(canvas);
    if (!blob) return saveImage();
    const file = new File([blob], `深绘里-${data.title.replace(/[《》「」]/g, "")}.png`, { type: "image/png" });
    const payload = { title: `深绘里｜${data.title}`, text: data.quote, url: shareUrl, files: [file] };
    if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
      try {
        await navigator.share(payload);
        setStatus("已打开系统分享");
        return;
      } catch (error) {
        if ((error as DOMException).name === "AbortError") return;
      }
    }
    await saveImage();
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setStatus("内容链接已复制");
  };

  return (
    <div className="share-card-entry">
      <button className="share-card-trigger" type="button" onClick={() => { setStatus(""); setOpen(true); }}>
        <span aria-hidden="true">↗</span> 生成分享卡片
      </button>
      {open ? (
        <div className="share-card-backdrop" onMouseDown={() => setOpen(false)}>
          <section className="share-card-dialog" role="dialog" aria-modal="true" aria-labelledby="share-card-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="share-card-close" type="button" onClick={() => setOpen(false)} aria-label="关闭分享卡片">×</button>
            <div className="share-card-copy">
              <p>SHARE A PIECE OF THE GARDEN</p>
              <h3 id="share-card-title">把这份收藏带走</h3>
              <span>保存图片后，可以分享到微信、小红书或 X；卡片会带上深绘里头像与网站地址。</span>
            </div>
            <div className={`share-card-preview share-card-${data.tone}`}><canvas ref={canvasRef} aria-label={`${data.title}分享卡片预览`} /></div>
            <div className="share-card-actions">
              <button type="button" onClick={shareImage}>分享图片</button>
              <button type="button" onClick={saveImage}>保存卡片</button>
              <button type="button" onClick={copyLink}>复制链接</button>
            </div>
            <p className="share-card-status" aria-live="polite">{status}</p>
          </section>
        </div>
      ) : null}
    </div>
  );
}
