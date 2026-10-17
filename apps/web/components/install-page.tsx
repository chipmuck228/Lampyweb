import type { SupportedLocale } from "@/i18n/types";
import { LAMPY_TESTFLIGHT_URL, lampyOpenUrl } from "@/lib/app-open";
import styles from "./install-page.module.css";

export function InstallPage({ locale }: { locale: SupportedLocale }) {
  const zh = locale === "zh-CN";
  return <main id="main" className={`page-shell ${styles.page}`}>
    <p className={styles.kicker}>LAMPY · iOS {zh ? "测试版" : "BETA"}</p>
    <h1 className="section-heading">{zh ? "把 Lampy 带在身边。" : "Keep Lampy close."}</h1>
    <p className="prose">{zh ? "第一次使用？通过 Apple TestFlight 安装 Lampy 测试版。" : "New here? Install the Lampy beta through Apple TestFlight."}</p>
    <a className={styles.primary} href={LAMPY_TESTFLIGHT_URL} rel="noopener noreferrer">{zh ? "通过 TestFlight 安装" : "Install with TestFlight"}</a>
    <ol className={styles.steps}>
      <li>{zh ? "点击上方按钮，按 Apple 页面提示安装 TestFlight。" : "Follow Apple's instructions to install TestFlight."}</li>
      <li>{zh ? "回到邀请链接，加入 Lampy 测试并安装。" : "Return to the invitation, join the Lampy beta, and install."}</li>
      <li>{zh ? "打开 Lampy，开始留下自己的生活。" : "Open Lampy and leave a little of your day."}</li>
    </ol>
    <p className="prose">{zh ? "已经安装？" : "Already installed?"} <a href={lampyOpenUrl(locale)}>{zh ? "打开 Lampy" : "Open Lampy"}</a></p>
    <p className={styles.note}>{zh ? "若没有打开 App，请在 Safari 中打开官网 yunpura.com，再点击“打开 Lampy”。部分 IM 内置浏览器不支持直接打开 App；你也可以从手机桌面打开。" : "If the app does not open, open yunpura.com in Safari and tap Open Lampy. Some in-app browsers do not support opening apps; you can also launch Lampy from your Home Screen."}</p>
    <p className={styles.note}>{zh ? "测试名额和可安装状态以 Apple 页面为准。若提示暂不接受新测试员，请稍后再试。家庭功能仍需受邀测试账号，安装 App 不等于获得家庭账号。" : "Availability and places are managed by Apple. If the beta is not accepting testers, please try later. Family features still require an invited test account; installing the app does not create one."}</p>
    <a href={`https://yunpura.com/${zh ? "zh-cn" : "en"}`}>{zh ? "回到 Lampy 介绍" : "About Lampy"}</a>
  </main>;
}
