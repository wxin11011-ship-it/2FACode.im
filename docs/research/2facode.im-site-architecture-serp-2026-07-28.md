# 2facode.im 信息架构、竞品与内页规划报告

> - 日期：2026-07-28
> - 市场：英文页面，美国搜索意图优先
> - 范围：当前站点结构、10 组 Google SERP、核心词前十自然结果、100 词候选池、内页与目录规划
> - 结论性质：规划建议，不包含代码修改

## 1. 执行结论

### 1.1 要不要分门别类？

要，但应按**用户任务**分类，不要为了 URL 看起来整齐而机械加目录。

推荐形成三条清晰的产品线：

1. **Tools**：用户带着输入来，马上得到代码、QR、Secret 或验证结果。
2. **Guides**：用户要解决“不工作、怎么理解、怎么选择”等信息问题。
3. **Trust**：Security、Privacy、About、Source、Terms 等信任与政策页面。

首页继续做旗舰工具 `2FA Code Generator`，不迁移到 `/tools/2fa-code-generator`。首页就是全站最重要的 money page，主攻 `2fa code generator` 与 `totp generator online`。

### 1.2 其他工具页要不要统一加 `/tools/`？

**如果确定未来 30–60 天内会扩展到 4 个以上工具，建议统一。** 推荐结构：

```text
/
/tools/
/tools/2fa-qr-code-generator/
/tools/totp-secret-key-generator/
/tools/totp-verifier/
```

当前 `/2fa-qr-code-generator` 已经上线并进入 sitemap。不要只为了美观立即移动；先查 GSC impressions、外链和是否已收录：

- 如果基本无曝光、无外链：现在是低成本迁移窗口，可 301 到 `/tools/2fa-qr-code-generator/`。
- 如果已经有 impressions、排名或外链：保留现有短 URL，分类通过 `/tools/` hub、导航和 Breadcrumb 表达即可。

URL 中多一个 `/tools/` 本身没有可靠的排名加成。它的价值主要是可维护性、用户理解和未来扩展。

### 1.3 是否要加内页？

要，但首批只加真正不同的意图：

1. **TOTP Verifier / Tester**：输入 secret + code，判断该码在当前/相邻时间窗是否有效。
2. **TOTP Secret Key Generator**：生成新的强随机 Base32 secret，并给出 otpauth URI/QR；必须强调“用于新配置，不是恢复旧密钥”。
3. **2FA Code Not Working Guide**：独立故障排查页，聚焦 Authenticator/TOTP，不混入 SMS 收不到的问题。
4. **How TOTP Works**：标准解释与可验证示例，建立主题权威和信任。
5. **TOTP vs HOTP**：比较型指南；与未来 HOTP 支持建立内链。

暂缓 `2fa.live alternative`，不要做 `/totp-generator`、`/bulk-2fa-generator`、`/otpauth-uri-generator` 等重复页面。

## 2. 数据来源与限制

- Google 查询日期：2026-07-28。
- 查询参数：英文、`gl=us`、关闭个性化 `pws=0`、每页 10 条；网络最终落到 Google 香港入口，因此美国用户的实际排序可能有差异。
- 成功读取 10 组 SERP 的自然结果、People Also Ask 和 People Also Search For；没有遇到 CAPTCHA。
- 所有 10 组查询都未发现稳定的付费广告标记，但这不等于该词在所有地区都无广告。
- 没有 Ahrefs/Semrush 精确搜索量、KD、DR 或 backlink 数据；竞争度基于当前 SERP 结构，不伪造流量数字。
- 当前生产 sitemap 可见 8 个 URL：首页、QR 工具、Tools hub、About、Security、Privacy、Terms、Disclaimer。
- 本报告读取了当前源码；旧版 2026-07-24 报告中“QR 页面尚未建立”“Google 被 CAPTCHA”的状态已失效。

## 3. 当前站点架构诊断

### 3.1 当前页面

```text
/
/tools/
/2fa-qr-code-generator/
/about/
/security/
/privacy/
/terms/
/disclaimer/
```

### 3.2 当前做对的地方

- 首页已经是独立旗舰工具，不是纯品牌欢迎页。
- 已有 `Tools` 顶级导航、下拉菜单与 `/tools/` 聚合页。
- QR 页面有独立输入/输出、H1、FAQ、Schema 和 Breadcrumb，不是关键词替换页。
- 首页与 QR 页相互解释“live code”和“secret → QR”两种任务，降低了意图冲突。
- Security、Privacy、Source 和 browser-only 架构形成了真实信任证据。

### 3.3 当前需要调整的地方

1. **只有 Tools，没有 Guides 信息架构。** 故障排查、标准解释继续塞在首页会越来越长。
2. **工具 URL 规则尚未定型。** Tools hub 在 `/tools/`，QR 工具在根目录；现在应确定长期规则。
3. **首页功能已经覆盖 QR 图片解码。** 因此不能再轻率建立 `/2fa-qr-code-scanner`，否则功能与意图重复。
4. **项目许可证是 PolyForm Noncommercial。** 它是 source-available，不是 OSI Open Source；不要建或主攻 `open source 2fa generator` 页面并作不准确声明。
5. **缺少真实 Contact 页面。** 当前有反馈组件和 GitHub Issues，可在联系渠道稳定后补 `/contact/`，但它是信任页，不是流量优先页。

## 4. Google 核心词前十结果逐页分析

查询：`2fa code generator`

| #   | 页面                                                                             | 类型与架构                                                     | 做得好的地方                                     | 可利用的缺口                                                       |
| --- | -------------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------ |
| 1   | [2fa.zone](https://2fa.zone/)                                                    | 泛工具站根页；同页提供 JS/PHP 生成、QR、URL secret             | 精确任务、老域名感、工具在首屏                   | 页面旧、文案杂、把 secret 放进 URL/path，信任与安全边界弱          |
| 2   | [Caleb Evans 2FA Generator](https://projects.calebevans.me/2fa-code-generator/)  | 个人项目子路径；单 secret → code                               | 极简、开源链接清楚、明确不发送/存储              | 内容极薄、无批量、无 QR 输入、无故障与格式说明                     |
| 3   | [2FA-Auth](https://2fa-auth.com/)                                                | 商业站根页；code + share link + Vault + 登录                   | 步骤短、自动刷新、可扩展到账号库                 | 登录/商城/分享 secret 分散主任务，隐私信任弱于本地临时模式         |
| 4   | [2FA Pro](https://2fapro.com/en/)                                                | 多语言 PWA；生成、扫描、保存、历史、HOTP/TOTP、超长指南        | 功能最全、内容深、15+语言、FAQ/兼容性/排错覆盖广 | 首屏与正文过载；保存、分享、历史带来风险；大量平台段落易显得模板化 |
| 5   | [1024Tools 2FA](https://1024tools.com/2fa)                                       | 大型工具目录子页；分类导航 + code + QR + 分享链接              | 强内链网、工具分类成熟、有操作说明和反馈         | 非 2FA 专业品牌；导航噪音大；分享含 secret 的 URL 有明显风险       |
| 6   | [BrowserScan 2FA](https://www.browserscan.net/2fa)                               | 浏览器/指纹工具矩阵子页；支持添加多组 2FA                      | 大站内链、批量入口、工具矩阵和商业变现成熟       | 与 2FA 主题不专一；登录、AdsPower/其他工具分散注意力；内容较泛     |
| 7   | [2FA.cn](https://2fa.cn/)                                                        | 精确域名薄工具；中英混合，存在 iframe                          | 域名记忆强、操作极短                             | 内容薄、iframe/外部依赖降低信任、几乎无安全证据和内页结构          |
| 8   | [Stefan Sundin 2FA QR](https://stefansundin.github.io/2fa-qr/)                   | GitHub Pages 专项工具；QR 解码/生成、Issuer、Advanced、Offline | 精准解决 secret ↔ QR、源码信任、离线、参数完整   | UI/内容偏工程化；不是批量 code 工具；高级配置对小白负担大          |
| 9   | [DICloak 2FA Tool](https://dicloak.com/2fa-authentication-code-generator-online) | 商业产品资源页；工具 + 2FA 科普 + FAQ                          | 借主域权重、工具和内容同页                       | 工具首屏显示 Loading；FAQ 多个问题重复相同答案，内容质量明显不足   |
| 10  | [2FA Generator / chatgpt.org.uk](https://2fa.chatgpt.org.uk/)                    | 专项工具根页；多 generator、QR 图片、Advanced、长指南          | 页面意图完整、支持多账号、表格/FAQ/格式说明深    | 品牌容易混淆；URL secret shortcut 扩大泄漏风险；正文很长           |

### 4.1 前十共同规律

- 10/10 都是可操作工具或工具型页面，纯博客无法满足核心词。
- 工具放首屏是基础门槛；只有 SEO 长文不够。
- 根域专项工具与“大站 `/tools/` 子页”都能排名，说明 URL 是否带 `/tools/` 不是决定因素。
- 排名页的明显分化来自四种资产：老域名、站内工具矩阵、功能深度、源码/隐私信任。
- 多数页面仍存在保存、分享 URL、服务器生成、iframe 或广告/商业导航等信任缺口。
- `2facode.im` 应坚持：临时会话、批量效率、源码可审计、风险说明准确，而不是跟随竞品堆保存和分享功能。

## 5. 10 组 SERP 详细判断

竞争分数为 25 分制：分数越高越难。评分结合广告、高权重域、结果意图、视频/摘要占位和内容深度。

| 查询                        | 当前 SERP 主体                                       | PAA / PASF 信号                                                          | 竞争                 | 页面决策                                        |
| --------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------ | -------------------- | ----------------------------------------------- |
| `2fa code generator`        | 10 个工具页，新旧专项站和工具目录混合                | PAA：如何生成、6 位码、哪里取 TOTP；PASF：free、Instagram、app、2FA Live | 11/25 🟡             | 首页唯一主词，不建同义页                        |
| `totp generator online`     | 专项工具、GitHub、Reddit、Authgear、npm 混合         | PASF：free、GitHub、Reddit、Google、QR                                   | 12/25 🟡             | 首页 secondary intent，不建 `/totp-generator`   |
| `bulk 2fa generator`        | 结果严重混杂：App、扩展、QR、Namecheap、密码生成     | PASF 有 `free bulk 2fa generator`，但精准工具稀少                        | 7/25 🟢低竞争/低稳定 | 强化首页 bulk 模块；先看 GSC 再决定独立页       |
| `2fa qr code generator`     | GitHub QR 工具、OTP QR、Google/Microsoft、通用 QR 站 | PAA：如何获得 QR；PASF：free、scanner、TOTP QR                           | 12/25 🟡             | 已有页面，继续做专用工具                        |
| `2fa secret key generator`  | RandomKeygen、TOTP 工具、Google thread、QR 工具      | PAA：如何创建 2FA/TOTP key                                               | 9/25 🟢              | 新工具页优先级 #2                               |
| `otpauth uri generator`     | GitHub、IETF、Google Wiki、Yubico、QR 工具           | PASF：free、GitHub、QR、otpauth URL/TOTP                                 | 10/25 🟢             | 并入 QR 页面，不单独建页                        |
| `totp verifier online`      | Authgear、Verifyr、GitHub、小工具与 App 混合         | PAA：如何验证、哪里检查；PASF：OTP checker                               | 8/25 🟢              | 新工具页优先级 #1                               |
| `2fa live alternative`      | 2FA 工具、Ahrefs、一般“替代 2FA”文章混合             | PAA 意图混杂；PASF 多为 2FA Live 品牌导航                                | 8/25 🟢/低稳定       | 等品牌和 GSC 信号后再做比较页                   |
| `open source 2fa generator` | Proton、2FAS、Aegis、FreeOTP、Reddit                 | 意图明显偏开源 Authenticator App                                         | 16/25 🔴意图不匹配   | 不建；Security 页面用 source-available 准确承接 |
| `2fa code not working`      | 厂商支持、Google/Microsoft、视频与 SMS 问题混合      | PAA：invalid/failing；PASF：Android/iPhone/Facebook/SMS                  | 17/25 🔴但需求强     | 建窄意图 TOTP 排错指南，避开 SMS 大词           |

## 6. 100 个候选关键词树

来源：`[SERP]` 当前查询/结果；`[PASF]` Google People Also Search For；`[Q]` People Also Ask；`[竞品]` 前十页面；`[AI-主题]` 仅主题扩展，未验证搜索需求。

|   # | 关键词                                                | 来源与深度        | 推荐落点                           |
| --: | ----------------------------------------------------- | ----------------- | ---------------------------------- |
|   1 | 2fa code generator                                    | `[SERP\|depth=0]` | 首页 Primary                       |
|   2 | 2fa code generator free                               | `[PASF\|depth=1]` | 首页                               |
|   3 | 2FA Live code                                         | `[PASF\|depth=1]` | 未来比较页/品牌词                  |
|   4 | 2fa code generator instagram                          | `[PASF\|depth=1]` | 暂不建平台薄页                     |
|   5 | 2FA live login                                        | `[PASF\|depth=1]` | 不承接导航型误意图                 |
|   6 | 2FA code generator app                                | `[PASF\|depth=1]` | 首页 FAQ                           |
|   7 | 2FA Authenticator                                     | `[PASF\|depth=1]` | 首页/指南                          |
|   8 | 2FA online code                                       | `[PASF\|depth=1]` | 首页                               |
|   9 | how to generate a 2FA code                            | `[Q\|depth=1]`    | 首页 how-to                        |
|  10 | best free 2FA app                                     | `[Q\|depth=1]`    | 暂不做评测                         |
|  11 | 6 digit 2FA code                                      | `[Q\|depth=1]`    | 首页 FAQ                           |
|  12 | where do I get a TOTP code                            | `[Q\|depth=1]`    | 指南/FAQ                           |
|  13 | totp generator online                                 | `[SERP\|depth=0]` | 首页 Secondary                     |
|  14 | free totp generator online                            | `[PASF\|depth=1]` | 首页                               |
|  15 | totp generator online reddit                          | `[PASF\|depth=1]` | 外链/社区信任信号                  |
|  16 | totp generator online github                          | `[PASF\|depth=1]` | Security/Source                    |
|  17 | Google TOTP generator                                 | `[PASF\|depth=1]` | 首页兼容说明                       |
|  18 | TOTP QR code generator                                | `[PASF\|depth=1]` | QR 工具                            |
|  19 | TOTP app                                              | `[PASF\|depth=1]` | 不建同义页                         |
|  20 | TOTP online                                           | `[PASF\|depth=1]` | 首页                               |
|  21 | how to create TOTP                                    | `[Q\|depth=1]`    | Secret 工具/指南                   |
|  22 | is Google TOTP free                                   | `[Q\|depth=1]`    | FAQ                                |
|  23 | simple TOTP generator                                 | `[Q\|depth=1]`    | 首页定位                           |
|  24 | is TOTP authenticator free                            | `[Q\|depth=1]`    | FAQ                                |
|  25 | bulk 2fa generator                                    | `[SERP\|depth=0]` | 首页 Bulk H2                       |
|  26 | free bulk 2fa generator                               | `[PASF\|depth=1]` | 首页 Bulk H2                       |
|  27 | bulk 2fa generator instagram                          | `[PASF\|depth=1]` | 暂不做平台页                       |
|  28 | 2FA key generator                                     | `[PASF\|depth=1]` | Secret 工具                        |
|  29 | 2FA QR code generator online                          | `[PASF\|depth=1]` | QR 工具                            |
|  30 | can multiple people use the same 2FA                  | `[Q\|depth=1]`    | 安全指南/FAQ                       |
|  31 | popular tools for bulk 2FA management                 | `[SERP\|depth=1]` | 首页/未来管理产品，不建当前页      |
|  32 | multiple 2fa secret keys                              | `[竞品\|depth=1]` | 首页 Bulk                          |
|  33 | copy all 2fa codes                                    | `[竞品\|depth=1]` | 首页功能                           |
|  34 | batch totp generator                                  | `[AI-主题]`       | GSC 验证后决定                     |
|  35 | mass 2fa code generator                               | `[AI-主题]`       | GSC 验证后决定                     |
|  36 | multi account 2fa generator                           | `[AI-主题]`       | 首页功能，不建页                   |
|  37 | 2fa qr code generator                                 | `[SERP\|depth=0]` | QR 工具 Primary                    |
|  38 | 2fa qr code generator free                            | `[PASF\|depth=1]` | QR 工具                            |
|  39 | 2fa qr code generator google                          | `[PASF\|depth=1]` | QR FAQ/兼容性                      |
|  40 | 2FA QR code scanner                                   | `[PASF\|depth=1]` | 首页已有 QR 上传，不建重复页       |
|  41 | 2fa qr code generator apk                             | `[PASF\|depth=1]` | 不匹配 Web 工具                    |
|  42 | 2FA QR code generator online                          | `[PASF\|depth=1]` | QR 工具                            |
|  43 | TOTP QR code generator online                         | `[PASF\|depth=1]` | QR 工具                            |
|  44 | how to get a 2FA QR code                              | `[Q\|depth=1]`    | QR FAQ                             |
|  45 | QR scanner decode 2FA                                 | `[竞品\|depth=1]` | 首页上传功能                       |
|  46 | generate QR from secret key                           | `[竞品\|depth=1]` | QR 工具                            |
|  47 | 2fa secret key generator                              | `[SERP\|depth=0]` | 新 Secret 工具 Primary             |
|  48 | 2fa secret key generator google                       | `[PASF\|depth=1]` | Secret FAQ                         |
|  49 | TOTP secret key generator                             | `[PASF\|depth=1]` | Secret 工具 Secondary              |
|  50 | how to create a 2FA key                               | `[Q\|depth=1]`    | Secret 工具 how-to                 |
|  51 | how to generate a TOTP key                            | `[Q\|depth=1]`    | Secret 工具 how-to                 |
|  52 | what is a 2FA secret key TOTP                         | `[Q\|depth=1]`    | Secret FAQ                         |
|  53 | what is the 2FAS secret key                           | `[Q\|depth=1]`    | 不做品牌支持页                     |
|  54 | secure totp secret generator                          | `[AI-主题]`       | Secret 工具                        |
|  55 | random base32 totp secret                             | `[AI-主题]`       | Secret 工具                        |
|  56 | create new TOTP secret                                | `[AI-主题]`       | Secret 工具                        |
|  57 | otpauth uri generator                                 | `[SERP\|depth=0]` | QR 工具 Secondary                  |
|  58 | otpauth uri generator free                            | `[PASF\|depth=1]` | QR 工具                            |
|  59 | otpauth uri generator google                          | `[PASF\|depth=1]` | QR FAQ                             |
|  60 | otpauth uri generator github                          | `[PASF\|depth=1]` | QR + Source                        |
|  61 | otpauth URL                                           | `[PASF\|depth=1]` | QR 指南区                          |
|  62 | otpauth TOTP                                          | `[PASF\|depth=1]` | QR 指南区                          |
|  63 | Key URI Format Google Authenticator                   | `[SERP\|depth=1]` | How TOTP works/QR                  |
|  64 | TOTP Key URI Format                                   | `[SERP\|depth=1]` | How TOTP works/QR                  |
|  65 | totp verifier online                                  | `[SERP\|depth=0]` | 新 Verifier Primary                |
|  66 | totp verifier online login                            | `[PASF\|depth=1]` | 不承接登录导航意图                 |
|  67 | totp verifier online app                              | `[PASF\|depth=1]` | Verifier                           |
|  68 | OTP checker online free                               | `[PASF\|depth=1]` | Verifier，文案限定 TOTP            |
|  69 | how to verify TOTP                                    | `[Q\|depth=1]`    | Verifier how-to                    |
|  70 | how to get OTP verification code online               | `[Q\|depth=1]`    | 首页/Verifier，谨防 SMS 意图       |
|  71 | where to check TOTP                                   | `[Q\|depth=1]`    | Verifier                           |
|  72 | test totp code online                                 | `[AI-主题]`       | Verifier                           |
|  73 | TOTP authentication challenge                         | `[SERP\|depth=1]` | Verifier/开发测试                  |
|  74 | 2fa live alternative                                  | `[SERP\|depth=0]` | 未来比较页                         |
|  75 | 2FA live paste                                        | `[PASF\|depth=1]` | 未来比较页/品牌导航                |
|  76 | 2FA live Twitter                                      | `[PASF\|depth=1]` | 不做平台薄页                       |
|  77 | 2FA live email                                        | `[PASF\|depth=1]` | 不做平台薄页                       |
|  78 | 2FA live fb                                           | `[PASF\|depth=1]` | 不做平台薄页                       |
|  79 | what is 2FA live                                      | `[Q\|depth=1]`    | 比较页 FAQ                         |
|  80 | what to use instead of 2FA                            | `[Q\|depth=1]`    | 意图不匹配，剔除                   |
|  81 | safe alternative to 2fa live                          | `[AI-主题]`       | 未来比较页                         |
|  82 | ad free 2fa generator                                 | `[AI-主题]`       | 首页卖点                           |
|  83 | open source 2fa generator                             | `[SERP\|depth=0]` | 不建：许可证不匹配                 |
|  84 | open source 2fa generator github                      | `[PASF\|depth=1]` | Source，可用 source-available 表达 |
|  85 | open source 2fa generator android                     | `[PASF\|depth=1]` | App 意图，不匹配                   |
|  86 | open source 2FA server                                | `[PASF\|depth=1]` | Server 意图，不匹配                |
|  87 | 2FA open source app                                   | `[PASF\|depth=1]` | App 意图，不匹配                   |
|  88 | source available 2fa generator                        | `[AI-主题][产品]` | Security/Source，不主攻流量        |
|  89 | 2fa code not working                                  | `[SERP\|depth=0]` | 新排错指南 Primary                 |
|  90 | why is my 2FA code invalid                            | `[Q\|depth=1]`    | 排错指南                           |
|  91 | why is two-factor authentication failing              | `[Q\|depth=1]`    | 排错指南                           |
|  92 | 2fa code not working android                          | `[PASF\|depth=1]` | 排错指南                           |
|  93 | Google Authenticator code not working for Facebook    | `[PASF\|depth=1]` | 暂不做平台页                       |
|  94 | Google Authenticator not working iPhone               | `[PASF\|depth=1]` | 排错指南小节                       |
|  95 | not receiving two-factor authentication codes via SMS | `[PASF\|depth=1]` | 明确排除，非本工具能力             |
|  96 | Google Authenticator not showing codes on new phone   | `[PASF\|depth=1]` | 排错指南                           |
|  97 | Google Authenticator codes not working Android        | `[PASF\|depth=1]` | 排错指南                           |
|  98 | time sync 2fa code                                    | `[竞品\|depth=1]` | 排错指南/Verifier                  |
|  99 | why does my 2FA code change every 30 seconds          | `[竞品\|depth=1]` | How TOTP works                     |
| 100 | TOTP vs HOTP                                          | `[竞品][AI-主题]` | 比较指南                           |

## 7. 20 词页面分层矩阵

| 关键词                        | 意图                  | 推荐页面        | 是否独立 URL           |
| ----------------------------- | --------------------- | --------------- | ---------------------- |
| 2fa code generator            | Generator             | `/`             | 已有，唯一主页面       |
| totp generator online         | Generator             | `/`             | 否，同意图合并         |
| bulk 2fa generator            | Bulk generator        | `/`             | 暂否，等 GSC           |
| 2fa code generator free       | Generator             | `/`             | 否                     |
| 2FA QR code generator         | QR generator          | QR 工具         | 已有                   |
| TOTP QR code generator online | QR generator          | QR 工具         | 否，同页 secondary     |
| otpauth uri generator         | URI generator         | QR 工具         | 否，输出已经存在       |
| generate QR from secret key   | QR generator          | QR 工具         | 否                     |
| TOTP verifier online          | Checker               | Verifier 工具   | **是，P1**             |
| OTP checker online free       | Checker               | Verifier 工具   | 否，同页 secondary     |
| test TOTP code online         | Checker               | Verifier 工具   | 否，同页 secondary     |
| 2FA secret key generator      | Generator             | Secret 工具     | **是，P1**             |
| TOTP secret key generator     | Generator             | Secret 工具     | 否，同页 secondary     |
| how to generate a TOTP key    | Informational + tool  | Secret 工具     | 否                     |
| 2FA code not working          | Troubleshooting       | 排错指南        | **是，P1**             |
| why is my 2FA code invalid    | Troubleshooting       | 排错指南        | 否                     |
| how TOTP works                | Informational         | TOTP 指南       | **是，P2**             |
| TOTP vs HOTP                  | Comparison            | 比较指南        | **是，P2**             |
| 2FA Live alternative          | Commercial comparison | 比较页          | P3，先等待             |
| open source 2FA generator     | App/source research   | Security/Source | 不建，意图和许可不匹配 |

## 8. 推荐的信息架构

### 8.1 目标结构

```text
2FACode.im
├── /                                  # Flagship: 2FA Code Generator + bulk + QR upload
├── /tools/                            # 工具聚合页
│   ├── /tools/2fa-qr-code-generator/  # 可选迁移；secret/URI → QR/PNG
│   ├── /tools/totp-verifier/           # secret + code → valid/invalid
│   └── /tools/totp-secret-key-generator/ # 新 secret + URI + QR
├── /guides/                           # 至少 3 篇时建立可索引 hub
│   ├── /guides/2fa-code-not-working/
│   ├── /guides/how-totp-works/
│   └── /guides/totp-vs-hotp/
├── /security/                         # Trust hub
├── /about/
├── /contact/                          # 有真实渠道后建立
├── /privacy/
├── /terms/
└── /disclaimer/
```

### 8.2 Header 建议

```text
Logo | Tools ▼ | Guides | Security | GitHub | Theme | Feedback
```

- 当前只有 0–1 篇指南时，不要放空的 Guides 下拉。
- 有 2 篇指南时可放单一 `Guides` 链接。
- 有 3–5 篇后再做 Guides hub 和下拉。
- About、Privacy、Terms、Disclaimer 继续放 footer，不要挤占主导航。

### 8.3 Tools hub 如何分类

现在只有 2 个工具，先保持平铺。达到 4 个后再分两组：

**Generate**

- 2FA Code Generator（首页）
- 2FA QR Code Generator
- TOTP Secret Key Generator

**Test & Inspect**

- TOTP Verifier

不要在只有两个卡片时制造空分类标题。

## 9. 新内页规格与优先级

### P1-1：TOTP Verifier

| 字段    | 建议                                                       |
| ------- | ---------------------------------------------------------- |
| URL     | `/tools/totp-verifier/` 或保持根级规则时 `/totp-verifier/` |
| Primary | `totp verifier online`                                     |
| H1      | `TOTP Verifier`                                            |
| 输入    | Base32 secret / otpauth URI + candidate code               |
| 输出    | Valid / Invalid；当前、前一、后一时间窗；不回显完整 secret |
| 独特性  | 不是生成另一个 code，而是验证给定 code 与 secret 是否匹配  |
| 内容    | time window、clock drift、RFC 6238、开发测试示例           |
| 内链    | 首页、排错指南、Security                                   |
| 风险    | 不宣传为“验证任何账号”；必须拥有/获授权使用 secret         |

### P1-2：TOTP Secret Key Generator

| 字段    | 建议                                                  |
| ------- | ----------------------------------------------------- |
| URL     | `/tools/totp-secret-key-generator/`                   |
| Primary | `2fa secret key generator`                            |
| H1      | `TOTP Secret Key Generator`                           |
| 输入    | issuer/account、算法/位数/周期（高级选项）            |
| 输出    | 强随机 Base32 secret、otpauth URI、QR、复制/下载      |
| 独特性  | 创建新的 enrollment material；不是从账号恢复旧 secret |
| 内容    | entropy、Base32、如何在自己的应用/测试环境启用        |
| 内链    | QR generator、Verifier、How TOTP Works                |
| 风险    | 禁止“找回 Facebook/Google 密钥”式误导；默认不存储     |

### P1-3：2FA Code Not Working Guide

| 字段     | 建议                                                                       |
| -------- | -------------------------------------------------------------------------- |
| URL      | `/guides/2fa-code-not-working/`                                            |
| Primary  | `2fa code not working` 的 TOTP 子意图                                      |
| H1       | `Why Is My Authenticator Code Not Working?`                                |
| 页面类型 | Answer-first troubleshooting guide                                         |
| 核心流程 | 自动时间 → 等新窗口 → 核对 secret → 核对算法/位数/周期 → provider recovery |
| 工具连接 | CTA 到 Verifier 与首页 generator                                           |
| 排除     | SMS 收不到、绕过 2FA、恢复未知 secret                                      |
| 竞争策略 | 不和 Google/Microsoft 支持页拼所有平台；专注 TOTP clock/secret/config      |

### P2-1：How TOTP Works

- URL：`/guides/how-totp-works/`
- Primary：`how does TOTP work` / `how to generate a 2FA code`
- 内容：secret、Unix time、30 秒窗口、HMAC、dynamic truncation、6 位输出、RFC 6238 test vector。
- 增加一个使用公开测试 secret 的交互演示，不接收真实账号 secret。
- 内链到首页、Verifier、Secret Generator、Security。

### P2-2：TOTP vs HOTP

- URL：`/guides/totp-vs-hotp/`
- Primary：`totp vs hotp`
- 内容：时间 vs counter、兼容性、恢复、漂移、常见使用场景、安全边界。
- 当前产品不支持 HOTP 时必须明确，不要让比较页暗示已有功能。

### P3：2FA Live Alternative

满足以下条件再发布：

- GSC 已出现 `2fa live alternative` / `2fa live` 相关 impressions；或已有真实用户从竞品迁移。
- 比较表只写可验证事实：是否批量、是否本地计算、是否源码可见、是否保存/分享 secret、是否广告。
- 使用 `source-available`，不要写 `open source`。
- 不猜测对手偷 secret，不写无法举证的安全指控。

## 10. 明确不要建立的页面

| 页面想法                                   | 不做原因                                         | 正确承接                       |
| ------------------------------------------ | ------------------------------------------------ | ------------------------------ |
| `/totp-generator/`                         | 与首页同一输入、输出和意图，造成 cannibalization | 首页                           |
| `/online-2fa-code-generator/`              | 纯同义词页                                       | 首页                           |
| `/bulk-2fa-generator/`                     | 当前会复制首页工具；SERP 还不稳定                | 首页 Bulk H2 + 等 GSC          |
| `/otpauth-uri-generator/`                  | QR 页已经输出 otpauth URI                        | QR 工具 H2/FAQ                 |
| `/2fa-qr-code-scanner/`                    | 首页已经支持上传 QR screenshot 并生成 codes      | 首页功能区；除非未来拆分产品   |
| `/open-source-2fa-generator/`              | 搜索意图偏 App，且当前许可证不是 OSI 开源        | Security/Source                |
| `/facebook-2fa-code-generator/` 等平台矩阵 | 工具相同、内容容易薄且带来品牌/滥用风险          | 首页兼容性 + 指南小节          |
| `/recover-2fa-secret/`                     | 产品无法恢复未知 secret，容易误导                | 排错指南说明 recovery boundary |
| `/random-2fa-code/`                        | 有效码不能随机猜出，存在绕过暗示                 | 不承接                         |

## 11. 内链模型

```text
Homepage
  ├─ Tools hub
  ├─ QR Generator
  ├─ TOTP Verifier
  ├─ Secret Key Generator
  └─ Security

QR Generator
  ├─ Homepage (need live codes)
  ├─ Secret Key Generator (need a new secret)
  └─ How TOTP Works

TOTP Verifier
  ├─ Homepage (generate current code)
  ├─ 2FA Code Not Working
  └─ Security

2FA Code Not Working
  ├─ TOTP Verifier
  ├─ Homepage
  └─ Provider recovery boundary
```

每个新工具页都应该被 `/tools/`、首页相关区块和至少一个相邻工具链接；每个指南页至少从一个工具页与 Guides hub 进入，避免 orphan pages。

## 12. 90 天执行顺序

### 第 0 阶段：先定规则（现在）

1. 查 GSC：QR 旧 URL 是否有 impressions/links。
2. 决定“非首页工具统一 `/tools/`”还是“所有工具保持短根级 URL”。
3. 规则一旦选定，写入页面模板与 sitemap 测试，不再混用。

### 第 1 阶段：2–3 周

1. 建 TOTP Verifier。
2. 建 2FA Code Not Working 指南。
3. 在首页加入紧凑 Related tools / Troubleshooting 内链，不改首页核心意图。

### 第 2 阶段：第 4–6 周

1. 建 TOTP Secret Key Generator。
2. Tools hub 达到 4 个条目后分 Generate / Test & Inspect。
3. 建 Guides hub（至少 2–3 篇内容再上线）。

### 第 3 阶段：第 7–12 周

1. 建 How TOTP Works 与 TOTP vs HOTP。
2. 用 GSC impressions 判断是否需要 Bulk 独立页；没有真实信号就继续留首页。
3. 只有在品牌查询出现后才评估 2FA Live Alternative。

## 13. 页面质量门槛

每个新工具页必须同时满足：

- 独立的 job-to-be-done、输入、输出或默认状态。
- 工具在首屏；移动端先输入后结果。
- 唯一 title、description、H1、intro、示例、FAQ 和 Schema。
- 150–300 字可见解释 + 600–1,200 字指南内容（可折叠）+ 5–8 个真实 FAQ。
- BreadcrumbList；工具页使用 SoftwareApplication；可见 FAQ 与 FAQPage 一致。
- 不把 secret 写进 path/query、LocalStorage、analytics 或日志。
- 与首页及相邻工具建立自然内链。
- 构建后检查 canonical、sitemap、redirect、title 长度、重复 H1/FAQ 和 CSP。

## 14. 最终建议

**推荐采用：旗舰首页 + Tools 集群 + Guides 集群 + Trust 根级页。**

最重要的不是把所有页面都放进 `/tools/`，而是保持：

- 一个意图只有一个主 URL。
- 一个工具页必须完成不同任务。
- 信息型需求不污染 Tools。
- 安全与许可声明必须可验证、准确。

首批真正值得开发的三个内页是：

1. `/tools/totp-verifier/`
2. `/tools/totp-secret-key-generator/`
3. `/guides/2fa-code-not-working/`

首页、现有 QR 页和这三个页面足以形成第一版可持续内链闭环；在此之前不需要为了“页面数量”批量生产平台词或同义词页。

## 15. M01–M11 新工具页执行版（2026-07-28 补充）

### 15.1 实时研究补充

- Google Suggest seeds：`totp verifier online`、`verify totp code`、`totp code checker`、`totp secret key generator`、`2fa secret key generator`、`generate totp secret`。
- Verifier 下拉信号：`totp tester online`、`totp validator online`、`test totp code`、`failed to verify totp code`、`what is a totp` `[SUGGEST]`。
- Secret 下拉信号：`create totp secret`、`generate totp secret key`、`totp secret key length`、`generate qr code from totp secret`、`how to generate totp` `[SUGGEST]`。
- 复核竞品：Authgear TOTP Authenticator、Go Tools TOTP Generator、RandomKeygen TOTP Secret Key Generator、TestMu TOTP Generator。共同模式是首屏工具、可调算法/位数/周期、RFC 6238 解释、排错和 FAQ；主要缺口是多个任务挤在同一页、商业导航干扰、保存 secret 或错误地把临时工具包装成账号恢复方案。
- GSC：全局配置中没有 `2facode.im`，因此本轮无法用真实 impressions 排序，也不迁移已有 QR URL。

### 15.2 `/totp-verifier` 意图与落点

- Primary：`totp verifier online` `[SERP]`
- Core：`TOTP verifier`
- #2：`totp validator online` `[SUGGEST]` → M04 对比 + FAQ
- #3：`test TOTP code` `[SUGGEST]` → M05 How To + M08 Use Cases
- #4：`failed to verify TOTP code` `[SUGGEST]` → M07 Pro Tips + FAQ
- Cannibalization：不建立 `totp tester`、`totp validator`、`otp checker` 同义薄页；全部归入本页。页面只验证用户提供的 secret 与 candidate code，不替代首页的 live-code generator。

| 模块 | 页面落点                                                                               |
| ---- | -------------------------------------------------------------------------------------- |
| M01  | Tools 下拉 + Tools hub；Breadcrumb 为 Tools → TOTP Verifier                            |
| M02  | 单一 H1、短价值句、Browser-only / No storage / ±1 window 标签、可直接验证的表单        |
| M03  | 四个真实能力：Base32/URI、6–8 digits、SHA variants、clock window；一张本地验证流程图   |
| M04  | 定义 verifier，区别 generator，支持的 secret/URI/算法/位数/周期，链接首页/Secret/Guide |
| M05  | 输入 secret → 输入 code → 查看结果；三张语言中立步骤图 + HowTo Schema                  |
| M06  | 本地计算、明确窗口、参数一致性、无账号/无保存                                          |
| M07  | 时间同步、使用新 code、检查 URI 参数、禁止把验证失败当作恢复入口                       |
| M08  | 开发测试、QA、迁移检查、时钟漂移排查四个场景                                           |
| M09  | 10 个调研/产品型问题 + 可见内容一致的 FAQPage Schema                                   |
| M10  | 回到 verifier 表单                                                                     |
| M11  | Tools、Guides、Trust；多语言仅保留未来 IA，不链接未上线 locale                         |

### 15.3 `/totp-secret-key-generator` 意图与落点

- Primary：`2fa secret key generator` `[SERP]`
- Core：`secret key generator`
- #2：`TOTP secret key generator` `[SUGGEST][PASF]` → M04 定义 + FAQ
- #3：`generate TOTP secret key` `[SUGGEST]` → M05 How To
- #4：`TOTP secret key length` `[SUGGEST]` → M07 Pro Tips + FAQ
- #5：`generate QR code from TOTP secret` `[SUGGEST]` → 工具输出 + M08 场景
- Cannibalization：不建立 `generate TOTP key`、`create TOTP secret` 同义页；不和 QR 页面争夺“已有 secret → QR”的意图。本页从强随机数开始创建新的 enrollment material。

| 模块 | 页面落点                                                                               |
| ---- | -------------------------------------------------------------------------------------- |
| M01  | Tools 下拉 + Generate 分类；Breadcrumb 为 Tools → TOTP Secret Key Generator            |
| M02  | 单一 H1、用途边界、Browser crypto / 160-bit / No storage 标签、直接生成按钮            |
| M03  | 四个真实能力：Web Crypto、Base32、otpauth URI、QR/PNG；一张 enrollment 输出图          |
| M04  | 定义 secret key，区别 code generator/QR generator/recovery，支持格式与相关工具         |
| M05  | 填写标签 → 生成 160-bit secret → 扫描并在服务端确认；三张语言中立步骤图 + HowTo Schema |
| M06  | 强随机、一次性工作区、参数透明、复制/下载完整                                          |
| M07  | 每账号独立、生产端加密存储、保持默认兼容参数、生成后立即验证、不能恢复旧 key           |
| M08  | 新应用 enrollment、测试环境、内部工具、离线交接四个场景                                |
| M09  | 10 个调研/产品型问题 + 可见内容一致的 FAQPage Schema                                   |
| M10  | 回到 generator 表单                                                                    |
| M11  | Tools、Guides、Trust；多语言等完整 locale 上线后再加真实切换器/hreflang                |

### 15.4 图片规划

两页各使用一张功能流程图和三张步骤图，均为站点黑/白/中性灰 + Apple blue 的语言中立 SVG；自然语言标题、说明和 alt 留在 HTML。图片设置固定尺寸，首屏不放大图，全部位于工具下方并 lazy-load，避免增加 LCP。
