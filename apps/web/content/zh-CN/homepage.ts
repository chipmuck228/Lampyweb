import type { HomepageContent } from "@/i18n/types";

export const zhCNHomepage: HomepageContent = {
  metadata: {
    title: "Lampy｜这里，留下自己的生活",
    description:
      "用一句话、最多三张照片或一段声音，留下不需要发布的普通生活。",
    ogTitle: "Lampy｜这里，留下自己的生活",
    ogDescription:
      "用一句话、最多三张照片或一段声音，留下不需要发布的普通生活。",
  },
  navigation: {
    brandLabel: "Lampy",
    languageLabel: "EN",
    languageAria: "Switch to English",
    openAppLabel: "了解 Lampy",
    skipLabel: "跳到主要内容",
    sectionsAria: "页面章节",
    noscriptAria: "无脚本导航",
    menuOpen: "菜单",
    menuClose: "关闭",
    menuOpenAria: "打开导航菜单",
    menuCloseAria: "关闭导航菜单",
    mobileNavAria: "移动端章节",
    items: [
      { href: "#why-lampy", label: "为什么是 Lampy" },
      { href: "#capture", label: "留下什么" },
      { href: "#time", label: "时间" },
      { href: "#family", label: "家庭" },
      { href: "#download", label: "下载" },
    ],
  },
  hero: {
    title: "这里，留下自己的生活。",
    descriptionLines: [
      "一句话、一张照片或一段声音。",
      "不用发布，也不用让它显得重要。",
    ],
  },
  lifeFragments: {
    ariaLabel: "生活片段示意",
    date: "9月21日",
    weekday: "星期一",
    dateTime: "2026-09-21",
    note: "晚饭后，窗外有一点风。",
    sound: "声音示意 00:18",
    caption: "不用发布，也可以留下。",
  },
  manifesto: {
    contrast: ["有些生活适合分享。", "也有些，只想留给自己和重要的人。"],
    title: "不是每一张照片，都需要发出去。",
    body: "厨房里随口说的一句话，下班路上普通的天色，吃饭时一张有点模糊的照片。它们可能不适合发布，却可能值得留下。",
    scale: ["今天", "这一周", "这一年", "以后"],
  },
  capture: {
    title: "写一点，拍一点，也可以只留下一段声音。",
    intro: "文字、照片和声音自然待在同一条记录里。没有发布模板，也不要求选择内容类型。",
    writeTitle: "写一点",
    writeBody: "一句话也可以完整成立。不要求写成长篇，也不替你润色成另一种声音。",
    photoTitle: "拍一点",
    photoBody: "留下一张到三张照片。尊重原来的方向、比例和当时的光线。",
    voiceTitle: "说一点",
    voiceBody: "录下语气、停顿和周围的声音。照片留下样子，声音还留下空间。",
  },
  time: {
    title: "生活不是信息流，它会慢慢积累。",
    body: "从最近的一天，到一个月和一年。Lampy 不替你挑选“最好”的内容，只帮助你回到那个时候。",
    yearLabel: "年",
    monthLabel: "月",
    dayLabel: "日",
    dayNote: "晚饭后，窗外有一点风。",
  },
  family: {
    title: "有些生活，只想交给重要的人。",
    body: "有些记录只留给自己。有些，以后想和家里人一起再听一遍。它不会变成公开的地方，也没有关注和热度。",
    fromLead: "过去留下的一段生活",
    from: "晚饭后 · 留下一段声音",
    toLead: "以后由家人重新听见",
    to: "以后某天 · 和家人重新听见",
    relationAria:
      "一段生活先被留下，以后可以在家庭里重新听见。这不是发送或送达状态。",
    status: "私密家庭空间正在准备中",
  },
  voice: {
    title: "留下今天，以后还能听见。",
    body: "一句方言、一段饭桌谈话、窗外当时的声音。老人可以自己记录，家人也可以在获得同意后协助留下。老人始终是生活的讲述者，而不是被收集的对象。",
    cueAria: "声音记录示意",
    time: "00:18",
  },
  principles: {
    title: "Lampy 对普通生活的四个承诺",
    titleVisible: false,
    items: [
      { title: "不必表演", body: "不用让生活看起来精彩。" },
      { title: "不替你定义", body: "没有点赞、热度，也不判断什么更有意义。" },
      { title: "不催你记录", body: "想起什么的时候再回来。" },
      { title: "不替你编造", body: "文字、照片和声音仍然来自真实的生活。" },
    ],
  },
  downloads: {
    title: "想起什么的时候，再回来就好。",
    body: "Lampy 正在准备 iOS 和 Android 版本。",
    bodyLive: "可以从下面打开 iOS 或 Android 应用。",
    iosLive: "在 App Store 下载",
    androidLive: "下载 Android 应用",
    iosPending: "iOS",
    androidPending: "Android",
    iosPendingNote: "即将开放",
    androidPendingNote: "正在准备",
  },
  footer: {
    brand: "Lampy",
    positioning:
      "写下一句话，留一张照片或一段声音。不必发布，也不用把生活讲得精彩。先把今天留下，以后再回来看看。",
    privacy: "隐私政策",
    terms: "服务条款",
    contact: "联系",
    navAria: "页脚",
    disclaimer: "本网站介绍产品方向，具体功能以正式版本为准。",
  },
  legal: {
    privacyTitle: "隐私政策",
    privacyBody:
      "这是占位页面。正式隐私政策将在应用发布与数据处理范围确定后更新。本网站目前不收集账号、不接入分析 SDK，也不处理用户上传内容。",
    termsTitle: "服务条款",
    termsBody:
      "这是占位页面。服务条款将在 Lampy 正式版本发布时提供。本网站只介绍产品方向，不构成已上线功能承诺。",
    contactTitle: "联系",
    contactBody:
      "联系方式尚未公布。如需更新此页，请替换为正式邮箱或表单，不要加入未经评审的第三方跟踪脚本。",
  },
};
