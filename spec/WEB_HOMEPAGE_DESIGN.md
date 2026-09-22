# Lampy Web Homepage 设计

> 文档状态：品牌官网首页实现规格  
> 更新日期：2026-09-22  
> 技术目标：TypeScript + Node.js + Next.js  
> 页面性质：只宣传 Lampy 的产品价值，不实现 Lampy 记录、家庭分享或历史浏览功能。

## 1. 页面目标

Homepage 需要在较短浏览时间内让访问者理解：

1. Lampy 不是公开社交平台；
2. 它保存的是不需要发布的普通生活；
3. 一句话、最多三张照片或一段声音都可以成为记录；
4. 长期价值是以后仍能看见和听见；
5. 家庭是有限、私密、主动选择的边界；
6. iOS 与 Android 下载入口清楚，但尚未上线的能力不能伪装成已发布。

## 2. 核心信息

### 主标题

> 这里，留下自己的生活。

### 首屏说明

> 一句话、一张照片或一段声音。不用发布，也不用让它显得重要。

### 核心对比

> 社交平台帮助人分享生活，Lampy 帮助人留住生活。

### 长期价值

> 今天看起来普通的事，过些时候再看，可能已经不一样。

### 家庭价值

> 有些生活不用发给所有人，只想留给家里人。

家庭功能未上线时，必须标注为产品方向或“正在准备”，不能声称已经可用。

## 3. 视觉方向：安静的生活出版物

页面应像一本经过认真编排、但仍然保留真实呼吸的生活刊物。

### 视觉关键词

- 真实；
- 安静；
- 有时间感；
- 克制；
- 编辑出版式比例；
- 不完全机械但不随机；
- 适合长期品牌使用。

### 不采用

- SaaS Hero + Dashboard 截图；
- 三列圆角 Feature Cards；
- App 手机壳 Mockup 堆叠；
- 暖色渐变和毛玻璃；
- 3D 球体、粒子和持续漂浮；
- 胶带、撕纸、贴纸和仿手账；
- 虚构用户头像、虚假好评和下载数字；
- 与实际 App 不一致的产品界面截图；
- 大量“微光”“点亮”等单一隐喻。

## 4. 颜色与材质

建议 Token：

```css
--paper: #f3f0e9;
--paper-deep: #e8e1d5;
--ink: #25231f;
--ink-soft: #68635b;
--line: #cfc7b9;
--sage: #7d8974;
--clay: #a76f55;
--sound: #596b75;
--focus: #315f8a;
```

使用规则：

- `paper` 是主要背景，不叠加明显纹理图片；
- `ink` 保证正文对比度；
- `sage`、`clay`、`sound` 只作为小范围语义强调；
- 不为每个 Section 更换完整主题色；
- 不用阴影把所有内容托成卡片。

## 5. 字体与排版

- 中文标题：优先系统宋体栈，作为出版感而非仿手写；
- 正文和操作：系统无衬线字体；
- 不依赖远程字体，避免隐私、加载和中文回退问题；
- Hero 标题使用响应式 `clamp()`；
- 正文最大行长约 38–44 个中文字符；
- 移动端不通过缩小字体塞入桌面布局；
- 支持 200% 浏览器缩放和系统大字号。

建议字体栈：

```css
--font-display: ui-serif, "Songti SC", "STSong", "Noto Serif CJK SC", serif;
--font-body: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI",
  "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
```

## 6. 页面结构

```text
Site Header
Hero / 品牌主张
Ordinary Life Manifesto / 不必发布的生活
Capture Ways / 写、拍、说
Time Accumulation / 日、月、年
Family Boundary / 只交给重要的人
Voice & Older Adults / 以后还能听见
Product Principles / 不表演、不评价、不催促
Download / iOS 与 Android
Footer / 隐私、联系、版权
```

各区段必须使用不同的空间结构，不能全部变成“标题 + 三卡片”。

## 7. Header

### 内容

- 左侧：Lampy 文字标识；
- 右侧：`为什么是 Lampy`、`留下什么`、`时间`、`家庭`；
- 下载入口；
- 移动端菜单按钮。

### 行为

- 页面内锚点导航；
- Sticky 可以使用，但背景保持简洁；
- 滚动后只增加细分隔线或轻微不透明度，不使用毛玻璃；
- 键盘可操作；
- 移动菜单具备焦点管理、Escape 关闭和背景滚动控制。

## 8. Hero

### 桌面结构

- 左侧约 55%：主标题、说明和下载入口；
- 右侧约 45%：`LifeFragments` 生活片段构图；
- 构图不模拟真实 App UI，而是通过日期、短句、照片占位和声音时间形成品牌意象。

### LifeFragments

使用确定性的编辑布局：

- 日期：`9月21日 / 星期一`；
- 短句：`晚饭后，窗外有一点风。`；
- 一个无人物身份的生活照片占位区域；
- 一条声音时间线：`00:18`；
- 小字：`不用发布，也可以留下。`

不得随机定位、随机旋转或持续漂浮。

### CTA

- `iOS 下载`：读取环境变量占位 URL；
- `Android 下载`：读取环境变量占位 URL；
- 未配置正式地址时显示 `即将开放` 或 `下载地址待更新`；
- 不显示虚假的 App Store 评分、排名和用户数量。

## 9. 不必发布的生活

采用大字号声明和少量正文，不做 Card。

标题：

> 不是每一张照片，都需要发出去。

正文：

> 父亲在厨房随口说的一句话，下班路上普通的天色，家里吃饭时一张有点模糊的照片。它们可能不适合发布，却可能值得留下。

视觉：正文与一条细长时间刻度发生关系，表达内容进入时间，而不是进入 Feed。

## 10. 写、拍、说

采用不等宽三段版面，而不是三个等尺寸 Feature Cards。

### 写一点

> 一句话也可以完整成立。不要求写成长篇，也不替你润色成另一种声音。

### 拍一点

> 留下一张到三张照片。尊重原来的方向、比例和当时的光线。

### 说一点

> 录下语气、停顿和周围的声音。照片留下样子，声音还留下空间。

视觉节奏：文字较窄、图片区域较大、声音区域横向延伸，对应不同媒介属性。

## 11. 时间积累

标题：

> 生活不是信息流，它会慢慢积累。

用年、月、日三级排版展示时间结构：

- 年：疏密纹理；
- 月：有记录与空白日期共存；
- 日：一条具体文字、图片或声音重新展开。

这只是品牌解释，不实现可交互历史浏览器。可以有轻微滚动进入动效，但不能伪装成真实产品功能。

## 12. 家庭边界

标题：

> 有些生活，只想交给重要的人。

正文：

> Lampy 所设想的家庭空间，小而私密，通过邀请加入。个人记录不会因为加入家庭而自动公开，也没有关注、热度和陌生人推荐。

状态标记：

> 家庭功能正在准备中

如果家庭功能已经真实上线，才可移除此标记并改写 CTA。

不得使用虚构家庭头像或联系人列表。

## 13. 声音与老人

标题：

> 留下今天，以后还能听见。

正文：

> 一句方言、一段饭桌谈话、窗外当时的声音。老人可以自己记录，家人也可以在获得同意后协助留下。老人始终是生活的讲述者，而不是被收集的对象。

视觉使用一条真实、确定性的声音线和清楚的播放符号，但按钮只用于展示说明，不播放伪造录音。需要添加 `aria-label="声音记录示意"`，不得让用户误以为它是可工作的播放器。

## 14. 产品原则

不要做四张圆角卡片。使用纵向编号和跨栏文字：

1. **不表演**：不用让生活看起来精彩。
2. **不评价**：没有点赞、热度和积极率。
3. **不催促**：没有连续记录压力。
4. **不伪造**：发生时间、记录时间和分享状态保持诚实。

## 15. 下载区域

标题：

> 想起什么的时候，再回来就好。

说明：

> Lampy 正在准备 iOS 和 Android 版本。下载地址将在发布时更新。

下载链接配置：

```env
NEXT_PUBLIC_IOS_APP_URL=https://example.com/lampy/ios
NEXT_PUBLIC_ANDROID_APP_URL=https://example.com/lampy/android
NEXT_PUBLIC_DOWNLOADS_LIVE=false
```

行为规则：

- `NEXT_PUBLIC_DOWNLOADS_LIVE=false` 时链接仍可使用占位符，但 UI 明确显示“占位地址 / 即将开放”；
- `true` 时显示正式下载文案；
- 外链使用安全属性；
- 记录下载点击时不得引入跟踪 SDK，除非以后完成隐私评审；
- 不使用虚构二维码。

## 16. Footer

包含：

- Lampy；
- 一句简短定位；
- 隐私政策占位链接；
- 服务条款占位链接；
- 联系方式占位链接；
- 当前年份；
- “本网站介绍产品方向，具体功能以正式版本为准”。

## 17. React 组件边界

```text
app/
  layout.tsx
  page.tsx
  globals.css
  sitemap.ts
  robots.ts

components/
  site-header.tsx
  mobile-navigation.tsx
  hero.tsx
  life-fragments.tsx
  manifesto-section.tsx
  capture-ways.tsx
  time-accumulation.tsx
  family-boundary.tsx
  voice-section.tsx
  product-principles.tsx
  download-section.tsx
  store-link.tsx
  site-footer.tsx

lib/
  site-config.ts
  download-links.ts
```

原则：组件用于语义、维护和无障碍，不把页面重新切成统一 Card 系统。

## 18. 技术要求

- Next.js App Router；
- TypeScript strict；
- Server Components 优先；
- 只有移动菜单和必要动效使用 Client Component；
- 不需要数据库、API、登录和 CMS；
- 不实现 Lampy 记录功能；
- 不嵌入用户内容上传表单；
- 默认不用第三方 UI Library；
- CSS Modules 或单一清楚的全局样式体系；
- 不引入 Tailwind，除非仓库已有并明确决定使用；
- 不从远程加载字体；
- 不使用外部跟踪、Cookie Banner 或分析 SDK；
- 静态可部署；
- 图片使用 `next/image`，但首版不得依赖不存在的远程图片。

## 19. SEO 与分享

### Metadata

- title：`Lampy｜这里，留下自己的生活`
- description：`用一句话、最多三张照片或一段声音，留下不需要发布的普通生活。`
- canonical：通过环境变量配置；
- Open Graph 与 Twitter/X metadata；
- `metadataBase` 不写死生产域名；
- favicon、manifest 和分享图使用本地占位资产，并在 README 标注替换方式。

### 结构化数据

只使用真实信息。尚未上架时不要输出带正式商店 URL、评分或价格的 SoftwareApplication schema。

## 20. 无障碍

- 页面只有一个 `h1`；
- 标题层级连续；
- 提供 skip link；
- 所有导航和下载链接键盘可达；
- 焦点样式明显；
- 移动菜单管理焦点；
- 动效尊重 `prefers-reduced-motion`；
- 颜色不是唯一信息；
- 文本和背景满足 WCAG AA；
- 200% 缩放无内容丢失；
- `lang="zh-CN"`；
- 装饰图形从辅助技术隐藏；
- 伪播放器明确标注为示意，不提供无效按钮。

## 21. 响应式

### Mobile

- 单列为主；
- Hero 标题优先；
- LifeFragments 下移；
- 下载入口堆叠；
- 不出现横向溢出。

### Tablet

- 控制正文行长；
- 写、拍、说使用不等宽双栏/跨栏重排；
- 横屏不简单拉伸手机内容。

### Desktop

- 最大内容宽度约 1200–1320px；
- Hero 双栏；
- Section 使用出版物式跨栏和错位，但保持确定性；
- 超宽屏增加外侧留白，不无限扩张内容。

## 22. 动效

- 首次进入：标题和 LifeFragments 轻微淡入；
- Section 进入视口：只允许一次、6–12px 位移、180–360ms；
- 导航锚点平滑滚动在 Reduce Motion 下关闭；
- 无无限动画；
- 无视差滚动；
- 无鼠标追随；
- 动效不阻止阅读和点击；
- 首屏内容在无 JavaScript 时仍完整可见。

## 23. 性能

- Lighthouse Performance、Accessibility、Best Practices、SEO 目标均不低于 95；
- 首屏不依赖大图和视频；
- 无布局跳动；
- JavaScript 主要来自 Next.js 和移动导航；
- 不为了简单出现动画引入大型动效库；
- 优先 CSS；
- 所有本地图片声明尺寸。

## 24. 验收清单

- 页面清楚表达 Lampy，而不是通用日记产品；
- 没有功能型 App 的假交互；
- 没有三列圆角 Feature Cards；
- 没有虚假用户、评价、数据和商店状态；
- 下载占位链接集中配置；
- 手机、平板、桌面布局成立；
- 超大字号和键盘导航可用；
- Reduce Motion 生效；
- 页面无横向滚动；
- JS 关闭后主要内容仍可读；
- `npm run lint`、`npm run typecheck`、`npm run test`、`npm run build` 通过；
- 如配置 E2E，核心锚点和下载链接测试通过；
- 不修改 Lampy 领域模型、Repository、迁移和微信小程序页面。

