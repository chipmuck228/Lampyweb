import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { InstallPage } from "@/components/install-page";
import { StoreLink } from "@/components/store-link";
import { getHomepageContent } from "@/i18n/get-content";
import { getDownloadLinksFromProcessEnv } from "@/lib/download-links";
import { lampyOpenUrl, LAMPY_TESTFLIGHT_URL } from "@/lib/app-open";
afterEach(cleanup);
describe("public app opening",()=>{
 it("uses direct same-window universal links independently of the Android release flag",()=>{
  for(const locale of ["en","zh-CN"] as const){
   const links=getDownloadLinksFromProcessEnv(getHomepageContent(locale).downloads,{NODE_ENV:"test"},locale);
   expect(links.ios.href).toBe(lampyOpenUrl(locale));expect(links.android.isLive).toBe(false);
   const view=render(<StoreLink link={links.ios}/>);
   expect(view.container.querySelector("a")?.getAttribute("target")).toBe("_self");view.unmount();
  }
 });
 it("provides an explicit TestFlight fallback and does not infer that the app is absent",()=>{
  for(const locale of ["en","zh-CN"] as const){
   const view=render(<InstallPage locale={locale}/>);
   expect(view.container.querySelector(`a[href='${LAMPY_TESTFLIGHT_URL}']`)).not.toBeNull();
   expect(view.container.querySelectorAll("h1")).toHaveLength(1);
   expect(view.container.textContent).toMatch(locale==="en"?/not accepting testers/:/暂不接受新测试员/);
   expect(view.container.textContent).toMatch(/Safari/);
   expect(view.container.innerHTML).not.toMatch(/setTimeout|example.com/);view.unmount();
  }
 });
 it("limits AASA paths to the public installation pages and serves JSON headers",()=>{
  const aasa=JSON.parse(readFileSync("public/.well-known/apple-app-site-association","utf8"));
  expect(aasa.applinks.details).toEqual([{appID:"B283NY984J.app.lampy.ios",paths:["/en/install","/en/install/","/zh-cn/install","/zh-cn/install/"]}]);
  const config=JSON.parse(readFileSync("../../vercel.json","utf8"));
  expect(config.headers[0].headers).toContainEqual({key:"Content-Type",value:"application/json"});
 });
});
