"use client";

import { useEffect, useRef, useState } from "react";

export type ShareCardData = {
  category: "唱片" | "影视" | "庭院手记" | "村上书房";
  title: string;
  meta: string;
  quote: string;
  targetId: string;
  tone: "record" | "film" | "note" | "book";
  coverUrls?: readonly string[];
  coverLabel?: string;
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

function loadImage(source: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    if (/^https?:\/\//u.test(source)) image.crossOrigin = "anonymous";
    image.referrerPolicy = "no-referrer";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = source;
  });
}

async function loadFirstImage(sources: readonly string[]) {
  for (const source of sources) {
    try {
      return await loadImage(source);
    } catch {
      // Try the next known cover before drawing the designed fallback.
    }
  }
  return null;
}

function drawContainedImage(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  context.save();
  context.shadowColor = "rgba(7, 21, 37, 0.22)";
  context.shadowBlur = 26;
  context.shadowOffsetY = 12;
  context.drawImage(image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);
  context.restore();
}

function drawDesignedCover(
  context: CanvasRenderingContext2D,
  data: ShareCardData,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const palette = palettes[data.tone];
  const coverWidth = data.tone === "record" ? height : Math.min(330, width * 0.42);
  const coverX = x + (width - coverWidth) / 2;
  context.save();
  context.fillStyle = data.tone === "film" || data.tone === "record" ? "#0b2032" : palette.soft;
  context.fillRect(coverX, y, coverWidth, height);
  context.strokeStyle = palette.accent;
  context.globalAlpha = 0.7;
  context.lineWidth = 2;
  context.strokeRect(coverX + 18, y + 18, coverWidth - 36, height - 36);
  context.globalAlpha = 1;

  if (data.tone === "record") {
    context.fillStyle = "#ead6a9";
    context.beginPath();
    context.arc(coverX + coverWidth * 0.62, y + height * 0.34, 58, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = "#b7c2bd";
    context.beginPath();
    context.arc(coverX + coverWidth * 0.42, y + height * 0.48, 40, 0, Math.PI * 2);
    context.fill();
  }

  context.fillStyle = data.tone === "film" || data.tone === "record" ? "#f1ece2" : palette.ink;
  context.textAlign = "center";
  context.font = '600 20px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
  context.globalAlpha = 0.72;
  context.fillText(data.category, coverX + coverWidth / 2, y + 70);
  context.globalAlpha = 1;
  context.font = '500 42px "Songti SC", "STSong", serif';
  drawWrappedText(context, data.coverLabel ?? data.title, coverX + coverWidth / 2, y + height * 0.68, coverWidth - 70, 54, 3);
  context.textAlign = "start";
  context.restore();
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

  const coverX = 112;
  const coverY = 262;
  const coverWidth = 856;
  const coverHeight = 448;
  context.fillStyle = data.tone === "film" ? "#10283a" : palette.soft;
  context.globalAlpha = 0.56;
  roundedRect(context, coverX, coverY, coverWidth, coverHeight, 18);
  context.fill();
  context.globalAlpha = 1;
  const cover = await loadFirstImage(data.coverUrls ?? []);
  if (cover) drawContainedImage(context, cover, coverX + 26, coverY + 22, coverWidth - 52, coverHeight - 44);
  else drawDesignedCover(context, data, coverX, coverY, coverWidth, coverHeight);

  context.fillStyle = palette.ink;
  context.font = '500 54px "Songti SC", "STSong", serif';
  const titleBottom = drawWrappedText(context, data.title, 112, 796, 856, 68, 2);

  context.globalAlpha = 0.58;
  context.font = '400 28px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
  const metaBottom = drawWrappedText(context, data.meta, 112, titleBottom + 12, 856, 38, 2);
  context.globalAlpha = 1;

  const quoteTop = Math.max(1010, metaBottom + 48);
  context.fillStyle = palette.accent;
  context.fillRect(112, quoteTop - 16, 3, 148);
  context.fillStyle = palette.ink;
  context.font = '400 34px "Songti SC", "STSong", serif';
  drawWrappedText(context, `“${data.quote}”`, 150, quoteTop + 20, 790, 52, 3);

  context.strokeStyle = palette.accent;
  context.globalAlpha = 0.32;
  context.beginPath();
  context.moveTo(112, 1192);
  context.lineTo(968, 1192);
  context.stroke();
  context.globalAlpha = 1;

  try {
    const avatar = await loadImage("/favicon-shenhuili.png");
    context.save();
    context.beginPath();
    context.arc(150, 1242, 38, 0, Math.PI * 2);
    context.clip();
    context.drawImage(avatar, 112, 1204, 76, 76);
    context.restore();
  } catch {
    context.fillStyle = palette.ink;
    context.beginPath();
    context.arc(150, 1242, 38, 0, Math.PI * 2);
    context.fill();
  }

  context.fillStyle = palette.ink;
  context.font = '600 26px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
  context.fillText("深绘里", 214, 1235);
  context.globalAlpha = 0.55;
  context.font = '400 21px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
  context.fillText("sehuri.github.io", 214, 1268);
  context.globalAlpha = 1;

  context.fillStyle = data.tone === "film" ? "#ead8b8" : "#ead6a9";
  context.beginPath();
  context.arc(890, 1230, 30, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = data.tone === "film" ? "#a8b9ba" : "#b7c2bd";
  context.beginPath();
  context.arc(938, 1268, 21, 0, Math.PI * 2);
  context.fill();
}

function canvasBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png", 1));
}

export default function ShareCard({ data }: { data: ShareCardData }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [ready, setReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shareUrl = `${canonicalRoot}#${encodeURIComponent(data.targetId)}`;

  useEffect(() => {
    if (!open || !canvasRef.current) return;
    let cancelled = false;
    setReady(false);
    setStatus(data.coverUrls?.length ? "正在准备封面…" : "正在生成卡片…");
    void paintCard(canvasRef.current, data).then(() => {
      if (cancelled) return;
      setReady(true);
      setStatus("");
    });
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      cancelled = true;
      window.removeEventListener("keydown", onKeyDown);
    };
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
              <button type="button" onClick={shareImage} disabled={!ready}>分享图片</button>
              <button type="button" onClick={saveImage} disabled={!ready}>保存卡片</button>
              <button type="button" onClick={copyLink}>复制链接</button>
            </div>
            <p className="share-card-status" aria-live="polite">{status}</p>
          </section>
        </div>
      ) : null}
    </div>
  );
}
