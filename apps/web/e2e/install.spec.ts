import { expect, test } from "@playwright/test";
for(const locale of ["en","zh-cn"]){
 test(`${locale} install fallback works without installation probing`,async({page})=>{
  await page.setViewportSize({width:320,height:740});
  await page.goto(`/${locale}/install`);
  await expect(page.locator("main h1")).toBeVisible();
  await expect(page.locator('main a[href="https://testflight.apple.com/join/S5jEsS9c"]')).toBeVisible();
  await expect(page.locator(`main a[href="https://open.yunpura.com/${locale}/install"]`)).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
 });
}
