import type { HomepageContent } from "@/i18n/types";

export const enHomepage: HomepageContent = {
  metadata: {
    title: "Lampy | A quiet place for the life you don’t post",
    description:
      "Save a few words, up to three photos, or a voice note—and come back to them later.",
    ogTitle: "Lampy | A quiet place for the life you don’t post",
    ogDescription:
      "Save a few words, up to three photos, or a voice note—and come back to them later.",
  },
  navigation: {
    brandLabel: "Lampy",
    languageLabel: "中文",
    languageAria: "Switch to Chinese",
    openAppLabel: "Open Lampy",
    skipLabel: "Skip to main content",
    sectionsAria: "Page sections",
    noscriptAria: "Navigation without scripts",
    menuOpen: "Menu",
    menuClose: "Close",
    menuOpenAria: "Open navigation menu",
    menuCloseAria: "Close navigation menu",
    mobileNavAria: "Mobile sections",
    items: [
      { href: "#why-lampy", label: "Why Lampy" },
      { href: "#capture", label: "What you keep" },
      { href: "#time", label: "Time" },
      { href: "#family", label: "Family" },
      { href: "#download", label: "Download" },
    ],
  },
  hero: {
    eyebrow: "For the life that stays yours",
    title: "A quiet place for the life you don’t post.",
    descriptionLines: [
      "Save a few words, up to three photos, or a voice note—and come back to them later.",
    ],
  },
  lifeFragments: {
    ariaLabel: "A small scene from ordinary life",
    date: "September 21",
    weekday: "Monday",
    dateTime: "2026-09-21",
    note: "After dinner, a little wind at the window.",
    sceneAlt: "A cup by a rainy window.",
    sound: "A voice note 00:18",
    caption: "It can stay, even if it is never posted.",
  },
  manifesto: {
    eyebrow: "Not everything needs an audience.",
    title: "Your life doesn’t have to be posted to be worth keeping.",
    body: "Social platforms are made for sharing. Lampy is made for remembering—the ordinary things you may want to feel again someday.",
    scale: ["Today", "This week", "This year", "Later"],
  },
  capture: {
    title: "Write a little. Take a photo. Leave a sound.",
    intro:
      "A Lampy entry can be as small as one sentence. Add up to three photos or a voice note when they carry more of the moment.",
    writeTitle: "A few words",
    writeBody: "For what you noticed, felt, or simply don’t want to lose.",
    writeImageAlt: "An open notebook and a pen on a table.",
    photoTitle: "A photo",
    photoBody: "Not for a feed—just the view you want to remember.",
    photoImageAlt: "A cup and a phone on a table.",
    voiceTitle: "A voice",
    voiceBody:
      "A laugh, a room, the rain outside, or someone telling a familiar story.",
  },
  time: {
    eyebrow: "Day by day",
    title: "A life takes shape quietly.",
    body: "A small thing that felt like nothing at the time can, on some afternoon years later, become the quiet light that helps you keep going.",
    yearLabel: "Year",
    monthLabel: "Month",
    dayLabel: "Day",
    dayNote: "After dinner, a little wind at the window.",
  },
  family: {
    title: "Some moments are only for the people who matter.",
    body: "You don’t have to post it for everyone. Keep the warm aside, or the laugh after dinner, for the people who care most about you.",
    sceneAlt: "Two people talking at a table after a meal.",
    fromLead: "A moment left behind",
    from: "After dinner · a familiar voice",
    toLead: "Heard again later",
    to: "Someday · heard again with family",
    relationAria:
      "A familiar voice is left after dinner and heard again with family someday. This is not a delivery status.",
    status: "Private family sharing is being prepared",
  },
  voice: {
    title: "Hear a moment, and the room comes back.",
    body: "A voice note can hold what a photo cannot—the pace of a voice, a familiar sound, the space around you.",
    cueAria: "A visual suggestion of a voice note",
    time: "00:18",
  },
  principles: {
    title: "Made for ordinary life.",
    titleVisible: true,
    items: [
      {
        title: "No performance",
        body: "Nothing here needs to impress anyone.",
      },
      {
        title: "No judgment",
        body: "Lampy does not tell you what your life should mean.",
      },
      {
        title: "No pressure",
        body: "Record when you want. Quiet days belong here too.",
      },
      {
        title: "No fabrication",
        body: "Your words, photos, and sounds remain the center.",
      },
    ],
  },
  downloads: {
    title: "Keep today. Come back when it becomes yesterday.",
    body: "Lampy is coming to iOS and Android.",
    bodyLive: "Open Lampy on iOS or Android.",
    iosLive: "Download for iOS",
    androidLive: "Get it for Android",
    iosPending: "iOS",
    androidPending: "Android",
    iosPendingNote: "Coming soon",
    androidPendingNote: "Coming soon",
  },
  footer: {
    brand: "Lampy",
    positioning: "A quiet place for your own life.",
    privacy: "Privacy",
    terms: "Terms",
    contact: "Contact",
    navAria: "Footer",
    disclaimer:
      "This site describes the product direction. Features follow the released versions.",
  },
  legal: {
    privacyTitle: "Privacy",
    privacyBody:
      "This is a placeholder. A full privacy notice will be published when the apps are released and the data practices are settled. This site does not collect accounts, load analytics SDKs, or accept uploads.",
    termsTitle: "Terms",
    termsBody:
      "This is a placeholder. Terms will be provided with the released product. This site describes direction, not a promise of live features.",
    contactTitle: "Contact",
    contactBody:
      "A public contact address has not been published yet. When it is, replace this page with that address. Do not add tracking scripts here.",
  },
};
