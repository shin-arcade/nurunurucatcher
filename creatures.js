/**
 * ぬるぬる図鑑 - 全30個体マスターデータ
 * 全10種類（オクラ / かえる / かたつむり / 眼球 / せっけん / たこ / たまご / スライム / うなぎ / 人間）
 */
const TOTAL_CATEGORIES_COUNT = 10;

const CREATURES_DATA = [
  // --- オクラ系 ---
  {
    id: "NUL1",
    name: "オクラくん",
    category: "オクラ",
    image: "images/okura.png",
    slimyLevel: "F",
    size: "8cm",
    personality: "優しくてヘルシー。"
  },
  {
    id: "NUL2",
    name: "オクラJr",
    category: "オクラ",
    image: "images/okura.png",
    slimyLevel: "F",
    size: "3cm",
    personality: "ばぶばぶでぴよぴよ。"
  },
  {
    id: "NUL3",
    name: "オクラさん",
    category: "オクラ",
    image: "images/okura.png",
    slimyLevel: "F",
    size: "9cm",
    personality: "テキパキのはきはき。"
  },

  // --- かえる系 ---
  {
    id: "NUL4",
    name: "かえるっぴ",
    category: "かえる",
    image: "images/kaeru.png",
    slimyLevel: "F",
    size: "3cm",
    personality: "てれてれで恥ずかしがり屋。"
  },
  {
    id: "NUL5",
    name: "かえるぽよ",
    category: "かえる",
    image: "images/kaeru.png",
    slimyLevel: "F",
    size: "4cm",
    personality: "にこにこでほのぼの。"
  },
  {
    id: "NUL6",
    name: "かえるっち",
    category: "かえる",
    image: "images/kaeru.png",
    slimyLevel: "F",
    size: "1cm",
    personality: "ゆっくりですべすべ。"
  },

  // --- かたつむり系 ---
  {
    id: "NUL7",
    name: "かたつむり様",
    category: "かたつむり",
    image: "images/katatumuri.png",
    slimyLevel: "E",
    size: "3cm",
    personality: "ぐるぐるでぬめぬめ。"
  },
  {
    id: "NUL8",
    name: "かたつむりーぬ",
    category: "かたつむり",
    image: "images/katatumuri.png",
    slimyLevel: "E",
    size: "6cm",
    personality: "のろのろでとろとろ。"
  },
  {
    id: "NUL9",
    name: "かたつむりん",
    category: "かたつむり",
    image: "images/katatumuri.png",
    slimyLevel: "E",
    size: "3cm",
    personality: "マイマイでワクワク。"
  },

  // --- 眼球系 ---
  {
    id: "NUL10",
    name: "眼球さん",
    category: "眼球",
    image: "images/me.png",
    slimyLevel: "D",
    size: "3cm",
    personality: "きらきらでぴかぴか。"
  },
  {
    id: "NUL11",
    name: "眼球マン",
    category: "眼球",
    image: "images/me.png",
    slimyLevel: "D",
    size: "3.5cm",
    personality: "ギラギラでテカテカ。"
  },
  {
    id: "NUL12",
    name: "眼球やん",
    category: "眼球",
    image: "images/me.png",
    slimyLevel: "D",
    size: "2cm",
    personality: "ちらちらでジトジト。"
  },

  // --- せっけん系 ---
  {
    id: "NUL13",
    name: "せっけん太郎",
    category: "せっけん",
    image: "images/sekken.png",
    slimyLevel: "D",
    size: "12.5cm",
    personality: "元気であわあわ。"
  },
  {
    id: "NUL14",
    name: "せっけん次郎",
    category: "せっけん",
    image: "images/sekken.png",
    slimyLevel: "D",
    size: "9cm",
    personality: "活発でごしごし。"
  },
  {
    id: "NUL15",
    name: "せっけん子",
    category: "せっけん",
    image: "images/sekken.png",
    slimyLevel: "C",
    size: "11cm",
    personality: "優しくてふわふわ。"
  },

  // --- たこ系 ---
  {
    id: "NUL16",
    name: "たこちゅー",
    category: "たこ",
    image: "images/tako.png",
    slimyLevel: "C",
    size: "18cm",
    personality: "ちゅるちゅるでわさわさ。"
  },
  {
    id: "NUL17",
    name: "たこあし",
    category: "たこ",
    image: "images/tako.png",
    slimyLevel: "C",
    size: "20cm",
    personality: "ダッシュでしゅばしゅば。"
  },
  {
    id: "NUL18",
    name: "たこわさ",
    category: "たこ",
    image: "images/tako.png",
    slimyLevel: "C",
    size: "10cm",
    personality: "子だこトコトコ。"
  },

  // --- たまご系 ---
  {
    id: "NUL19",
    name: "たまちゃん",
    category: "たまご",
    image: "images/tamago.png",
    slimyLevel: "B",
    size: "10cm",
    personality: "するするでふわとろ。"
  },
  {
    id: "NUL20",
    name: "たまご",
    category: "たまご",
    image: "images/tamago.png",
    slimyLevel: "B",
    size: "11cm",
    personality: "べとべとでちゅるちゅる。"
  },
  {
    id: "NUL21",
    name: "おんたま",
    category: "たまご",
    image: "images/tamago.png",
    slimyLevel: "B",
    size: "13cm",
    personality: "うまうまでにこにこ。"
  },

  // --- スライム系 ---
  {
    id: "NUL22",
    name: "スライム",
    category: "スライム",
    image: "images/suraimu.png",
    slimyLevel: "B",
    size: "15cm",
    personality: "べちゃべちゃでまっさお。"
  },
  {
    id: "NUL23",
    name: "すら助",
    category: "スライム",
    image: "images/suraimu.png",
    slimyLevel: "B",
    size: "15cm",
    personality: "どぅるどぅるでぷるぷる。"
  },
  {
    id: "NUL24",
    name: "スライム",
    category: "スライム",
    image: "images/suraimu.png",
    slimyLevel: "B",
    size: "18cm",
    personality: "ぷるぷるできゅるきゅる。"
  },

  // --- うなぎ系 ---
  {
    id: "NUL25",
    name: "うなぎ",
    category: "うなぎ",
    image: "images/unagi.png",
    slimyLevel: "A",
    size: "50cm",
    personality: "ぴちぴちでばたばた。"
  },
  {
    id: "NUL26",
    name: "うなじゅう",
    category: "うなぎ",
    image: "images/unagi.png",
    slimyLevel: "A",
    size: "41cm",
    personality: "ふわふわでうまうま。"
  },
  {
    id: "NUL27",
    name: "うなどん",
    category: "うなぎ",
    image: "images/unagi.png",
    slimyLevel: "A",
    size: "50cm",
    personality: "つるつるでするする。"
  },

  // --- 人間系 ---
  {
    id: "NUL28",
    name: "人間くん",
    category: "人間",
    image: "images/ningen.png",
    slimyLevel: "S",
    size: "170.2cm",
    personality: "社交的で行動力があります。たまに空気が読めない発言をしてしまうことを気にしています。わざとではありません。"
  },
  {
    id: "NUL29",
    name: "人間さん",
    category: "人間",
    image: "images/ningen.png",
    slimyLevel: "S",
    size: "178.2cm",
    personality: "慎重で計画性があります。良くも悪くも完璧主義なところがあり、苦労しています。"
  },
  {
    id: "NUL30",
    name: "人間",
    category: "人間",
    image: "images/ningen.png",
    slimyLevel: "S",
    size: "158.4cm",
    personality: "マイペースで柔軟です。自分の価値観を大事にしており芯がありますが、一見適当な人に見えがちです。"
  }
];

// IDから個体データを検索する共通関数
function findCreatureById(id) {
  if (!id) return null;
  return CREATURES_DATA.find(function(item) {
    return item.id.toUpperCase() === id.trim().toUpperCase();
  }) || null;
}