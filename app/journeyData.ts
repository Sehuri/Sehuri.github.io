import { searchTargetId } from "./deepLinks";

export type JourneyTone = "moon" | "departure" | "sea" | "boundary";

export type JourneyStop = {
  type: string;
  title: string;
  meta: string;
  note: string;
  href: string;
};

export type ThemeJourney = {
  slug: string;
  index: string;
  title: string;
  english: string;
  duration: string;
  tone: JourneyTone;
  introduction: string;
  closing: string;
  stops: readonly JourneyStop[];
};

const local = (prefix: string, value: string) => `#${searchTargetId(prefix, value)}`;

export const themeJourneys: readonly ThemeJourney[] = [
  {
    slug: "between-two-moons",
    index: "01",
    title: "两个月亮之间",
    english: "BETWEEN TWO MOONS",
    duration: "6 站 · 约 25 分钟",
    tone: "moon",
    introduction: "从村上笔下的双重世界出发，穿过一张双面歌单、一篇私人手记和两个关于真实的银幕寓言。这条路线想问：看清现实之后，我们还愿意保护什么？",
    closing: "两个世界不必只留下一个。成熟也许是在知道现实如何运转后，仍为心里的那轮月亮留一处位置。",
    stops: [
      { type: "村上书房", title: "《世界尽头与冷酷仙境》", meta: "双线世界 · 意识与选择", note: "先进入两个并行的世界，让现实与内心开始互相照见。", href: local("murakami", "世界尽头与冷酷仙境") },
      { type: "唱片室", title: "1Q84 OST", meta: "冷酷仙境 / 世界尽头", note: "十六首歌分居两面，用声音回答同一个问题。", href: local("album", "原声音乐-1Q84 OST") },
      { type: "庭院手记", title: "两个月亮之间", meta: "阅读随想 · 2026.08.10", note: "从作品回到自己：一轮提醒我看清现实，另一轮提醒我不要失去内心的世界。", href: local("note", "between-two-moons") },
      { type: "光影馆", title: "《楚门的世界》", meta: "彼得·威尔 · 1998", note: "当完美世界裂开缝隙，走向那扇门就是将人生重新交还给自己。", href: local("film", "the-truman-show") },
      { type: "光影馆", title: "《盗梦空间》", meta: "克里斯托弗·诺兰 · 2010", note: "梦境的层层下潜，让“什么是真实”变成一个无法轻易回答的问题。", href: local("film", "inception") },
      { type: "庭院手记", title: "为什么要留一座庭院", meta: "日常片段 · 2026.08.14", note: "最后回到这座网站：为什么值得为真正抵达过自己的东西留下位置。", href: local("note", "why-keep-a-garden") },
    ],
  },
  {
    slug: "about-leaving",
    index: "02",
    title: "关于出走",
    english: "ON LEAVING",
    duration: "6 站 · 约 20 分钟",
    tone: "departure",
    introduction: "出走有时是一次旅行，有时是从别人替你写好的生活里离开。这条路线从地图出发，经过公路、唱片和世界尽头，再问一次我们为什么要走远。",
    closing: "出走不一定为了抛下什么。它也可以是给生活腾出一点距离，好重新辨认自己想去的方向。",
    stops: [
      { type: "旅行地图", title: "从一座走过的城市出发", meta: "52 座城市 · 旅行时间线", note: "先打开地图，看看一段距离如何在回忆中变成坐标。", href: "https://sehuri.github.io/travel-map/#memories" },
      { type: "光影馆", title: "《末路狂花》", meta: "雷德利·斯科特 · 1991", note: "一次周末出行变成决绝的公路逃离，自由短得像一次腾空。", href: local("film", "thelma-and-louise") },
      { type: "唱片室", title: "《一百种生活》", meta: "卢广仲 · 2009", note: "离开唯一的答案，世界才会显露出更多种可以生活的样子。", href: local("album", "卢广仲-一百种生活") },
      { type: "庭院手记", title: "想去乌斯怀亚的今天", meta: "旅行手记 · 2026.08.16", note: "有些远方先作为一个念头存在，然后在某一天慢慢变成真实路线。", href: local("note", "want-to-go-to-ushuaia-today") },
      { type: "光影馆", title: "《雨人》", meta: "巴瑞·莱文森 · 1988", note: "有些关系不是突然被理解，而是在一段路上慢慢学会陪伴。", href: local("film", "rain-man") },
      { type: "庭院手记", title: "地理在脚下", meta: "旅行手记 · 2026.09.20", note: "回到出发的原因：亲眼看看那些曾经只存在于文字与图片里的地方。", href: local("note", "geography-underfoot") },
    ],
  },
  {
    slug: "sea-and-solitude",
    index: "03",
    title: "海边与孤独",
    english: "SEA AND SOLITUDE",
    duration: "6 站 · 约 22 分钟",
    tone: "sea",
    introduction: "海边的孤独不总是低沉的。它可以是海岛上的爱情、漂浮在不同轨道上的人，也可以是一首歌结束后突然回来的记忆。",
    closing: "海把距离变得具体，也让呼唤有了方向。珍贵的不是消灭孤独，而是仍然愿意向另一条轨道发出信号。",
    stops: [
      { type: "旅行地图", title: "厦门：让海风成为旅程的旁白", meta: "2025.07 · 中国", note: "从鼓浪屿与环岛路出发，先给这条路线一点真实的海风。", href: "https://sehuri.github.io/travel-map/#memories" },
      { type: "阅览室", title: "《潮骚》", meta: "三岛由纪夫", note: "在海岛、青春与纯粹爱情之间，听一阵明亮的海风。", href: "https://yueji-reading-room.shenhuil.chatgpt.site#shelf" },
      { type: "村上书房", title: "《斯普特尼克恋人》", meta: "爱 · 孤独 · 平行世界", note: "人与人可能离得很近，却仍像卫星一样运行在不同轨道。", href: local("murakami", "斯普特尼克恋人") },
      { type: "唱片室", title: "《唱游》", meta: "王菲 · 1998", note: "声音在城市和远方之间漂浮，像一次轻盈却私密的出走。", href: local("album", "王菲-唱游") },
      { type: "庭院手记", title: "在一首歌结束以后", meta: "听歌时刻 · 2026.08.06", note: "真正留下来的歌，会连同当时的天气和心情一起回来。", href: local("note", "after-a-song-ends") },
      { type: "光影馆", title: "《情书》", meta: "岩井俊二 · 1995", note: "有些喜欢直到多年以后，才在借书卡背面显影。", href: local("film", "love-letter") },
    ],
  },
  {
    slug: "human-boundary-of-technology",
    index: "04",
    title: "技术与人的边界",
    english: "TECHNOLOGY, THEN HUMAN",
    duration: "6 站 · 约 28 分钟",
    tone: "boundary",
    introduction: "从 AI 的能力边界到本体与知识工程，再走进 HAL、原子弹和一次关于选择的思考。这条路线不为技术给出简单判决，只把“人要如何使用力量”留在中心。",
    closing: "技术会放大能力，却不会替人决定什么值得。最后需要被校准的，仍然是目标、代价与选择本身。",
    stops: [
      { type: "知识花园", title: "能力边界", meta: "AI 采用 · 知识条目", note: "先分清模型能做什么、不能做什么，才能谈可靠的应用。", href: "https://sehuri.github.io/Sehuri-knowledge-wiki/" },
      { type: "庭院手记", title: "初识本体", meta: "阅读随想 · 2026.08.27", note: "当信息开始被组织成概念、关系和规则，知识也有了可以被机器理解的骨架。", href: local("note", "first-look-at-ontology") },
      { type: "阅览室", title: "《阿莱夫》", meta: "博尔赫斯", note: "从一个微小的点望见时间、迷宫与整个宇宙，也为信息的无限打开文学入口。", href: "https://yueji-reading-room.shenhuil.chatgpt.site#shelf" },
      { type: "光影馆", title: "《2001太空漫游》", meta: "斯坦利·库布里克 · 1968", note: "HAL 让进化与意识的问题突然具有了声音、专业能力和危险的决定权。", href: local("film", "2001-a-space-odyssey") },
      { type: "光影馆", title: "《奥本海默》", meta: "克里斯托弗·诺兰 · 2023", note: "一个人完成了改变世界的工程，也从此无法离开它投下的阴影。", href: local("film", "oppenheimer") },
      { type: "庭院手记", title: "结果不能替选择作证", meta: "日常片段 · 2026.08.21", note: "好结果不会自动让当初的选择变对，判断仍要回到当时的信息、责任和代价。", href: local("note", "results-cannot-judge-a-choice") },
    ],
  },
] as const;
