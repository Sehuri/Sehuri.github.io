export type Film = {
  slug: string;
  title: string;
  originalTitle: string;
  year: string;
  sortYear: number;
  director: string;
  country: string;
  genres: string[];
  poster: string;
  summary: string;
  note: string;
  chapters?: { year: string; title: string }[];
};

const poster = (slug: string) => `/movie-posters/${slug}.jpg`;

export const films: Film[] = [
  { slug: "gone-with-the-wind", title: "乱世佳人", originalTitle: "Gone with the Wind", year: "1939", sortYear: 1939, director: "维克多·弗莱明", country: "美国", genres: ["爱情", "史诗"], poster: poster("gone-with-the-wind"), summary: "美国南北战争前后，斯嘉丽在家园、爱情与时代巨变之间一次次失去，又一次次重新站起。", note: "宏大历史最终落在一个人不肯被命运击倒的生命力上。" },
  { slug: "2001-a-space-odyssey", title: "2001太空漫游", originalTitle: "2001: A Space Odyssey", year: "1968", sortYear: 1968, director: "斯坦利·库布里克", country: "英国 / 美国", genres: ["科幻", "哲思"], poster: poster("2001-a-space-odyssey"), summary: "一块神秘黑石贯穿人类文明的黎明与宇宙远航，人工智能 HAL 则让探索变成关于意识与进化的追问。", note: "它不是解释宇宙，而是让人真正感到宇宙的寂静与尺度。" },
  { slug: "the-godfather", title: "教父", originalTitle: "The Godfather", year: "1972", sortYear: 1972, director: "弗朗西斯·福特·科波拉", country: "美国", genres: ["犯罪", "家族"], poster: poster("the-godfather"), summary: "柯里昂家族的权力交接，让原本远离家族生意的迈克尔一步步走进父亲留下的黑暗世界。", note: "权力、家庭与命运在同一张餐桌上缓慢收紧。" },
  { slug: "the-godfather-part-ii", title: "教父2", originalTitle: "The Godfather Part II", year: "1974", sortYear: 1974, director: "弗朗西斯·福特·科波拉", country: "美国", genres: ["犯罪", "家族"], poster: poster("the-godfather-part-ii"), summary: "维托白手起家的往昔与迈克尔巩固帝国的现在平行展开，一个家族的兴起映照另一个灵魂的坍塌。", note: "越接近权力中心，迈克尔离家人反而越远。" },
  { slug: "rain-man", title: "雨人", originalTitle: "Rain Man", year: "1988", sortYear: 1988, director: "巴瑞·莱文森", country: "美国", genres: ["剧情", "公路"], poster: poster("rain-man"), summary: "自私的查理因遗产结识患有自闭症的哥哥雷蒙，一段横穿美国的旅程重新定义了亲情。", note: "有些关系不是突然理解，而是在一段路上慢慢学会陪伴。" },
  { slug: "the-godfather-part-iii", title: "教父3", originalTitle: "The Godfather Part III", year: "1990", sortYear: 1990, director: "弗朗西斯·福特·科波拉", country: "美国", genres: ["犯罪", "家族"], poster: poster("the-godfather-part-iii"), summary: "年迈的迈克尔试图让家族事业合法化，却发现旧日的罪与权力从不轻易放人离开。", note: "迟来的悔意无法抹去代价，却让整个家族悲剧完成闭环。" },
  { slug: "the-silence-of-the-lambs", title: "沉默的羔羊", originalTitle: "The Silence of the Lambs", year: "1991", sortYear: 1991, director: "乔纳森·戴米", country: "美国", genres: ["惊悚", "犯罪"], poster: poster("the-silence-of-the-lambs"), summary: "年轻探员克拉丽斯为追捕连环杀手，不得不向被囚禁的精神科医生汉尼拔寻求危险的心理指引。", note: "真正令人不安的不是怪物出现，而是他似乎看穿了你。" },
  { slug: "thelma-and-louise", title: "末路狂花", originalTitle: "Thelma & Louise", year: "1991", sortYear: 1991, director: "雷德利·斯科特", country: "美国", genres: ["公路", "女性"], poster: poster("thelma-and-louise"), summary: "塞尔玛与路易丝的一次周末出逃急转直下，最终成为逃离规训与暴力的公路决绝。", note: "自由有时短得像一次腾空，却足以照亮此前的人生。" },
  { slug: "scent-of-a-woman", title: "闻香识女人", originalTitle: "Scent of a Woman", year: "1992", sortYear: 1992, director: "马丁·布莱斯特", country: "美国", genres: ["剧情", "成长"], poster: poster("scent-of-a-woman"), summary: "贫困学生查理陪伴失明退伍军官弗兰克度过一个周末，两人在彼此最低落的时候互相拉住。", note: "探戈、尊严与一次为正确之事挺身而出的勇气。" },
  { slug: "leon-the-professional", title: "这个杀手不太冷", originalTitle: "Léon: The Professional", year: "1994", sortYear: 1994, director: "吕克·贝松", country: "法国 / 美国", genres: ["犯罪", "剧情"], poster: poster("leon-the-professional"), summary: "职业杀手莱昂收留失去家人的少女玛蒂尔达，两个孤独的人在危险中建立起不寻常的依靠。", note: "冰冷职业之外，是两个无处可去的人短暂拥有了家。" },
  { slug: "se7en", title: "七宗罪", originalTitle: "Se7en", year: "1995", sortYear: 1995, director: "大卫·芬奇", country: "美国", genres: ["犯罪", "悬疑"], poster: poster("se7en"), summary: "两位性格迥异的警探追查以七宗罪为仪式的连环案件，最终被拖入凶手设计好的道德迷宫。", note: "阴雨从城市落进人心，最后一只盒子让绝望彻底闭合。" },
  { slug: "love-letter", title: "情书", originalTitle: "Love Letter", year: "1995", sortYear: 1995, director: "岩井俊二", country: "日本", genres: ["爱情", "青春"], poster: poster("love-letter"), summary: "一封寄往旧地址的信意外得到回音，两位同名女子由此重新拼起一段未被说出的青春记忆。", note: "有些喜欢直到多年以后，才在借书卡背面显影。" },
  { slug: "life-is-beautiful", title: "美丽人生", originalTitle: "La vita è bella", year: "1997", sortYear: 1997, director: "罗伯托·贝尼尼", country: "意大利", genres: ["战争", "亲情"], poster: poster("life-is-beautiful"), summary: "圭多用一场善意的“游戏”保护儿子，让集中营的恐怖暂时隔绝在孩子的世界之外。", note: "最黑暗的处境里，爱仍努力为孩子保存想象与尊严。" },
  { slug: "titanic", title: "泰坦尼克号", originalTitle: "Titanic", year: "1997", sortYear: 1997, director: "詹姆斯·卡梅隆", country: "美国", genres: ["爱情", "灾难"], poster: poster("titanic"), summary: "来自不同阶层的杰克与露丝在泰坦尼克号上相遇，短暂的爱情随巨轮沉没成为一生记忆。", note: "灾难的规模越巨大，那几天自由呼吸的记忆越显得珍贵。" },
  { slug: "the-truman-show", title: "楚门的世界", originalTitle: "The Truman Show", year: "1998", sortYear: 1998, director: "彼得·威尔", country: "美国", genres: ["剧情", "寓言"], poster: poster("the-truman-show"), summary: "楚门从细微裂缝发现自己的生活是一场全球直播，完美世界的边界之外才是真实的未知。", note: "走向那扇门，是把被安排的人生重新交还给自己。" },
  { slug: "harry-potter", title: "哈利·波特全系列", originalTitle: "Harry Potter Film Series", year: "2001—2011", sortYear: 2001, director: "克里斯·哥伦布等", country: "英国 / 美国", genres: ["奇幻", "成长"], poster: poster("harry-potter"), summary: "从九又四分之三站台到霍格沃茨最终决战，八部电影陪伴哈利、罗恩与赫敏穿过友谊、失去与选择。", note: "真正的魔法不只在咒语里，也在漫长成长中仍愿意选择爱与勇气。", chapters: [
    { year: "2001", title: "哈利·波特与魔法石" }, { year: "2002", title: "哈利·波特与密室" },
    { year: "2004", title: "哈利·波特与阿兹卡班的囚徒" }, { year: "2005", title: "哈利·波特与火焰杯" },
    { year: "2007", title: "哈利·波特与凤凰社" }, { year: "2009", title: "哈利·波特与混血王子" },
    { year: "2010", title: "哈利·波特与死亡圣器（上）" }, { year: "2011", title: "哈利·波特与死亡圣器（下）" },
  ] },
  { slug: "spirited-away", title: "千与千寻", originalTitle: "千と千尋の神隠し", year: "2001", sortYear: 2001, director: "宫崎骏", country: "日本", genres: ["动画", "成长"], poster: poster("spirited-away"), summary: "误入神灵世界的千寻必须工作、记住自己的名字，并在陌生规则中找到救回父母与自己的路。", note: "成长不是变得世故，而是在复杂世界里仍记得自己的名字。" },
  { slug: "infernal-affairs", title: "无间道", originalTitle: "Infernal Affairs", year: "2002", sortYear: 2002, director: "刘伟强 / 麦兆辉", country: "中国香港", genres: ["犯罪", "悬疑"], poster: poster("infernal-affairs"), summary: "警方卧底与黑帮内鬼在彼此的阵营里长期潜伏，一场身份追查把两人逼向无法回头的边缘。", note: "最深的无间，是终于分不清面具与自己。" },
  { slug: "the-pianist", title: "钢琴家", originalTitle: "The Pianist", year: "2002", sortYear: 2002, director: "罗曼·波兰斯基", country: "法国 / 波兰", genres: ["战争", "传记"], poster: poster("the-pianist"), summary: "波兰钢琴家斯皮尔曼在华沙犹太区毁灭后独自躲藏，以记忆、偶然与音乐维系生存。", note: "文明崩塌以后，一段钢琴声仍证明人没有完全失去人性。" },
  { slug: "monster", title: "女魔头", originalTitle: "Monster", year: "2003", sortYear: 2003, director: "派蒂·杰金斯", country: "美国", genres: ["传记", "犯罪"], poster: poster("monster"), summary: "影片从艾琳·沃诺斯的边缘人生出发，呈现暴力、贫困与渴望被爱如何把一个人推向深渊。", note: "它拒绝把悲剧简化为一个“怪物”的诞生。" },
  { slug: "memories-of-murder", title: "杀人回忆", originalTitle: "Memories of Murder", year: "2003", sortYear: 2003, director: "奉俊昊", country: "韩国", genres: ["犯罪", "悬疑"], poster: poster("memories-of-murder"), summary: "乡村连续命案让经验粗糙的警察与首尔刑警陷入漫长追查，真相却始终游离在雨夜之外。", note: "未被解答的凝视，比答案更长久地留在观众身上。" },
  { slug: "hotel-rwanda", title: "卢旺达饭店", originalTitle: "Hotel Rwanda", year: "2004", sortYear: 2004, director: "特瑞·乔治", country: "英国 / 南非", genres: ["历史", "战争"], poster: poster("hotel-rwanda"), summary: "卢旺达大屠杀期间，饭店经理保罗利用职业经验与人脉，为上千名避难者争取活下去的空间。", note: "当世界沉默，普通人的坚持也能成为一道边界。" },
  { slug: "the-chorus", title: "放牛班的春天", originalTitle: "Les Choristes", year: "2004", sortYear: 2004, director: "克里斯托夫·巴拉蒂", country: "法国", genres: ["音乐", "成长"], poster: poster("the-chorus"), summary: "失意音乐教师来到严苛寄宿学校，用合唱让被贴上标签的孩子第一次听见自己的声音。", note: "教育最动人的部分，是有人愿意相信你还可以成为别的样子。" },
  { slug: "batman-begins", title: "蝙蝠侠：侠影之谜", originalTitle: "Batman Begins", year: "2005", sortYear: 2005, director: "克里斯托弗·诺兰", country: "美国 / 英国", genres: ["动作", "犯罪"], poster: poster("batman-begins"), summary: "布鲁斯·韦恩穿越恐惧与愤怒，回到哥谭把恐惧塑造成一个足以对抗犯罪的象征。", note: "英雄不是没有恐惧，而是决定如何使用恐惧。" },
  { slug: "brokeback-mountain", title: "断背山", originalTitle: "Brokeback Mountain", year: "2005", sortYear: 2005, director: "李安", country: "美国", genres: ["爱情", "剧情"], poster: poster("brokeback-mountain"), summary: "恩尼斯与杰克在断背山相遇，此后二十年里，感情在家庭、时代与自我压抑之间反复靠近又分离。", note: "一件衬衫收下了那些无法公开、也无法忘记的年月。" },
  { slug: "five-centimeters-per-second", title: "秒速五厘米", originalTitle: "秒速5センチメートル", year: "2007", sortYear: 2007, director: "新海诚", country: "日本", genres: ["动画", "爱情"], poster: poster("five-centimeters-per-second"), summary: "贵树与明里被距离和时间慢慢分开，三段故事记录感情如何在成长中留下难以抵达的余温。", note: "不是所有等待都会重逢，但那段路仍真实改变过一个人。" },
  { slug: "lust-caution", title: "色，戒", originalTitle: "Lust, Caution", year: "2007", sortYear: 2007, director: "李安", country: "中国 / 美国", genres: ["爱情", "谍战"], poster: poster("lust-caution"), summary: "抗战时期，女学生王佳芝以色诱计划接近易先生，身份表演逐渐侵入欲望与真实情感。", note: "戒备与欲望越靠近，选择便越无法被简单定义。" },
  { slug: "the-dark-knight", title: "蝙蝠侠：黑暗骑士", originalTitle: "The Dark Knight", year: "2008", sortYear: 2008, director: "克里斯托弗·诺兰", country: "美国 / 英国", genres: ["犯罪", "动作"], poster: poster("the-dark-knight"), summary: "小丑以混乱挑战哥谭的秩序与人性底线，迫使蝙蝠侠在原则、牺牲与真相之间做出选择。", note: "最危险的对手不是想赢，而是要证明所有信念都可以崩塌。" },
  { slug: "flipped", title: "怦然心动", originalTitle: "Flipped", year: "2010", sortYear: 2010, director: "罗伯·莱纳", country: "美国", genres: ["爱情", "成长"], poster: poster("flipped"), summary: "朱莉与布莱斯从各自视角回望同一段童年关系，在误解与变化中学会看见一个完整的人。", note: "有些人整体大于部分之和，而喜欢也需要真正的理解。" },
  { slug: "inception", title: "盗梦空间", originalTitle: "Inception", year: "2010", sortYear: 2010, director: "克里斯托弗·诺兰", country: "美国 / 英国", genres: ["科幻", "悬疑"], poster: poster("inception"), summary: "盗梦者柯布受命在目标潜意识中植入一个念头，多层梦境则把任务与他的愧疚一起推向失控。", note: "最牢固的迷宫往往不是梦，而是我们不肯放下的记忆。" },
  { slug: "source-code", title: "源代码", originalTitle: "Source Code", year: "2011", sortYear: 2011, director: "邓肯·琼斯", country: "美国 / 加拿大", genres: ["科幻", "悬疑"], poster: poster("source-code"), summary: "军人科尔特不断进入列车爆炸前的八分钟寻找凶手，也开始追问这段被重复的时间能否成为真实人生。", note: "八分钟不只是倒计时，也可能足够一个人重新选择如何活着。" },
  { slug: "the-dark-knight-rises", title: "蝙蝠侠：黑暗骑士崛起", originalTitle: "The Dark Knight Rises", year: "2012", sortYear: 2012, director: "克里斯托弗·诺兰", country: "美国 / 英国", genres: ["动作", "犯罪"], poster: poster("the-dark-knight-rises"), summary: "隐退多年的布鲁斯面对贝恩带来的全面危机，必须从身体与精神的深井里再次爬起。", note: "崛起不是回到从前，而是终于学会把象征交给城市。" },
  { slug: "now-you-see-me", title: "惊天魔盗团", originalTitle: "Now You See Me", year: "2013", sortYear: 2013, director: "路易斯·莱特里尔", country: "美国 / 法国", genres: ["悬疑", "犯罪"], poster: poster("now-you-see-me"), summary: "四位魔术师组成“四骑士”，在大型演出中完成看似不可能的劫案，并与追捕者展开障眼法较量。", note: "越靠近看，越容易错过魔术真正发生的地方。" },
  { slug: "dallas-buyers-club", title: "达拉斯买家俱乐部", originalTitle: "Dallas Buyers Club", year: "2013", sortYear: 2013, director: "让-马克·瓦雷", country: "美国", genres: ["传记", "剧情"], poster: poster("dallas-buyers-club"), summary: "被确诊艾滋病的罗恩从偏见与求生出发，建立药物互助网络，也在过程中重新认识他人和自己。", note: "求生最终变成了对体制、偏见与冷漠的共同抵抗。" },
  { slug: "frozen", title: "冰雪奇缘", originalTitle: "Frozen", year: "2013", sortYear: 2013, director: "克里斯·巴克 / 珍妮弗·李", country: "美国", genres: ["动画", "奇幻"], poster: poster("frozen"), summary: "艾莎因失控的冰雪魔法封闭自己，安娜则踏上寻找姐姐、让王国重回夏天的旅程。", note: "真正解除冰封的爱，不只来自浪漫，也来自姐妹与自我接纳。" },
  { slug: "interstellar", title: "星际穿越", originalTitle: "Interstellar", year: "2014", sortYear: 2014, director: "克里斯托弗·诺兰", country: "美国 / 英国", genres: ["科幻", "亲情"], poster: poster("interstellar"), summary: "地球濒临失去生存条件，库珀穿越虫洞寻找新家园，时间则把父女之间的承诺拉成长达数十年的距离。", note: "宇宙可以弯曲时间，而爱让人仍能辨认回家的方向。" },
  { slug: "heidi", title: "海蒂和爷爷", originalTitle: "Heidi", year: "2015", sortYear: 2015, director: "阿兰·葛斯彭纳", country: "德国 / 瑞士", genres: ["家庭", "成长"], poster: poster("heidi"), summary: "孤儿海蒂来到阿尔卑斯山与沉默寡言的爷爷生活，她的真诚也慢慢改变身边每个人。", note: "山风、友谊与一个孩子不加修饰的善意。" },
  { slug: "zootopia", title: "疯狂动物城", originalTitle: "Zootopia", year: "2016", sortYear: 2016, director: "拜伦·霍华德 / 瑞奇·摩尔", country: "美国", genres: ["动画", "喜剧"], poster: poster("zootopia"), summary: "兔子警官朱迪与狐狸尼克联手调查失踪案，理想都市背后的偏见与恐惧也随之浮现。", note: "改变世界之前，先承认偏见也可能藏在自己心里。" },
  { slug: "train-to-busan", title: "釜山行", originalTitle: "Train to Busan", year: "2016", sortYear: 2016, director: "延尚昊", country: "韩国", genres: ["灾难", "惊悚"], poster: poster("train-to-busan"), summary: "病毒爆发时，一列开往釜山的列车成为封闭求生场，人们的恐惧、自私与牺牲被同时放大。", note: "比感染更快蔓延的，既可能是恐惧，也可能是保护他人的勇气。" },
  { slug: "your-name", title: "你的名字。", originalTitle: "君の名は。", year: "2016", sortYear: 2016, director: "新海诚", country: "日本", genres: ["动画", "爱情"], poster: poster("your-name"), summary: "东京少年与小镇少女在梦中交换身体，跨越时间与灾难寻找那个正在从记忆里消失的名字。", note: "即使忘记名字，也仍记得自己一直在寻找某个人。" },
  { slug: "manchester-by-the-sea", title: "海边的曼彻斯特", originalTitle: "Manchester by the Sea", year: "2016", sortYear: 2016, director: "肯尼思·洛纳根", country: "美国", genres: ["剧情", "家庭"], poster: poster("manchester-by-the-sea"), summary: "哥哥去世后，李回到故乡照顾侄子，也不得不再次面对一段令他无法原谅自己的过去。", note: "有些伤不会被治愈，生活只是教人如何带着它继续。" },
  { slug: "dunkirk", title: "敦刻尔克", originalTitle: "Dunkirk", year: "2017", sortYear: 2017, director: "克里斯托弗·诺兰", country: "英国 / 美国", genres: ["战争", "历史"], poster: poster("dunkirk"), summary: "陆地一周、海上一天、空中一小时三条时间线交织，呈现敦刻尔克撤退中普通人的求生与救援。", note: "没有传统英雄宣言，只有在倒计时里把陌生人带回家的选择。" },
  { slug: "coco", title: "寻梦环游记", originalTitle: "Coco", year: "2017", sortYear: 2017, director: "李·昂克里奇 / 阿德里安·莫利纳", country: "美国", genres: ["动画", "家庭"], poster: poster("coco"), summary: "热爱音乐的米格误入亡灵世界，在追寻偶像的途中发现家族记忆真正被隐藏的部分。", note: "死亡不是终点，被所爱的人遗忘才是；记住就是让爱继续存在。" },
  { slug: "darkest-hour", title: "至暗时刻", originalTitle: "Darkest Hour", year: "2017", sortYear: 2017, director: "乔·赖特", country: "英国", genres: ["历史", "传记"], poster: poster("darkest-hour"), summary: "二战初期，刚上任的丘吉尔在和谈与抵抗之间承受巨大压力，必须为英国选择方向。", note: "历史的转折有时发生在一个人终于决定不再后退的时刻。" },
  { slug: "bohemian-rhapsody", title: "波西米亚狂想曲", originalTitle: "Bohemian Rhapsody", year: "2018", sortYear: 2018, director: "布莱恩·辛格", country: "英国 / 美国", genres: ["音乐", "传记"], poster: poster("bohemian-rhapsody"), summary: "影片沿皇后乐队与弗雷迪·默丘里的崛起、分裂和重聚，最终抵达 Live Aid 舞台。", note: "当万人合唱响起，一个人的孤独也短暂获得了巨大回声。" },
  { slug: "weathering-with-you", title: "天气之子", originalTitle: "天気の子", year: "2019", sortYear: 2019, director: "新海诚", country: "日本", genres: ["动画", "爱情"], poster: poster("weathering-with-you"), summary: "离家少年帆高在连绵雨季遇见能让天空放晴的阳菜，而每一次晴天都伴随着代价。", note: "如果世界要求牺牲一个人来恢复正常，少年选择了那个具体的人。" },
  { slug: "joker", title: "小丑", originalTitle: "Joker", year: "2019", sortYear: 2019, director: "托德·菲利普斯", country: "美国", genres: ["犯罪", "剧情"], poster: poster("joker"), summary: "被疾病、贫困与冷漠反复挤压的亚瑟逐渐抛下旧身份，成为哥谭失序情绪的象征。", note: "它把超级反派神话拉回一座拒绝倾听的城市。" },
  { slug: "suzume", title: "铃芽之旅", originalTitle: "すずめの戸締まり", year: "2022", sortYear: 2022, director: "新海诚", country: "日本", genres: ["动画", "奇幻"], poster: poster("suzume"), summary: "少女铃芽踏上关闭灾祸之门的旅程，在日本各处的废墟中与过去的伤痕重新相遇。", note: "关上一扇门，也是在对曾经生活于此的人认真道别。" },
  { slug: "oppenheimer", title: "奥本海默", originalTitle: "Oppenheimer", year: "2023", sortYear: 2023, director: "克里斯托弗·诺兰", country: "美国 / 英国", genres: ["传记", "历史"], poster: poster("oppenheimer"), summary: "理论物理学家奥本海默领导曼哈顿计划，原子弹诞生的荣光、恐惧与政治清算此后缠绕一生。", note: "一个人完成改变世界的工程，也从此无法离开它投下的阴影。" },
  { slug: "the-odyssey", title: "奥德赛", originalTitle: "The Odyssey", year: "2026", sortYear: 2026, director: "克里斯托弗·诺兰", country: "美国 / 英国", genres: ["史诗", "冒险"], poster: poster("the-odyssey"), summary: "影片改编自荷马史诗，跟随奥德修斯在特洛伊战争之后穿越神话、海洋与漫长考验，寻找回到故乡的路。", note: "在最辽阔的神话尺度里，核心仍是一个人如何回家。" },
].sort((a, b) => a.sortYear - b.sortYear || a.title.localeCompare(b.title, "zh-CN"));

export const filmCount = films.length;
