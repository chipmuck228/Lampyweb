# Lampy Web Homepage

Lampy 品牌宣传首页。这是静态可部署的 Next.js 站点，不实现记录、登录、上传或家庭业务功能。

## 环境要求

- Node.js 20 或更新版本
- npm 10 或更新版本

## 安装

在本目录执行：

```bash
cd apps/web
npm install
npx playwright install chromium
```

复制环境变量：

```bash
cp .env.example .env.local
```

## 本地启动

```bash
npm run dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000)。

## 测试

```bash
npm run typecheck
npm run lint
npm test
npm run e2e
```

`npm test` 覆盖下载链接占位/正式状态，以及首页语义：单一 `h1`、主要 Sections、下载链接。

`npm run e2e` 使用 Playwright 验证首页加载、锚点导航、移动菜单、iOS/Android 占位链接，以及 320px 无横向溢出。E2E 开发服务器使用 `http://127.0.0.1:3100`，避免和其他本地 3000 端口冲突。

## 构建

```bash
npm run build
```

静态文件输出到 `out/`。本地预览：

```bash
npm start
```

`npm start` 使用 `serve` 托管 `out/`，地址为 [http://localhost:3000](http://localhost:3000)。

## 环境变量

| 变量 | 作用 | 默认/占位 |
|---|---|---|
| `NEXT_PUBLIC_IOS_APP_URL` | iOS 下载地址 | `https://example.com/lampy/ios` |
| `NEXT_PUBLIC_ANDROID_APP_URL` | Android 下载地址 | `https://example.com/lampy/android` |
| `NEXT_PUBLIC_DOWNLOADS_LIVE` | 是否显示正式下载文案 | `false` |
| `NEXT_PUBLIC_SITE_URL` | canonical / sitemap 站点地址 | `http://localhost:3000` |

变量缺失时使用明确占位 URL。`NEXT_PUBLIC_DOWNLOADS_LIVE=false` 时不渲染商店外链，只显示“iOS / 即将开放”和“Android / 正在准备”，不会出现“立即下载”。

## 替换下载地址

1. 将 `.env.local` 中的 iOS / Android URL 改为正式商店地址。
2. 确认商店页面已真实可访问后，设置 `NEXT_PUBLIC_DOWNLOADS_LIVE=true`。
3. 重新构建并部署。

不要伪造 App Store / Google Play 徽章，也不要在未上架时使用正式下载文案。

## 替换 favicon / OG image

- Favicon：`public/icon.svg`
- Apple touch icon：`public/apple-touch-icon.svg`
- 分享图占位：`public/og.svg`
- 构建时 Open Graph PNG：`app/opengraph-image.tsx`

替换后保持本地资产，不要依赖远程图片。

## 部署说明

站点使用 `output: "export"`，可部署到任何静态托管：

1. 设置生产环境的 `NEXT_PUBLIC_SITE_URL`。
2. 运行 `npm run build`。
3. 上传 `out/` 目录。

不要在此站点接入分析、广告或用户上传接口。

## 当前占位内容

- iOS / Android 下载地址为 example.com 占位。
- 隐私政策、服务条款、联系页为说明性占位页。
- LifeFragments 使用本地 SVG 色面，不模拟真实 App。
- Favicon / OG 为本地占位图形。
- 家庭功能标注为“正在准备中”。

## 已验证和未验证浏览器

已通过自动化检查：Playwright Chromium、首页语义测试、生产构建。

未人工验证：Safari、Firefox、真实 iOS/Android 浏览器、屏幕阅读器真机、生产域名下的分享卡片。
