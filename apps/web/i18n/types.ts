export type SupportedLocale = "en" | "zh-CN";

export type LocalePath = "en" | "zh-cn";

export type HomepageContent = {
  metadata: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  navigation: {
    brandLabel: string;
    languageLabel: string;
    languageAria: string;
    openAppLabel: string;
    skipLabel: string;
    sectionsAria: string;
    noscriptAria: string;
    menuOpen: string;
    menuClose: string;
    menuOpenAria: string;
    menuCloseAria: string;
    mobileNavAria: string;
    items: readonly { href: string; label: string }[];
  };
  hero: {
    eyebrow?: string;
    title: string;
    descriptionLines: readonly string[];
  };
  lifeFragments: {
    ariaLabel: string;
    date: string;
    weekday: string;
    dateTime: string;
    note: string;
    sound: string;
    caption: string;
  };
  manifesto: {
    eyebrow?: string;
    contrast?: string | readonly string[];
    title: string;
    body: string;
    scale: readonly string[];
  };
  capture: {
    title: string;
    intro: string;
    writeTitle: string;
    writeBody: string;
    photoTitle: string;
    photoBody: string;
    voiceTitle: string;
    voiceBody: string;
  };
  time: {
    eyebrow?: string;
    title: string;
    body: string;
    yearLabel: string;
    monthLabel: string;
    dayLabel: string;
    dayNote: string;
  };
  family: {
    title: string;
    body: string;
    fromLead?: string;
    from: string;
    toLead?: string;
    to: string;
    relationAria: string;
    status: string;
  };
  voice: {
    title: string;
    body: string;
    cueAria: string;
    time: string;
  };
  principles: {
    title: string;
    titleVisible: boolean;
    items: readonly { title: string; body: string }[];
  };
  downloads: {
    title: string;
    body: string;
    bodyLive: string;
    iosLive: string;
    androidLive: string;
    iosPending: string;
    androidPending: string;
    iosPendingNote: string | null;
    androidPendingNote: string | null;
  };
  footer: {
    brand: string;
    positioning: string;
    privacy: string;
    terms: string;
    contact: string;
    navAria: string;
    disclaimer: string;
  };
  legal: {
    privacyTitle: string;
    privacyBody: string;
    termsTitle: string;
    termsBody: string;
    contactTitle: string;
    contactBody: string;
  };
};
