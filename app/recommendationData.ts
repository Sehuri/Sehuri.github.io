export type RecommendationItem = {
  title: string;
  meta: string;
  description: string;
  href: string;
};

const travelHref = "https://sehuri.github.io/travel-map/#memories";
const readingHref = "https://yueji-reading-room.shenhuil.chatgpt.site#shelf";
const knowledgeHref = "https://sehuri.github.io/Sehuri-knowledge-wiki/";

export const travelRecommendations: RecommendationItem[] = [
  { title: "绍兴", meta: "2026.06 · 中国", description: "在乌篷船与青石板路之间，感受古越水乡。", href: travelHref },
  { title: "京都", meta: "2026.02 · 日本", description: "穿过千本鸟居与岚山竹林，在千年古都放慢脚步。", href: travelHref },
  { title: "哈尔滨", meta: "2025.01 · 中国", description: "在中央大街与冰雪世界之间，遇见寒冬里的璀璨。", href: travelHref },
  { title: "厦门", meta: "2025.07 · 中国", description: "沿鼓浪屿和环岛路散步，让海风成为旅程的旁白。", href: travelHref },
  { title: "西安", meta: "2025.09 · 中国", description: "从古城墙到大雁塔，走进仍然鲜活的十三朝古都。", href: travelHref },
  { title: "黄山", meta: "2024.10 · 中国", description: "在云海、奇松和徽州秋色之间，收藏一次登高远望。", href: travelHref },
  { title: "三亚", meta: "2025.03 · 中国", description: "把假日交给碧海银沙，在南方海岸慢下来。", href: travelHref },
  { title: "北京", meta: "2024.07 · 中国", description: "沿红墙、长城与中轴线，走进一段辽阔的历史。", href: travelHref },
];

export const bookRecommendations: RecommendationItem[] = [
  { title: "《潮骚》", meta: "三岛由纪夫", description: "在海岛、青春与纯粹爱情之间，听一阵明亮的海风。", href: readingHref },
  { title: "《金阁寺》", meta: "三岛由纪夫", description: "从美的执念出发，走进欲望与毁灭彼此纠缠的内心世界。", href: readingHref },
  { title: "《仲夏之死》", meta: "三岛由纪夫", description: "在克制的文字里，凝视命运忽然改变方向的时刻。", href: readingHref },
  { title: "《撒旦探戈》", meta: "克拉斯诺霍尔卡伊·拉斯洛", description: "在漫长句子与荒凉村庄中，感受时间缓慢下沉。", href: readingHref },
  { title: "《细雪》", meta: "谷崎润一郎", description: "从四姐妹的日常与季节流转里，阅读一个家族的余晖。", href: readingHref },
  { title: "《老妓抄》", meta: "冈本加乃子", description: "在衰老、欲望与生命力之间，看见一位女性不肯熄灭的光。", href: readingHref },
  { title: "《鲁迅全集》", meta: "鲁迅", description: "从小说、杂文与书信里，重新触碰锋利而清醒的中文。", href: readingHref },
  { title: "《包法利夫人》", meta: "福楼拜", description: "在幻想与现实的落差中，观察欲望如何塑造一生。", href: readingHref },
  { title: "《阿莱夫》", meta: "博尔赫斯", description: "从一个微小的点，望见时间、迷宫与整个宇宙。", href: readingHref },
  { title: "《智血》", meta: "弗兰纳里·奥康纳", description: "在荒诞、信仰与南方哥特的阴影里，阅读一场精神逃亡。", href: readingHref },
];

export const knowledgeRecommendations: RecommendationItem[] = [
  { title: "Kimi K3", meta: "开放模型", description: "从模型权重到技术报告，理解开放智能的新一步。", href: knowledgeHref },
  { title: "长上下文", meta: "AI 概念", description: "看看模型如何在更长的信息跨度中保持理解与关联。", href: knowledgeHref },
  { title: "MoE", meta: "模型架构", description: "从专家混合机制出发，理解能力与计算效率如何平衡。", href: knowledgeHref },
  { title: "RAG", meta: "知识工程", description: "了解检索与生成如何连接，让回答拥有可追溯的知识来源。", href: knowledgeHref },
  { title: "MVP", meta: "产品管理", description: "用最小可行产品验证价值，再决定下一步如何生长。", href: knowledgeHref },
  { title: "产品发现", meta: "产品管理", description: "在开始构建之前，先确认真正值得解决的问题。", href: knowledgeHref },
  { title: "知识治理", meta: "知识工程", description: "从结构、质量与更新机制，理解知识如何长期保持可用。", href: knowledgeHref },
  { title: "能力边界", meta: "AI 采用", description: "分清模型能做什么、不能做什么，才能设计可靠的应用。", href: knowledgeHref },
  { title: "原生多模态", meta: "AI 模型", description: "观察文字、图像与声音如何在同一模型中共同被理解。", href: knowledgeHref },
  { title: "环洱海骑行", meta: "旅行知识", description: "从路线与节奏出发，重新规划一次沿湖而行。", href: knowledgeHref },
  { title: "验收指标", meta: "AI 项目交付", description: "把模糊期待转成可以共同确认的交付标准。", href: knowledgeHref },
];
