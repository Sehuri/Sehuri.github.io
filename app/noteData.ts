export type GardenNote = {
  slug: string;
  date: string;
  category: "日常片段" | "阅读随想" | "听歌时刻" | "旅行手记" | "银幕之后";
  title: string;
  excerpt: string;
  paragraphs: readonly string[];
  related?: { label: string; href: string };
};

export const gardenNotes: readonly GardenNote[] = [
  {
    slug: "why-keep-a-garden",
    date: "2026.08.14",
    category: "日常片段",
    title: "为什么要留一座庭院",
    excerpt: "收藏不是为了把世界装满，而是为了知道，哪些东西曾经真正抵达过自己。",
    paragraphs: [
      "旅行地图、读过的书、反复听的唱片和舍不得忘记的电影，最初只是散落在不同地方的记录。把它们放进同一座庭院之后，我才慢慢看见它们之间原来一直有路。",
      "这里不追求每天更新，也不需要像一份完成度很高的简历。只要偶尔回来种下一点东西，它就会替我保存那些正在发生的变化。",
    ],
  },
  {
    slug: "between-two-moons",
    date: "2026.08.10",
    category: "阅读随想",
    title: "两个月亮之间",
    excerpt: "一个月亮提醒我看清现实，另一个月亮提醒我，不要因此失去内心的世界。",
    paragraphs: [
      "我喜欢《世界尽头与冷酷仙境》，因为它没有要求人在现实和理想之间选出唯一答案。两个世界同时存在，彼此遥远，却又属于同一个人。",
      "也许成熟不是只留下冷静的一面，而是在理解复杂之后，仍然知道自己想保护什么。",
    ],
    related: { label: "走进村上书房", href: "#murakami" },
  },
  {
    slug: "after-a-song-ends",
    date: "2026.08.06",
    category: "听歌时刻",
    title: "在一首歌结束以后",
    excerpt: "真正留下来的歌，往往不是第一次听就最响亮的那一首。",
    paragraphs: [
      "有些旋律会在很久以后突然回来。可能是在走路，也可能是在一个普通的傍晚，它重新出现时，连同当时的天气和心情一起被带回。",
      "所以唱片室收藏的不只是专辑，也是一段段可以重新抵达的时间。",
    ],
    related: { label: "翻看唱片室", href: "#records" },
  },
  {
    slug: "first-light",
    date: "2026.07.29",
    category: "日常片段",
    title: "网站亮灯的第一天",
    excerpt: "从一个入口开始，让旅行、阅读、知识和音乐在同一片夜色里相遇。",
    paragraphs: [
      "主页第一次真正亮起来的时候，它还没有现在这么多房间。但两个月亮已经在那里，像是提前替后来的一切留下了位置。",
      "以后它还会继续改变。重要的并不是一次做完，而是每一次打开时，都比上一次更像自己的世界。",
    ],
    related: { label: "回到庭院入口", href: "#top" },
  },
];
