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
    detail: "13 张唱片 · 慢慢更新",
    href: "#records",
    action: "走进唱片室",
    tone: "music",
  },
] as const;

const featuredAlbum = {
  title: "1Q84 OST",
  artist: "原声音乐",
  year: "收藏置顶",
  trackCount: "12 首歌曲",
  note: "适合在两个月亮升起时听。",
} as const;

const albumTimeline = [
  {
    title: "陶喆同名专辑",
    artist: "陶喆",
    releaseDate: "1997-12-06",
    year: "1997",
    detail: "15 首歌曲",
    note: "从《爱，很简单》开始，华语 R&B 打开了一扇新门。",
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/dd/bb/bd/ddbbbda1-9408-72b2-4c0b-943e648be6c1/190295574086.jpg/1000x1000bb.jpg",
  },
  {
    title: "八度空间",
    artist: "周杰伦",
    releaseDate: "2002-07-18",
    year: "2002",
    detail: "10 首歌曲",
    note: "像推开一只半岛铁盒，里面还装着那个年代的想象力。",
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/96/c8/a1/96c8a1d8-8077-b8a7-8600-80b2abf1fe20/JAY.jpg/1000x1000bb.jpg",
  },
  {
    title: "黑色柳丁",
    artist: "陶喆",
    releaseDate: "2002-08-09",
    year: "2002",
    detail: "13 首歌曲",
    note: "有愤怒，有温柔，也有不会被时间磨平的锋利。",
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/05/7a/97/057a9723-2dbd-873b-81e0-5090879b2942/825646245352.jpg/1000x1000bb.jpg",
  },
  {
    title: "心中的日月",
    artist: "王力宏",
    releaseDate: "2004-12-31",
    year: "2004",
    detail: "11 首歌曲",
    note: "东方旋律和现代节奏，在心里照见同一轮月亮。",
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/be/4a/77/be4a7730-c144-a39e-c7b6-9d26ea0ebff3/1400X1400.jpg/1000x1000bb.jpg",
  },
  {
    title: "太平盛世",
    artist: "陶喆",
    releaseDate: "2005-01-21",
    year: "2005",
    detail: "13 首歌曲",
    note: "盛世的表面之下，仍然听得见真实的回声。",
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/fe/ad/e7/feade7c8-826b-0379-fbf4-e59606db8e4c/825646245406.jpg/1000x1000bb.jpg",
  },
  {
    title: "盖世英雄",
    artist: "王力宏",
    releaseDate: "2005-12-30",
    year: "2005",
    detail: "10 首歌曲",
    note: "把东方的音色与流行节拍，唱成自己的英雄叙事。",
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/f9/82/88/f98288eb-ea32-6c8c-7919-357c31a4b437/1400X1400.jpg/1000x1000bb.jpg",
  },
  {
    title: "改变自己",
    artist: "王力宏",
    releaseDate: "2007-07-01",
    year: "2007",
    detail: "12 首歌曲",
    note: "轻快地向前走，也提醒自己每天都可以更新一点。",
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d6/d1/bb/d6d1bb74-e2d3-743e-f514-5668390c4d67/gaibianziji_fengmian.jpg/1000x1000bb.jpg",
  },
  {
    title: "心跳",
    artist: "王力宏",
    releaseDate: "2008-12-26",
    year: "2008",
    detail: "10 首歌曲",
    note: "旋律靠近时，情绪也跟着有了清晰的脉搏。",
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/58/be/1c/58be1cf6-8260-bafb-ae50-664ee9f3ec31/Heart_Beat.jpg/1000x1000bb.jpg",
  },
  {
    title: "到此为止",
    artist: "徐佳莹",
    releaseDate: "2017-12-27",
    year: "2017",
    detail: "收录于《心里学》",
    note: "有些告别不需要更多解释，唱到这里刚刚好。",
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/8a/60/e8/8a60e833-5516-7c16-2bdf-864627aa71e4/4713108163152.jpg/1000x1000bb.jpg",
  },
  {
    title: "摩天动物园",
    artist: "邓紫棋",
    releaseDate: "2019-12-27",
    year: "2019",
    detail: "13 首歌曲",
    note: "在繁华城市里，看见人群，也看见我们自己。",
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/6e/20/22/6e202262-eaab-bca1-fe63-7ae59bd74183/886448203421.jpg/1000x1000bb.jpg",
  },
  {
    title: "启示录",
    artist: "邓紫棋",
    releaseDate: "2022-09-22",
    year: "2022",
    detail: "14 首歌曲",
    note: "像一封写给黑夜的信，最终仍然抵达光。",
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/88/cc/70/88cc70bd-3763-a558-33dd-dbe07c8848d9/5054197302183.jpg/1000x1000bb.jpg",
  },
  {
    title: "HeartBreakFast 伤心早餐店",
    artist: "卢广仲",
    releaseDate: "2025-09-17",
    year: "2025",
    detail: "10 首歌曲",
    note: "把难过放在清晨，配一份仍要继续生活的早餐。",
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/ee/85/8f/ee858f39-7c88-5390-4061-6f2de8c43279/4711508138732.jpg/1000x1000bb.jpg",
  },
] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const chronologicalAlbums = [...albumTimeline].sort((a, b) =>
    a.releaseDate.localeCompare(b.releaseDate),
  );

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

            return (
              <a
                className={`space-card ${space.tone}`}
                href={space.href}
                key={space.name}
                aria-label={`${space.action}：${space.name}`}
              >
                {content}
              </a>
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
          <article className="album-card album-featured">
              <div
                className="album-cover"
                aria-label={`${featuredAlbum.title} 专辑封面`}
              >
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
                  <span>01</span>
                  <i />
                  <small>ALWAYS FIRST</small>
                </div>
                <h3>{featuredAlbum.title}</h3>
                <p className="album-meta">
                  {featuredAlbum.artist} <span>·</span> {featuredAlbum.year}{" "}
                  <span>·</span> {featuredAlbum.trackCount}
                </p>
                <blockquote>“{featuredAlbum.note}”</blockquote>
              </div>
          </article>
        </div>

        <div className="album-timeline-heading">
          <span>1997</span>
          <i />
          <p>其余收藏，按发行时间慢慢排开</p>
          <i />
          <span>2025</span>
        </div>

        <div className="album-gallery">
          {chronologicalAlbums.map((album, index) => (
            <article className="album-tile" key={album.title}>
              <div className="album-artwork">
                <img
                  src={album.artwork}
                  alt={`${album.artist}《${album.title}》封面`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <span>{String(index + 2).padStart(2, "0")}</span>
              </div>
              <div className="album-tile-copy">
                <p>{album.year}</p>
                <h3>{album.title}</h3>
                <div className="album-tile-meta">
                  <span>{album.artist}</span>
                  <i />
                  <span>{album.detail}</span>
                </div>
                <blockquote>“{album.note}”</blockquote>
              </div>
            </article>
          ))}
        </div>

        <p className="records-note">
          13 张唱片，依时间排开。下一张喜欢的专辑，会继续摆在这里。
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
            音乐也在这里有了自己的唱片室，还有尚未想好名字的新空间。
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
