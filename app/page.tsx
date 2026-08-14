import GardenFeatures from "./GardenFeatures";
import GardenGrowth from "./GardenGrowth";
import GardenNotes from "./GardenNotes";
import GlobalExperience from "./GlobalExperience";
import FilmCollection from "./FilmCollection";
import ContactSection from "./ContactSection";
import HeroMoonExperience from "./HeroMoonExperience";
import MurakamiLibrary from "./MurakamiLibrary";
import RecordCollection from "./RecordCollection";
import { recordCount } from "./albumData";
import { murakamiBooks } from "./murakamiData";
import { filmCount } from "./filmData";

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
    detail: recordCount + " 张唱片 · 慢慢更新",
    href: "#records",
    action: "走进唱片室",
    tone: "music",
  },
  {
    index: "05",
    name: "庭院手记",
    english: "NOTES",
    description: "写下一段旅途、一本书、一首歌，或某个不想让它消失的念头。",
    detail: "4 篇手记 · 不定期生长",
    href: "#notes",
    action: "翻开庭院手记",
    tone: "notes",
  },
  {
    index: "06",
    name: "光影",
    english: "CINEMA",
    description: "把那些让我相信、怀疑、落泪或久久沉默的电影，留在时间里。",
    detail: `${filmCount} 部电影 · 按年份收藏`,
    href: "#films",
    action: "走进光影馆",
    tone: "film",
  },
  {
    index: "07",
    name: "村上春樹",
    english: "MURAKAMI",
    description: "在现实与另一个世界的缝隙里，收藏我反复回到的作品。",
    detail: `${murakamiBooks.length} 部作品 · 长篇与短篇小说集`,
    href: "#murakami",
    action: "走进村上书房",
    tone: "murakami",
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
            <a href="#moon-guide">两个月亮</a>
            <a href="#growth">庭院年轮</a>
            <a href="#about">关于我</a>
            <a href="#contact">联系我</a>
            <a href="https://github.com/Sehuri" target="_blank" rel="noreferrer">
              GitHub <Arrow />
            </a>
          </div>
          <GlobalExperience />
        </nav>

        <div className="hero-shade" aria-hidden="true" />
        <HeroMoonExperience />
        <div className="day-motifs" aria-hidden="true"><span className="day-bird">⌁</span><span className="day-shadow" /><span className="day-unicorn">♞</span><p>THE SHADOW RETURNS</p></div>
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
            这里存放我的足迹、阅读、知识、声音与光影。
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

      <GardenNotes />

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

        <RecordCollection />
      </section>

      <section className="films" id="films">
        <header className="films-heading">
          <div>
            <p className="section-kicker">FILMS I KEEP</p>
            <h2>深绘里的光影馆</h2>
          </div>
          <p>
            有些故事在银幕结束后，仍会跟着人走很久。
            <br />
            这里按时间保存我愿意再次回看的电影。
          </p>
        </header>
        <FilmCollection />
      </section>

      <MurakamiLibrary />

      <GardenGrowth />

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
            音乐有了自己的唱片室，村上春树的作品拥有一间书房，喜欢的电影也在光影馆里依年份排开；庭院年轮继续记录它们如何生长。
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

      <ContactSection />

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
          <a href="#notes">手记</a>
          <a href="#films">电影</a>
          <a href="#murakami">村上</a>
          <a href="#growth">年轮</a>
          <a href="#contact">联系</a>
          <a href="https://github.com/Sehuri" target="_blank" rel="noreferrer">GitHub</a>
        </div>
        <small>© 2026 SEHURI</small>
      </footer>
    </main>
  );
}
