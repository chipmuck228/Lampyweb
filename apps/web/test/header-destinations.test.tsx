import {renderToStaticMarkup} from "react-dom/server";
import {cleanup, fireEvent, render} from "@testing-library/react";
import {afterEach, describe, expect, it} from "vitest";
import {SiteHeader} from "@/components/site-header";
import {getHomepageContent} from "@/i18n/get-content";
import {getDownloadLinksFromProcessEnv} from "@/lib/download-links";
import {localePath} from "@/i18n/config";

afterEach(()=>{cleanup();document.body.classList.remove("nav-open");});
describe("header links return from legal pages to the localized homepage",()=>{
 for(const locale of ["en","zh-CN"] as const){
  for(const page of ["privacy","terms","contact"]){
   it(`${locale}/${page}: desktop, no-script and mobile destinations resolve to homepage sections`,()=>{
    const content=getHomepageContent(locale);
    const {container,getByRole}=render(<SiteHeader locale={locale} content={content.navigation} downloads={getDownloadLinksFromProcessEnv(content.downloads)}/>);
    const staticHtml=renderToStaticMarkup(<SiteHeader locale={locale} content={content.navigation} downloads={getDownloadLinksFromProcessEnv(content.downloads)}/>);
    const noScript=staticHtml.match(/<noscript>([\s\S]*?)<\/noscript>/)?.[1] ?? "";
    const source=new URL(`https://www.yunpura.com${localePath(locale)}/${page}`);
    for(const item of content.navigation.items){
     const expected=`${localePath(locale)}${item.href}`;
     const desktop=container.querySelector(`nav a[href="${expected}"]`);
     expect(desktop).not.toBeNull();
     expect(noScript).toContain(`href="${expected}"`);
     expect(new URL(desktop!.getAttribute("href")!,source).pathname).toBe(localePath(locale));
    }
    fireEvent.click(getByRole("button",{name:content.navigation.menuOpenAria,hidden:true}));
    const mobile=getByRole("navigation",{name:content.navigation.mobileNavAria});
    for(const item of content.navigation.items)expect(mobile.querySelector(`a[href="${localePath(locale)}${item.href}"]`)).not.toBeNull();
    fireEvent.click(mobile.querySelector("a")!);
    expect(document.body.classList.contains("nav-open")).toBe(false);
   });
  }
 }
});
