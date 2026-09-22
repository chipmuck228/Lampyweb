# Lampyweb

当前目录包含 Lampy 品牌规格，以及独立的品牌宣传网站。

## Web Homepage

品牌宣传首页位于 `apps/web/`，与微信小程序仓库分离，不实现记录或家庭功能。

```bash
cd apps/web
npm install
npm run dev -- -H 127.0.0.1 -p 3200
```

或在仓库根目录执行 `npm run dev`。浏览器打开 http://127.0.0.1:3200。完整说明见 [apps/web/README.md](apps/web/README.md)。

Vercel 部署以仓库根目录的 `vercel.json` 为准：安装并构建 `apps/web`，发布静态目录 `apps/web/out`。如果在控制台把 Root Directory 设成了 `apps/web`，同样会发布 `out/`，不要用默认的 Next.js Serverless 输出。
