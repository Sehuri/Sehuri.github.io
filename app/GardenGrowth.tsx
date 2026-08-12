import { recordCount } from "./albumData";
import { murakamiBooks } from "./murakamiData";
import { filmCount } from "./filmData";

const startDate = new Date("2026-07-29T00:00:00+08:00");
const today = new Date();
const growingDays = Math.max(1, Math.floor((today.getTime() - startDate.getTime()) / 86400000) + 1);

const stats = [
  { value: "52", unit: "座城市", label: "走过的足迹", href: "https://sehuri.github.io/travel-map/" },
  { value: "26", unit: "本书", label: "今年的阅读", href: "https://yueji-reading-room.shenhuil.chatgpt.site" },
  { value: String(recordCount), unit: "张唱片", label: "收藏的声音", href: "#records" },
  { value: "128", unit: "篇知识", label: "知识花园收录", href: "https://sehuri.github.io/Sehuri-knowledge-wiki/" },
  { value: String(murakamiBooks.length), unit: "部作品", label: "村上书房", href: "#murakami" },
  { value: String(filmCount), unit: "部电影", label: "光影馆收藏", href: "#films" },
  { value: String(growingDays), unit: "天", label: "网站持续生长", href: "#growth" },
] as const;

const growthEvents = [
  { date: "2026.08", title: "光影馆开始放映", space: "CINEMA", description: `${filmCount} 部电影按上映时间排开，发行海报、故事与私人注解拥有了自己的位置。`, href: "#films", image: "/movie-posters/oppenheimer.jpg", imageAlt: "《奥本海默》电影海报" },
  { date: "2026.08", title: "两个月亮升起", space: "TWO MOONS", description: "首屏的两个月亮成为可以进入的两条声音路径。", href: "#moon-guide", image: "/shenhuili.png", imageAlt: "深绘里天空中的两个月亮" },
  { date: "2026.08", title: "村上书房建立", space: "MURAKAMI", description: "整理长篇、短篇小说集、作品年图、私人珍藏与四条入门路线。", href: "#murakami", image: "/book-covers/the-city-and-its-uncertain-walls.png", imageAlt: "《小城与不确定性的墙》封面" },
  { date: "2026.08", title: "1Q84 OST 完成双面选集", space: "MUSIC", description: "十六首歌曲分居两个世界，并为每一首留下解读与衔接。", href: "#records", image: "/book-covers/1q84.jpg", imageAlt: "《1Q84》封面" },
  { date: "2026.08", title: "唱片室继续扩建", space: "RECORDS", description: `专辑收藏增长至 ${recordCount} 张，封面、曲目与作品介绍逐渐齐全。`, href: "#records", image: "/book-covers/after-dark.jpg", imageAlt: "《天黑以后》封面" },
  { date: "2026.07", title: "今日庭院与随便走走开放", space: "GARDEN", description: "旅行、阅读、知识、音乐与电影开始在主页随机相遇。", href: "#today", image: "/shenhuili.png", imageAlt: "深绘里数字庭院" },
  { date: "2026.07", title: "几处空间完成连接", space: "SPACES", description: "旅行地图、阅览室、知识花园与唱片室汇入同一座庭院，后来书房与光影馆也陆续亮灯。", href: "#spaces", image: "/shenhuili.png", imageAlt: "深绘里个人网站主页" },
  { date: "2026.07", title: "深绘里正式上线", space: "BEGINNING", description: "在两个月亮下，个人网站拥有了第一个可以抵达的地址。", href: "#top", image: "/shenhuili.png", imageAlt: "深绘里首屏" },
] as const;

export default function GardenGrowth() {
  return (
    <section className="garden-growth" id="growth">
      <header className="growth-heading">
        <div><p className="section-kicker">RINGS OF THE GARDEN</p><h2>庭院年轮</h2></div>
        <p>数字记录此刻，时间留下生长。<br />这里不追求完成，只保存每一次变得更像自己的过程。</p>
      </header>

      <div className="growth-now">
        <div className="growth-now-title"><span>NOW</span><h3>此刻的数据</h3><p>LAST UPDATED · 2026.08</p></div>
        <div className="growth-stat-grid">
          {stats.map((stat) => (
            <a href={stat.href} key={stat.label}>
              <div><strong>{stat.value}</strong><span>{stat.unit}</span></div>
              <p>{stat.label}</p><i aria-hidden="true">↗</i>
            </a>
          ))}
        </div>
      </div>

      <div className="growth-timeline">
        <div className="growth-timeline-title"><p>HOW THE GARDEN GREW</p><h3>成长时间线</h3><span>从最近一次变化，向最初的那天回望。</span></div>
        <ol>
          {growthEvents.map((event, index) => (
            <li key={`${event.date}-${event.title}`}>
              <div className="growth-event-date"><span>{event.date}</span><i /></div>
              <a href={event.href}>
                <div className="growth-event-image"><img src={event.image} alt={event.imageAlt} loading="lazy" /></div>
                <div className="growth-event-copy"><small>{event.space}</small><h4>{event.title}</h4><p>{event.description}</p></div>
                <strong>{String(growthEvents.length - index).padStart(2, "0")} ↗</strong>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
