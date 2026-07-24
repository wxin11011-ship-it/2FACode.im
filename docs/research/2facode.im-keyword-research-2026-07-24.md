# 2facode.im 竞品、关键词与页面规划报告

> 日期：2026-07-24
> 市场：英文 / 美国优先
> 项目阶段：新站、未发现线上可访问页面、当前目录未初始化 Git
> 方法：Google Suggest、实时 Web SERP、竞品页面、社区问题、RFC 6238 与产品事实

## 1. 执行结论

`2facode.im` 的首要机会不是“第一个支持批量”，因为 `twofa.net`、`twofa.live` 等产品已经支持每行一个密钥。真正可建立品牌优势的是：

1. **可验证的隐私**：静态站、浏览器本地计算、默认不保存、生成时零网络请求、无分析脚本。
2. **更快的批量工作流**：同一个输入框自动支持 1–50 行，逐行错误提示、统一倒计时、单个复制与 Copy all。
3. **可信而克制的表达**：不写“绝对安全”；明确说明网页工具的边界，长期保存仍建议使用受信任的专用 authenticator 或 password manager。
4. **工具优先的混合页面**：首屏直接完成任务，正文覆盖 how-to、隐私、限制、故障和研究型 FAQ。
5. **Apple / Tesla 式产品感**：单色、高对比、大留白、系统字体、精确反馈、无装饰性广告、无无意义动效。

首页建议主攻 **`2fa code generator`**，将 **`totp generator online`** 作为同页第二意图，将 bulk 作为产品差异而非首批独立 URL。`2fa QR code generator` 是最清晰的第二工具页机会，但应在首页稳定后再做。

## 2. 数据说明与限制

- Google Suggest 脚本正常，使用种子：`2fa code generator`、`online 2fa code generator`、`bulk 2fa generator`、`totp generator`、`totp generator online`、`2fa generator online`。
- 对 `2fa code generator` 执行了 a–z 扩展；真实下拉词统一标记 `[SUGGEST]`。
- Google HTML SERP 在应用内浏览器触发 reCAPTCHA，因此未读取 PAA、PASF、Related Searches；不会伪造这些标签。
- 实时 Web SERP 可用，检查了 10 个核心查询与多个竞品；结果标记 `[SERP]`。
- 没有 Ahrefs、Semrush、GSC 或 GA4 数据；不报告搜索量、排名、流量或 backlink 数字。
- `2facode.im` 当前无法从公网读取，按全新站处理。
- 下方 80 词候选池中，真实信号与模型假设严格分开；`[AI-主题]` 只能作为后续验证项。

## 3. 竞品快照

| 竞品                                                       | 当前可见能力                             | 做得好的地方                                             | 明显问题 / 机会                                                    |
| ---------------------------------------------------------- | ---------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------ |
| [2fa.live](https://2fa.live/)                              | 单密钥生成、暗色模式                     | 品牌记忆强、任务直接                                     | 页面被大量账号买卖广告淹没；缺少清晰的本地计算证据；信任感弱       |
| [twofa.net](https://www.twofa.net/)                        | 批量、保存、复制全部、下载、分享         | 批量能力完整；声明 client-side、no tracking、open source | 功能过载；分享 2FA secret 会扩大风险面；本地保存与临时生成混在一起 |
| [twofa.live](https://www.twofa.live/)                      | 多行输入、FAQ                            | 首屏很短、批量输入清楚                                   | 品牌与 `2fa.live` 高度相似；信任论证主要是文案                     |
| [2fa.ac](https://2fa.ac/)                                  | 单码、工具矩阵、how-to、FAQ              | SEO 结构完整；解释 Web Crypto / RFC 6238                 | 工具矩阵分散主题；明确由广告支持；首页信息密度较高                 |
| [2fafree.com](https://2fafree.com/)                        | 单码、clear、倒计时                      | “No account / upload / storage”表达具体                  | 仅单码；内容与视觉较薄；没有批量效率优势                           |
| [2fafast.com](https://2fafast.com/)                        | 单码、本地保存、分享 URL、扩展、工具矩阵 | SEO 内容深、三步引导、Network 面板验证提示               | 保存与分享 secret 增加攻击面；页面很长；可见评分需要真实性证明     |
| [totp.app](https://totp.app/)                              | 浏览器 authenticator、长期本地保存       | 早期品牌与静态站叙事                                     | 强依赖 JavaScript；搜索抓取内容弱；长期保存与临时生成边界不清      |
| [Go Tools TOTP](https://go-tools.org/tools/totp-generator) | 算法/位数/周期高级选项、setup、verify    | 开发者功能强、标准信息充分                               | 对普通用户认知负担大；不适合作为极速批量替代品                     |

### 竞品共同模式

- SERP 期待的是 **可工作的工具 + 解释内容 + FAQ**，不是纯落地页。
- “browser-only / no signup / free / secret never leaves device” 已成为基础门槛，不再是独特卖点。
- 支持批量的竞品存在，但大多同时加入保存、分享、下载等高风险或高复杂度功能。
- 对 `2facode.im` 最有利的空位是：**一次性会话、默认零持久化、批量快、界面静、证据清楚**。

## 4. 关键词树（80 个候选）

### 4.1 真实搜索、竞品与社区信号（1–50）

1. `2fa code generator` `[SUGGEST][SERP|depth=0]`
2. `2fa auth code generator` `[SUGGEST|depth=1]`
3. `2fa authentication code generator` `[SUGGEST|depth=1]`
4. `2fa code generator free` `[SUGGEST|depth=1]`
5. `2fa code generator website` `[SUGGEST|depth=1]`
6. `2fa code generator app` `[SUGGEST|depth=1]`
7. `2fa code generator app free` `[SUGGEST|depth=1]`
8. `2fa code generator extension` `[SUGGEST|depth=1]`
9. `2fa verification code generator online` `[SUGGEST|depth=1]`
10. `generate 2fa code` `[SUGGEST|depth=1]`
11. `2fa 6 digit code` `[SUGGEST|depth=1]`
12. `2fa totp code generator` `[SUGGEST|depth=1]`
13. `2fa code generation algorithm` `[SUGGEST|depth=1]`
14. `2fa codes not working` `[SUGGEST][社区|depth=1]`
15. `2fa qr code generator online` `[SUGGEST][SERP|depth=1]`
16. `2fa qr code generator` `[SUGGEST][SERP|depth=1]`
17. `2fa qr code generator microsoft` `[SUGGEST|depth=1]`
18. `two factor authentication code generator` `[SUGGEST|depth=1]`
19. `two factor authentication code generator facebook` `[SUGGEST|depth=1]`
20. `how do i get a two factor authentication code for facebook` `[SUGGEST|depth=1]`
21. `2fa code generator for x` `[SUGGEST|depth=1]`
22. `2fa x verification code generator` `[SUGGEST|depth=1]`
23. `2fa code generator discord` `[SUGGEST|depth=1]`
24. `totp generator google` `[SUGGEST|depth=1]`
25. `totp generator` `[SUGGEST][SERP|depth=0]`
26. `totp generator online` `[SUGGEST][SERP|depth=1]`
27. `free online totp generator` `[SUGGEST|depth=2]`
28. `generate totp code` `[SUGGEST|depth=2]`
29. `generate totp code online` `[SUGGEST|depth=2]`
30. `how to generate totp` `[SUGGEST|depth=2]`
31. `how to get totp` `[SUGGEST|depth=2]`
32. `how to get totp code` `[SUGGEST|depth=2]`
33. `totp token generator online` `[SUGGEST|depth=2]`
34. `rfc 6238 totp generator online` `[SUGGEST|depth=2]`
35. `totp qr code generator online` `[SUGGEST|depth=2]`
36. `how do i get my 2fa code` `[SUGGEST|depth=1]`
37. `how does 2fa code generation work` `[SUGGEST][社区|depth=1]`
38. `how to get 2fa for free` `[SUGGEST|depth=1]`
39. `2fa without phone number` `[SUGGEST|depth=1]`
40. `is it safe to enter my 2fa secret key online` `[竞品][社区|depth=1]`
41. `browser local totp generator` `[SERP][竞品|depth=1]`
42. `open source online 2fa code generator` `[SERP][竞品|depth=1]`
43. `bulk 2fa generator` `[SERP][竞品|depth=0]`
44. `multiple 2fa secret keys` `[竞品|depth=1]`
45. `copy all 2fa codes` `[竞品|depth=1]`
46. `2fa generator no storage` `[竞品][社区|depth=1]`
47. `2fa generator no signup` `[竞品|depth=1]`
48. `2fa generator no app` `[竞品|depth=1]`
49. `can i use an online generator instead of google authenticator` `[竞品][社区|depth=1]`
50. `why does my 2fa code change every 30 seconds` `[竞品][社区|depth=1]`

### 4.2 待验证的主题扩展（51–80）

51. `batch totp generator` `[AI-主题]`
52. `mass 2fa code generator` `[AI-主题]`
53. `multi account 2fa generator` `[AI-主题]`
54. `50 2fa codes at once` `[AI-主题]`
55. `2fa code generator no tracking` `[AI-主题]`
56. `offline 2fa code generator website` `[AI-主题]`
57. `temporary 2fa code generator` `[AI-主题]`
58. `2fa secret never leaves browser` `[AI-主题]`
59. `2fa live alternative` `[SERP][AI-主题]`
60. `2fa run alternative` `[AI-主题]`
61. `safe alternative to 2fa live` `[AI-主题]`
62. `ad free 2fa generator` `[AI-主题]`
63. `2fa generator for facebook accounts` `[AI-主题]`
64. `2fa generator for instagram` `[AI-主题]`
65. `2fa generator for github` `[AI-主题]`
66. `2fa generator for amazon` `[AI-主题]`
67. `2fa generator for microsoft authenticator` `[AI-主题]`
68. `base32 totp generator` `[AI-主题]`
69. `otpauth uri generator` `[AI-主题]`
70. `otpauth uri decoder` `[AI-主题]`
71. `scan 2fa qr code online` `[AI-主题]`
72. `import google authenticator qr code online` `[AI-主题]`
73. `generate 2fa secret key` `[AI-主题]`
74. `secure totp secret generator` `[AI-主题]`
75. `totp code verifier online` `[AI-主题]`
76. `test totp code online` `[AI-主题]`
77. `totp time sync checker` `[AI-主题]`
78. `wrong 2fa code time sync` `[AI-主题]`
79. `recover lost 2fa secret key` `[AI-主题]`
80. `totp vs hotp` `[AI-主题]`

### 剔除 / 暂不做

- `Aadhaar TOTP`、`SSS online TOTP`：强平台专属意图，产品无法保证兼容与支持。
- `random 2fa code`：容易让用户误解为可绕过登录；TOTP 不能凭空随机生成有效验证码。
- `Roblox 2FA code generator`：高误导/滥用风险，且真实需求往往是账号恢复。
- `FIDO2/U2F generator`：与 TOTP 是不同协议，不应放在同一个生成器里。
- 语言实现词（Python/Java/npm）：更适合开发文档或代码库，不是首版工具页意图。

## 5. 20 词分层矩阵

| 层级 | 关键词                                                          | 意图            | 首版落点                                 |
| ---- | --------------------------------------------------------------- | --------------- | ---------------------------------------- |
| 核心 | `2fa code generator`                                            | Transactional   | `/` Primary                              |
| 核心 | `totp generator online`                                         | Transactional   | `/` Secondary，不新建同义页              |
| 核心 | `2fa qr code generator online`                                  | Transactional   | Phase 2 独立工具页                       |
| 中尾 | `free online totp generator`                                    | Transactional   | `/` H2 + FAQ                             |
| 中尾 | `2fa verification code generator online`                        | Transactional   | `/` 正文变体                             |
| 中尾 | `bulk 2fa generator`                                            | Transactional   | `/` 功能 H2；先不独立建页                |
| 中尾 | `open source online 2fa code generator`                         | Commercial      | `/security` + 首页信任区；发布仓库后启用 |
| 中尾 | `2fa generator no storage`                                      | Commercial      | `/` 信任区 + FAQ                         |
| 长尾 | `2fa 6 digit code`                                              | Transactional   | `/` 工具结果与说明                       |
| 长尾 | `generate totp code online`                                     | Transactional   | `/` How-to                               |
| 长尾 | `2fa generator no signup`                                       | Transactional   | `/` 首屏证据                             |
| 长尾 | `2fa generator no app`                                          | Transactional   | `/` 首屏 + FAQ                           |
| 长尾 | `multiple 2fa secret keys`                                      | Transactional   | `/` Bulk section                         |
| 长尾 | `copy all 2fa codes`                                            | Transactional   | `/` 实际功能                             |
| 长尾 | `rfc 6238 totp generator online`                                | Developer       | `/` 标准说明；未来 `/security`           |
| 问题 | `how do i get my 2fa code`                                      | Informational   | `/` FAQ                                  |
| 问题 | `how does 2fa code generation work`                             | Informational   | `/` H2 + FAQ                             |
| 问题 | `why does my 2fa code change every 30 seconds`                  | Informational   | `/` FAQ                                  |
| 问题 | `2fa codes not working`                                         | Troubleshooting | `/` FAQ；Phase 2 指南页                  |
| 问题 | `can i use an online generator instead of google authenticator` | Commercial      | `/` FAQ，回答需有安全边界                |

## 6. 10 词 SERP 机会判断

> Google 页面 CAPTCHA 导致广告数量、PAA/PASF 不可见；下表不伪造广告数和“前 10 完整域名”。竞争度为基于可见结果类型、品牌密度和内容深度的定性判断。

| 关键词                                  | 可见结果模式                                  | 竞争判断       | 动作                                               |
| --------------------------------------- | --------------------------------------------- | -------------- | -------------------------------------------------- |
| `2fa code generator`                    | 多个新旧工具站，工具+内容混合                 | 中高           | 首页长期主词；靠产品可信度与品牌，而非薄文案       |
| `online 2fa code generator`             | 与主词高度重合                                | 中高           | 合并到首页，不建第二 URL                           |
| `totp generator online`                 | 工具站、开发者工具、旧式页面并存              | 中             | 首页 Secondary #2；技术说明可胜出                  |
| `bulk 2fa generator`                    | SERP 能找到批量工具，但下拉信号弱             | 中低、低置信度 | 作为首页差异化，等 GSC 后决定是否独立页            |
| `2fa qr code generator online`          | 独立 QR 工具页明显                            | 中             | Phase 2 独立页；与“从 secret 生成 code”输出不同    |
| `2fa secret key generator`              | 搜索容易混入通用 secret/IoT 结果              | 中低           | Phase 2 工具页，但必须强调“new setup”，不用于恢复  |
| `2fa live alternative`                  | 结果分散、混入一般 authenticator alternatives | 低、低置信度   | 产品上线并有公开源码后做诚实比较页                 |
| `open source online 2fa code generator` | 结果混入 App/CLI/自托管项目                   | 中低           | 建 `/security` 实证页，不能只写营销词              |
| `how does 2fa code generation work`     | 社区解释与标准内容                            | 中             | 首页 answer-first 区块；未来深度指南               |
| `2fa codes not working`                 | 社区、厂商支持、SMS 与 TOTP 混杂              | 中             | FAQ 先覆盖时间同步/密钥/算法；未来专门 TOTP 排错页 |

## 7. Top 3 方向

### 1. `2fa code generator` `[SUGGEST][SERP]`

- 角色：Homepage Primary
- 机会：搜索者直接要工具；现有结果在信任、批量效率或视觉上各有明显缺口。
- 页面标题：`2FA Code Generator — Private, Fast, Browser-Only`
- 核心卖点：1–50 行；默认不保存；RFC 6238 兼容。
- CTA：`Generate codes`

### 2. `totp generator online` `[SUGGEST][SERP]`

- 角色：Homepage Secondary #2
- 机会：能补足技术用户与“Google Authenticator online”需求，但与主词同意图。
- 动作：放入 H2、首 100 词与 FAQ；不创建 `/totp-generator`，避免自相竞争。

### 3. `2fa qr code generator online` `[SUGGEST][SERP]`

- 角色：Phase 2 独立工具页
- 机会：输入/输出与首页不同，SERP 也期待专用 QR 工具。
- 动作：支持从 issuer/account/secret 创建标准 `otpauth://` QR；继续保持本地计算和零存储。

## 8. 首页搜索意图与关键词布局

URL：`https://2facode.im/`

- Primary：`2fa code generator` `[SUGGEST][SERP]`
- Core spine：`2fa code`
- #2：`totp generator online` `[SUGGEST][SERP]`
- #3：`free online totp generator` `[SUGGEST]`
- #4：`bulk 2fa generator` `[SERP][竞品]`
- #5：`2fa generator no storage` `[竞品][社区]`
- SERP expectation：Tool + guide hybrid

| Slot            | Phrase / topic                                             | 来源                           |
| --------------- | ---------------------------------------------------------- | ------------------------------ |
| `<title>`       | 2FA Code Generator — Private, Fast, Browser-Only           | `[SUGGEST][SERP]`              |
| Description     | 1–50 TOTP codes、no upload/account/storage、Base32/otpauth | `[产品][竞品]`                 |
| H1              | 2FA Code Generator                                         | `[SUGGEST][SERP]`              |
| First 100 words | primary + TOTP generator online + browser-only             | `[SUGGEST][产品]`              |
| Tool            | one textarea; `Label                                       | SECRET` / Base32 / otpauth URI | `[产品]` |
| H2              | How to generate a 2FA code online                          | `[SUGGEST][竞品]`              |
| H2              | A bulk 2FA generator without the busywork                  | `[SERP][产品]`                 |
| H2              | What “browser-only” actually means                         | `[竞品][社区][产品]`           |
| H2              | Why TOTP codes change every 30 seconds                     | `[竞品][社区]`                 |
| H2              | When a 2FA code does not work                              | `[SUGGEST][社区]`              |
| H2              | 2FA code generator FAQ                                     | `[SUGGEST][竞品]`              |
| Final CTA       | Generate your 2FA codes                                    | `[产品]`                       |

### Secondary → H2 / FAQ 映射

| Rank | Phrase                       | Placement                                                |
| ---- | ---------------------------- | -------------------------------------------------------- |
| #2   | `totp generator online`      | 首段 + H2 “How this online TOTP generator works” + FAQ 4 |
| #3   | `free online totp generator` | 首屏 trust line + FAQ 6                                  |
| #4   | `bulk 2fa generator`         | H2 “A bulk 2FA generator without the busywork” + FAQ 3   |
| #5   | `2fa generator no storage`   | H2 “What browser-only actually means” + FAQ 2            |

## 9. FAQ backlog（12 条）

1. Is it safe to enter my 2FA secret key here? `[竞品][社区]`
2. Does 2FACode store my secret keys or generated codes? `[竞品][产品]`
3. Can I generate multiple 2FA codes at once? `[竞品][产品]`
4. What is a TOTP generator and how does it work? `[SUGGEST][竞品]`
5. Where do I find my 2FA secret key? `[SUGGEST][竞品]`
6. Is this online 2FA code generator free? `[SUGGEST]`
7. Do I need an app or browser extension? `[SUGGEST]`
8. Why does my 2FA code change every 30 seconds? `[竞品][社区]`
9. Why is my 2FA code not working? `[SUGGEST][社区][产品]`
10. Does it work with Google, Microsoft, GitHub, Facebook, and Discord? `[SUGGEST][竞品]`
11. Can this recover a lost secret key or bypass 2FA? `[产品]`
12. Should I use a website instead of a dedicated authenticator app? `[竞品][社区][产品]`

标签统计：`SUGGEST×7`、`竞品×8`、`社区×5`、`产品×6`。全部为非纯 AI 问题。

## 10. 页面信息架构

### Phase 1：只发布必要页面

| URL         | Primary intent                         | Index                          |
| ----------- | -------------------------------------- | ------------------------------ |
| `/`         | 2FA code generator + bulk TOTP         | Yes                            |
| `/security` | 可验证的本地处理、依赖、测试、威胁边界 | Yes，源码仓库就绪后增强        |
| `/about`    | Who / Why / 项目原则                   | Yes                            |
| `/privacy`  | 零存储、零分析、浏览器处理             | Yes                            |
| `/terms`    | 合法使用与责任边界                     | Yes                            |
| `/contact`  | 真实联系渠道                           | 邮箱或 GitHub 就绪后再生成页面 |

### Phase 2：以 GSC 信号决定

| URL                      | Primary intent                  | 上线条件                             |
| ------------------------ | ------------------------------- | ------------------------------------ |
| `/2fa-qr-code-generator` | 从标准参数创建 authenticator QR | 首页稳定、功能测试完成               |
| `/2fa-secret-generator`  | 为新 TOTP setup 生成 secret     | 明确不是恢复工具；安全审查完成       |
| `/2fa-code-not-working`  | TOTP 故障排查                   | GSC 出现足够相关 impressions         |
| `/2fa-live-alternative`  | 竞品替代比较                    | 有真实公开源码、功能对比和使用数据后 |

### 不做的结构

- 不同时创建 `/2fa-code-generator`、`/totp-generator`、`/online-2fa-generator` 三个近义薄页。
- 不批量创建 Facebook/Google/Discord 平台门页；兼容性先放在 FAQ。
- 不用虚假更新时间、评分、用户数、审核徽章或合作伙伴 Logo。

## 11. 首屏与工具工作流

1. 顶部是克制的半透明导航：Brand、How it works、Security、FAQ、Theme。
2. H1 与一句价值说明后立刻进入工具卡，不放装饰性大图阻挡任务。
3. 一个 textarea 同时支持：
   - Base32 secret
   - `Label | BASE32SECRET`
   - `otpauth://totp/...` URI
   - 每行一个，最多 50 行
4. 用户点击 `Generate codes` 后显示：label、掩码后的 secret、6 位 code、30 秒进度、Copy。
5. `Copy all` 只复制 code 或 `label<TAB>code`，不复制 secret。
6. `Clear` 立即清空输入、内存结果和 UI；页面刷新后无持久化数据。
7. 无效行就地显示原因，不把完整 secret 写入错误消息或 console。

## 12. Apple / Tesla 视觉与交互规范

### 情绪目标

让用户感到 **calm、precise、in control**。高级感来自对齐、留白、响应和诚实，不来自渐变堆叠或玻璃拟态滥用。

### 色彩

| Token    | Light                   | Dark                    | 用途                |
| -------- | ----------------------- | ----------------------- | ------------------- |
| Canvas   | `#F5F5F7`               | `#050505`               | 页面背景            |
| Surface  | `rgba(255,255,255,.82)` | `rgba(22,22,23,.82)`    | 工具卡 / 浮层       |
| Text     | `#1D1D1F`               | `#F5F5F7`               | 主文字              |
| Muted    | `#6E6E73`               | `#A1A1A6`               | 说明                |
| Hairline | `rgba(0,0,0,.08)`       | `rgba(255,255,255,.12)` | 边界                |
| Action   | `#0071E3`               | `#2997FF`               | 仅主要 CTA / focus  |
| Success  | `#248A3D`               | `#30D158`               | 本地处理状态        |
| Warning  | `#B25000`               | `#FF9F0A`               | 时间不足 / 输入警告 |

不使用 Tesla red 作为大面积品牌色；红色只保留给错误，避免把安全工具做成警报界面。

### 字体与空间

- 默认系统字体栈；大标题 `clamp(2.4rem, 6vw, 5rem)`、`line-height: .98–1.05`、`letter-spacing: -0.035em`。
- 正文 16–18px，line-height 1.6；小标签略加 tracking。
- 主内容最大宽 1180px；工具本体 880–960px；正文 720px。
- 8px 空间基线，圆角 18–28px；卡片边界比阴影更重要。

### 运动

- 按压反馈在 pointer-down：`scale(.985)`，100ms ease-out。
- 结果出现使用无弹跳的临界阻尼感：opacity + 8px translate，约 300ms。
- code 更新不整块闪烁；只对数字做 120–180ms cross-fade。
- FAQ 展开沿触发点出现，入口与出口路径对称。
- 所有动效支持 `prefers-reduced-motion: reduce`；改为短 cross-fade。
- 不做循环浮动背景、粒子、视差或自动轮播。

### 材质

- Header 可用一层 `backdrop-filter: blur(20px) saturate(160%)`。
- 不在玻璃卡上再叠玻璃卡；主要工具 surface 近实色，确保 secret/code 高对比。
- Sticky header 与内容之间用渐隐 blur edge，不使用重阴影。

## 13. 图片规划

所有图片保持黑、白、中性灰和单一蓝色；资产不烘焙自然语言，caption 与 alt 放 HTML。

| Slot          | File                               | Draft alt                                                               | Loading |
| ------------- | ---------------------------------- | ----------------------------------------------------------------------- | ------- |
| Privacy proof | `/images/browser-only-2fa.svg`     | Browser-only 2FA code generation with no server transfer                | lazy    |
| Bulk workflow | `/images/bulk-2fa-codes.svg`       | Bulk 2FA generator showing multiple masked accounts and six-digit codes | lazy    |
| TOTP timer    | `/images/totp-30-second-cycle.svg` | TOTP generator countdown showing a 30-second code cycle                 | lazy    |
| OG            | `/images/2facode-og.png`           | 2FACode private browser-based 2FA code generator                        | n/a     |

## 14. 安全与产品边界

- TOTP 按 [RFC 6238](https://www.rfc-editor.org/info/rfc6238/) 实现并使用官方测试向量验证。
- 浏览器密码学优先使用 Web Crypto；若使用 `otplib`，锁定版本并将依赖打进静态 bundle，不通过运行时 CDN 加载。
- “client-side”不等于“不会被恶意浏览器扩展、被入侵的设备或未来供应链攻击读取”；安全页必须说明这一点。
- 默认不使用 LocalStorage、SessionStorage、IndexedDB、cookie 或 URL 参数保存 secret。
- 不提供 secret 分享链接、服务端 API、恢复/绕过 2FA、随机有效码等能力。
- 建议用户只在受信任设备和 HTTPS 域名使用；高价值账户的长期 2FA 应放在受信任的专用设备或加密 vault。

## 15. 首版 SEO 验收目标

- Title ≤ 60 chars，Primary 靠前。
- Description ≤ 160 chars。
- Exactly one H1，包含 `2FA Code Generator`。
- 首页 `<main>` 可见英文正文 ≥ 800 words。
- Primary 或 core `2FA code` 密度 3%–5%，以 build 产物测量。
- 12 条研究型 FAQ；visible copy 与 FAQPage schema 一致。
- Schema：`WebSite`、`SoftwareApplication`、`FAQPage`；只写可证实信息。
- 3 张内容图，唯一 alt、固定尺寸、below-fold lazy；OG 使用绝对生产 URL。
- canonical：`https://2facode.im/`；robots 与 sitemap 仅包含真实可索引 URL。
- build 后检查是否存在任何第三方请求、完整 secret 日志或错误泄露。

## 16. 外链与冷启动优先级

1. 先发布真实源码、测试与安全说明，再向 Hacker News、V2EX、Product Hunt 等社区提交；不要先喊“open source”。
2. 为号商/团队提供可复制的迁移文案，但产品表达保持中立，不在站内迎合账号交易语境。
3. 在 README 中提供“断网验证”“Network 面板验证”“RFC 向量测试”三种自证方法。
4. 获取真实使用反馈后，再写 `2fa.live alternative` 对比；只比较可验证功能，不攻击竞品。
5. 站点初期不放 affiliate 广告。先建立“无广告、无追踪”的心智；变现应与隐私承诺分层讨论。

## 17. 仍需项目所有者提供

- 真实 GitHub 仓库 URL：未提供前不发布“Open Source”链接或声明。
- 真实联系邮箱 / security contact：不猜测 `hello@` 或 `security@` 是否已配置。
- 部署平台与 DNS 方案：用于核验 CSP、HTTPS、www/apex、HSTS 与 redirects。
- GSC property：上线后用 impressions 决定 QR、troubleshooting、alternative 页优先级。
