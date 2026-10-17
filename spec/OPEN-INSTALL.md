# 官网 → 打开 Lampy → TestFlight 安装页

## 链接契约

- 分享介绍页：https://yunpura.com（现有 App 分享入口不变）
- 中文打开链接：https://open.yunpura.com/zh-cn/install
- 英文打开链接：https://open.yunpura.com/en/install
- TestFlight：https://testflight.apple.com/join/S5jEsS9c

官网 iOS CTA 使用同窗口、普通 HTTPS 链接直接指向上述打开域名；不通过 JS 超时猜测是否安装，不使用 scheme+定时跳转，不自动发起安装。iOS 系统成功关联且安装了支持此域名的新版本时，可进入 App“最近”；未安装、旧版本或浏览器不支持唤起时，同一 URL 显示静态中英文 TestFlight 安装页。安装页保留显式下载按钮、Safari/桌面打开说明和返回介绍页链接。不能仅凭下载页被打开就断言 App 未安装。

不依赖家庭 API，不放邀请 token、账号或私人记录到公开链接，不扩大家庭邀请路径。Android 原有发布开关不变。官网默认 iOS 入口不再受 NEXT_PUBLIC_DOWNLOADS_LIVE 控制，也不再使用 NEXT_PUBLIC_IOS_APP_URL；这两个旧配置仍用于原通用链接模型/Android，未来正式上架再独立调整安装目标。

## 两端上线前提

1. 合并/部署官网 PR 到现有站点，保持 NEXT_PUBLIC_SITE_URL=https://yunpura.com。
2. 在现有 Vercel 项目绑定 open.yunpura.com，按 Vercel 提供的 DNS 值配置并启用 HTTPS。该域名必须提供同一份静态站点，不能设为重定向到 yunpura.com。主域名保留介绍页，不给首页配置 App 路径匹配。
3. 核对 open.yunpura.com/.well-known/apple-app-site-association 直接返回 HTTP 200 和 application/json，无登录、保护页或 301/302。vercel.json 已设置此文件响应头；非 Vercel 部署需在实际静态服务器设置等效头。
4. 配套 App PR 增加 applinks:open.yunpura.com 和公共安装路径处理；需要重新 prebuild、签名和原生构建/安装。Build 10 及已有旧 App 不会因网页变化自动获得关联。
5. 核对签名后的 application-identifier 是否为 B283NY984J.app.lampy.ios；AASA 使用这个现有项目值。如果真实 App Identifier Prefix 不同，必须部署匹配签名的 AASA，不能仅凭 Team ID 推断已验证。
6. 先完成 DNS/AASA 部署再安装新的真机开发包或 TestFlight 包，给 Apple CDN 获取关联配置的时间。家庭付费 PDF、统一购买等继续关闭，不需要修改云主机数据库或支付密钥。

只读检查示例：

```bash
curl --fail --show-error -D - https://open.yunpura.com/.well-known/apple-app-site-association
curl --fail --show-error -I https://open.yunpura.com/en/install
```

不要加 -L 掩盖 AASA 重定向。Apple 管理的 CDN 缓存及用户选择都可能影响唤起，需要真机验证，静态测试不等于已关联。

## 测试矩阵

- 未安装：用单独测试设备点 IM 分享的介绍页 → iOS 按钮 → 下载页 → TestFlight；不要为了测试删除有个人记录的现用 App。
- 已安装新包：Safari 打开 yunpura.com 介绍页，点击 iOS 按钮应打开 App“最近”。冷启动、后台已有进程和本机保护开启分别验证。
- 已安装旧包：允许落到下载页，明确需要升级，不宣称已支持唤起。
- 不在 Safari 地址栏直接输入链接来判定 Universal Links；测试用户点击行为。安装页同域再点打开也可能继续留在浏览器，返回主域介绍页再点可避免同域导航；页面已提供主域介绍页链接。
- 微信/QQ/其他 IM 分别测试；第三方浏览器是否支持唤起不由站点控制，不支持时提供“在 Safari 中打开官网”及手机桌面打开说明，不承诺所有 IM 自动唤起。
- 中英文、320px、关闭 JS 的下载页仍可阅读并点击 TestFlight。家庭受邀账号与 TestFlight 安装资格分离。
- TestFlight 链接当前曾提示“不接受新测试员”，启用外测名额/构建后还需用未加入测试的账号验证；网站不能绕过 Apple 招募限制。

## 当前验收边界

代码准备与自动检查不代表 DNS 已绑定、AASA 已被 Apple CDN 验证、App 已重新签名或新 TestFlight 已上传。这里不自动合并、公开部署或开放家庭付费导出。实际部署状态和真机结果待单独记录。

## 本轮检查

官网41项单元测试、TypeScript、静态 production build 通过；导出产物包含两种语言安装页和 AASA。ESLint 无错误，保留4处已有 img 优化提示。Playwright 26项浏览器用例因环境缺少 Chromium 未能启动；尝试下载对应浏览器时收到无效/截断压缩包，不能记为页面测试通过。新安装页的320px浏览器布局与真实 iOS/IM 唤起留待可用浏览器及真机验证。代码不包含遥测或安装探测脚本。
