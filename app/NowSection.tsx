const nowItems = [
  {
    label: "正在读",
    english: "READING",
    value: "《简约至上》\n《佩德罗·巴拉莫》",
    href: "https://yueji-reading-room.shenhuil.chatgpt.site",
    tone: "reading",
  },
  {
    label: "最近循环",
    english: "ON REPEAT",
    value: "《脚本》",
    meta: "王力宏",
    href: "#records",
    tone: "music",
  },
  {
    label: "最近看完",
    english: "JUST WATCHED",
    value: "《奥德赛》",
    href: "#films",
    tone: "film",
  },
  {
    label: "正在研究",
    english: "EXPLORING",
    value: "本体论",
    href: "https://sehuri.github.io/Sehuri-knowledge-wiki/",
    tone: "knowledge",
  },
  {
    label: "下一站",
    english: "NEXT STOP",
    value: "新加坡 + 印度尼西亚",
    href: "https://sehuri.github.io/travel-map/",
    tone: "travel",
  },
] as const;

export default function NowSection() {
  return (
    <section className="now-section" id="now" aria-labelledby="now-title">
      <div className="now-shell">
        <header className="now-heading">
          <div>
            <p className="section-kicker">THIS MOMENT · 2026.09.22</p>
            <h2 id="now-title">此刻</h2>
          </div>
          <p>一些正在发生的事。不是近况汇报，只是这一阶段生活留下的坐标。</p>
        </header>

        <div className="now-board">
          <div className="now-location">
            <div className="now-location-mark" aria-hidden="true">
              <span />
              <i />
            </div>
            <div>
              <p>当前所在 · CURRENTLY IN</p>
              <h3>南京</h3>
              <span>NANJING · CHINA</span>
            </div>
            <small>01</small>
          </div>

          <div className="now-grid">
            {nowItems.map((item, index) => (
              <a className={`now-item ${item.tone}`} href={item.href} key={item.label}>
                <div>
                  <span>{String(index + 2).padStart(2, "0")}</span>
                  <small>{item.english}</small>
                </div>
                <p>{item.label}</p>
                <h3>{item.value.split("\n").map((line) => <span key={line}>{line}</span>)}</h3>
                {"meta" in item ? <em>{item.meta}</em> : null}
                <b aria-hidden="true">↗</b>
              </a>
            ))}
          </div>
        </div>

        <div className="now-updated">
          <span>LAST UPDATED</span>
          <i />
          <time dateTime="2026-09-22">2026.09.22</time>
        </div>
      </div>
    </section>
  );
}
