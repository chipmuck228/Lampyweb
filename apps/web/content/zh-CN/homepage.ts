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
    sceneAlt: "窗边的一杯水，窗外下着雨。",
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
    title: "安静生活的安静碎片。",
    intro:
      "无论这只是潦草写下的一行字、稍纵即逝的景色，还是窗外的雨声，只要它能帮你记住生活真实的触感，就值得留存。",
    writeTitle: "寥寥数语",
    writeBody: "写给那些不需要观众、只需要一个家的念头。",
    writeImageAlt: "桌上打开的空白笔记本和一支钢笔。",
    photoTitle: "一张照片",
    photoBody: "不是为了一个赞，而是为了某次回眸。",
    photoImageAlt: "桌上的杯子和手机。",
    voiceTitle: "一个声音",
    voiceBody: "一个笑声、一个房间、外面的雨声——那些照片无法捕捉的瞬间氛围。",
  },
  time: {
    title: "生活不是信息流，它会慢慢积累。",
    body: "有些当时觉得微不足道的小事，在几年后的某个下午，会变成支撑你走下去的微光。",
    yearLabel: "年",
    monthLabel: "月",
    dayLabel: "日",
    dayNote: "晚饭后，窗外有一点风。",
  },
  family: {
    title: "有些生活，只想交给重要的人。",
    body: "不用发在朋友圈让所有人看到，只把那句温暖的碎碎念或晚饭后的笑声，留给最在意你的人。",
    sceneAlt: "晚饭后，两个人坐在桌边说话。",
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
    body: "乡音绕梁、饭桌欢声，或窗外那场久违的雨，都值得收藏。不必找由头，某个平常的瞬间按下录音就好。一句唠叨、一次开怀的笑，多年后再听，都是时光赠予的礼物。无论由谁记录，或只是在旁静静听着，老人始终是被用心倾听的生活讲述者。",
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
