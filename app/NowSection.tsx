const books = [
  {
    title: "简约至上",
    original: "Simple and Usable",
    creator: "[英] 贾尔斯·科尔伯恩",
    meta: "交互式设计 · 人民邮电出版社",
    image: "/now/simple-and-usable-cn.jpg",
    imageAlt: "《简约至上：交互式设计四策略》中文版封面",
    description: "把复杂的交互问题收束为四种方法：删除、组织、隐藏与转移。它谈的不是表面的少，而是如何让真正重要的事情更容易被看见和使用。",
  },
  {
    title: "佩德罗·巴拉莫",
    original: "Pedro Páramo",
    creator: "[墨西哥] 胡安·鲁尔福",
    meta: "中篇小说 · 1955",
    image: "/now/pedro-paramo.jpg",
    imageAlt: "胡安·鲁尔福《佩德罗·巴拉莫》中文版封面",
    description: "一个人遵照母亲的遗愿来到科马拉寻找父亲，却只听见荒城中死者的低语。时间、记忆与声音彼此重叠，构成一座无法轻易离开的幽灵之城。",
  },
] as const;

export default function NowSection() {
  return (
    <article className="now-archive" aria-labelledby="now-page-title">
      <header className="now-archive-heading">
        <div>
          <p>THIS MOMENT · ISSUE 01</p>
          <h1 id="now-page-title">此刻</h1>
        </div>
        <div className="now-archive-place">
          <span>当前所在</span>
          <strong>南京</strong>
          <small>NANJING · CHINA</small>
        </div>
        <time dateTime="2026-09-22">2026.09.22</time>
      </header>

      <section className="now-reading" aria-labelledby="now-reading-title">
        <header>
          <span>01</span>
          <div><p>READING NOW</p><h2 id="now-reading-title">正在读</h2></div>
        </header>
        <div className="now-book-grid">
          {books.map((book) => (
            <article className="now-book" key={book.title}>
              <div className="now-book-cover"><img src={book.image} alt={book.imageAlt} /></div>
              <div className="now-work-copy">
                <p>{book.creator}</p>
                <h3>《{book.title}》</h3>
                <span>{book.original}</span>
                <small>{book.meta}</small>
                <div />
                <p>{book.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="now-feature now-music" aria-labelledby="now-music-title">
        <div className="now-feature-art square"><img src="/now/heart-beat.jpg" alt="王力宏《心·跳》专辑封面" /></div>
        <div className="now-feature-copy">
          <div className="now-feature-label"><span>02</span><p>ON REPEAT · 最近循环</p></div>
          <h2 id="now-music-title">《脚本》</h2>
          <h3>王力宏</h3>
          <dl>
            <div><dt>收录专辑</dt><dd>《心·跳》</dd></div>
            <div><dt>发行时间</dt><dd>2008</dd></div>
            <div><dt>类型</dt><dd>华语流行</dd></div>
          </dl>
          <p>把爱情想象成两个人共同写下、共同出演的剧本。旋律向前推进时，期待、失落和“怎样把结局写好”的愿望也被留在其中。</p>
        </div>
      </section>

      <section className="now-feature now-film" aria-labelledby="now-film-title">
        <div className="now-feature-copy">
          <div className="now-feature-label"><span>03</span><p>JUST WATCHED · 最近看完</p></div>
          <h2 id="now-film-title">《奥德赛》</h2>
          <h3>The Odyssey</h3>
          <dl>
            <div><dt>导演</dt><dd>克里斯托弗·诺兰</dd></div>
            <div><dt>年份</dt><dd>2026</dd></div>
            <div><dt>主角</dt><dd>马特·达蒙 饰 奥德修斯</dd></div>
          </dl>
          <p>从特洛伊战争之后出发，讲述奥德修斯穿越海洋、神话与漫长试炼的归乡旅程。古老史诗被重新放进 IMAX 影像，也让“回家”成为一次关于时间与人的追问。</p>
        </div>
        <div className="now-feature-art poster"><img src="/now/the-odyssey.jpg" alt="克里斯托弗·诺兰电影《奥德赛》官方海报" /></div>
      </section>

      <section className="now-thoughts" aria-label="正在研究与下一站">
        <article className="now-thought-card ontology">
          <div><span>04</span><p>RESEARCHING</p></div>
          <small>正在研究</small>
          <h2>本体论</h2>
          <p>从“什么存在”开始，继续追问事物如何被命名、分类，并通过关系连接起来。最近更关心的，是它如何从哲学问题进入知识组织与人工智能。</p>
          <ul><li>实体</li><li>概念</li><li>关系</li><li>知识结构</li></ul>
        </article>
        <article className="now-thought-card destination">
          <div><span>05</span><p>NEXT STOP</p></div>
          <small>下一站</small>
          <h2>新加坡<br />+ 印度尼西亚</h2>
          <p>先抵达一座紧凑、秩序清晰的城市，再把方向交给群岛、海风与更松弛的时间。路线还没有完全确定，期待本身已经是旅程的一部分。</p>
          <div className="now-destination-line"><span>SINGAPORE</span><i /><span>INDONESIA</span></div>
        </article>
      </section>

      <div className="now-archive-footer">
        <p>这一期的此刻，到这里。</p>
        <div><span>LAST UPDATED</span><i /><time dateTime="2026-09-22">2026.09.22</time></div>
      </div>
    </article>
  );
}
