import type { Metadata } from "next";
import NowSection from "../NowSection";

export const metadata: Metadata = {
  title: "此刻 / NOW｜深绘里",
  description: "深绘里此刻正在阅读、聆听、观看、研究与期待的事。",
};

export default function NowPage() {
  return (
    <main className="now-page">
      <nav className="now-page-nav" aria-label="此刻页面导航">
        <a className="wordmark" href="/" aria-label="返回深绘里首页">
          <span className="wordmark-seal">深</span>
          <span>深绘里</span>
        </a>
        <a href="/">← 返回庭院</a>
      </nav>
      <NowSection />
    </main>
  );
}
