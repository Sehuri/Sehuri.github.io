import GardenFeatures from "./GardenFeatures";

const spaces = [
  {
    index: "01",
    name: "远行",
    english: "TRAVEL",
    description: "把走过的城市、遇见的风景，留在一张会持续生长的地图上。",
    detail: "52 座城市 · 2 个国家",
    href: "https://sehuri.github.io/travel-map/",
    action: "打开旅行地图",
    tone: "travel",
  },
  {
    index: "02",
    name: "阅迹",
    english: "READING",
    description: "书架、划线，以及那些曾让我停下来想一想的句子。",
    detail: "连接微信读书 · 持续更新",
    href: "https://yueji-reading-room.shenhuil.chatgpt.site",
    action: "走进阅览室",
    tone: "reading",
  },
  {
    index: "03",
    name: "知庭",
    english: "KNOWLEDGE",
    description: "从文章、视频和零散灵感里，慢慢长出自己的知识花园。",
    detail: "个人知识 Wiki · 持续更新",
    href: "https://sehuri.github.io/Sehuri-knowledge-wiki/",
    action: "进入知识花园",
    tone: "knowledge",
  },
  {
    index: "04",
    name: "听潮",
    english: "MUSIC",
    description: "有些时刻适合写下来，有些时刻，要用一首歌保存。",
    detail: "唱片收藏 · 慢慢更新",
    href: "#records",
    action: "走进唱片室",
    tone: "music",
  },
] as const;

const albums = [
  {
    title: "1Q84 OST",
    artist: "原声音乐",
    year: "收藏示例",
    trackCount: "12 首歌曲",
    note: "适合在两个月亮升起时听。",
  },
] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main>
      <a className="skip-link" href="#today">跳到今日庭院</a>

      <section className="hero" id="top">
        <nav className="site-nav" aria-label="主导航">
          <a className="wordmark" href="#top" aria-label="深绘里首页">
            <span className="wordmark-seal">深</span>
            <span>深绘里</span>
          </a>
          <div className="nav-links">
            <a href="#spaces">我的空间</a>
            <a href="#about">关于我</a>
            <a href="https://github.com/Sehuri" target="_blank" rel="noreferrer">
              GitHub <Arrow />
            </a>
          </div>
        </nav>

        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow">SEHURI&apos;S DIGITAL GARDEN</p>
          <h1>
            深绘里
            <span>在自己的世界里，慢慢生长。</span>
          </h1>
          <p className="hero-intro">
            在旅行、阅读与知识之间，
            <br />
            收藏我看见的世界。
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#spaces">
              进入我的世界 <span aria-hidden="true">↓</span>
            </a>
            <a className="text-action" href="#today">看看今天</a>
          </div>
        </div>

        <div className="hero-note" aria-hidden="true">
          <span>29.07.2026</span>
          <i />
          <span>SHANGHAI · CHINA</span>
        </div>
        <a className="scroll-cue" href="#spaces" aria-label="向下浏览">
          <span />
          SCROLL
        </a>
      </section>

      <GardenFeatures />

      <section className="spaces" id="spaces">
        <header className="section-heading">
          <div>
            <p className="section-kicker">PLACES I KEEP</p>
            <h2>我的几处空间</h2>
          </div>
          <p>
            这里存放我的足迹、阅读、知识与声音。
            <br />
            它们各自生长，也在这里彼此相遇。
          </p>
        </header>

        <div className="space-grid">
          {spaces.map((space) => {
            const content = (
              <>
                <div className="card-top">
                  <span className="space-index">{space.index}</span>
                  <span className="space-english">{space.english}</span>
                </div>
                <div className="card-copy">
                  <h3>{space.name}</h3>
                  <p>{space.description}</p>
                </div>
                <div className="card-footer">
                  <span>{space.detail}</span>
                  <strong>{space.action} {"href" in space ? <Arrow /> : null}</strong>
                </div>
              </>
            );

            return "href" in space ? (
              <a
                className={`space-card ${space.tone}`}
                href={space.href}
                key={space.name}
                aria-label={`${space.action}：${space.name}`}
              >
                {content}
              </a>
            ) : (
              <article
                className={`space-card ${space.tone} is-pending`}
                key={space.name}
                aria-label={`${space.name}，${space.action}`}
              >
                {content}
              </article>
            );
          })}
        </div>
      </section>

      <section className="records" id="records">
        <header className="records-heading">
          <div>
            <p className="section-kicker">RECORDS I KEEP</p>
            <h2>深绘里的唱片室</h2>
          </div>
          <p>
            收藏那些陪我走过一段时间的声音。
            <br />
            这里只陈列喜欢，不急着解释。
          </p>
        </header>

        <div className="album-list">
          {albums.map((album, index) => (
            <article className="album-card" key={album.title}>
              <div className="album-cover" aria-label={`${album.title} 专辑封面`}>
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

              <div className="album-copy">
                <div className="album-number">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <i />
                  <small>FAVORITE ALBUM</small>
                </div>
                <h3>{album.title}</h3>
                <p className="album-meta">
                  {album.artist} <span>·</span> {album.year} <span>·</span>{" "}
                  {album.trackCount}
                </p>
                <blockquote>“{album.note}”</blockquote>
              </div>
            </article>
          ))}
        </div>

        <p className="records-note">
          唱片室刚刚亮灯。下一张喜欢的专辑，会继续摆在这里。
        </p>
      </section>

      <section className="about" id="about">
        <div className="about-mark" aria-hidden="true">
          <span>深</span>
          <i />
        </div>
        <div className="about-copy">
          <p className="section-kicker">A NOTE ABOUT ME</p>
          <h2>
            我喜欢走远一点，
            <br />
            也喜欢把沿途的东西整理下来。
          </h2>
          <p>
            这里不是一份静止的简历，而是一个会随我一起变化的长期项目。
            我把旅途做成地图，把阅读留在书房，也把零散的信息养成自己的知识花园。
          </p>
          <p>
            还会有音乐，还有尚未想好名字的新空间。
            <br />
            欢迎偶尔回来看看。
          </p>
        </div>
        <blockquote>
          <span>“</span>
          世界很大，
          <br />
          我用自己的方式收藏它。
        </blockquote>
      </section>

      <footer>
        <a className="wordmark footer-brand" href="#top">
          <span className="wordmark-seal">深</span>
          <span>深绘里</span>
        </a>
        <p>Built slowly, kept sincerely.</p>
        <div>
          <a href="https://sehuri.github.io/travel-map/">旅行</a>
          <a href="https://yueji-reading-room.shenhuil.chatgpt.site">阅读</a>
          <a href="https://sehuri.github.io/Sehuri-knowledge-wiki/">知识</a>
          <a href="#records">音乐</a>
          <a href="https://github.com/Sehuri" target="_blank" rel="noreferrer">GitHub</a>
        </div>
        <small>© 2026 SEHURI</small>
      </footer>
    </main>
  );
}
