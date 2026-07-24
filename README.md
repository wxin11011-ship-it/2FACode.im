# 2FACode

`2facode.im` 是一个静态、浏览器本地运行的 2FA / TOTP code generator。它支持单个 Base32 secret、带标签的批量输入和标准 `otpauth://totp` URI，默认不保存任何 secret 或生成结果。

- 网站：`https://2facode.im`
- 源码：<https://github.com/wxin11011-ship-it/2FACode.im>

## 当前能力

- 一次处理 1–50 个 TOTP 条目
- 支持 `BASE32SECRET`、`Label | BASE32SECRET` 和 `otpauth://totp/...`
- 支持 SHA-1 / SHA-256 / SHA-512、6–8 位、15–120 秒周期
- 自动刷新验证码和倒计时
- 单个复制、Copy all、Clear workspace
- 不使用生成 API、analytics、广告脚本或 secret storage
- Web Crypto 优先，Noble 纯 JavaScript 加密实现作为兼容兜底
- RFC 6238 测试向量和输入边界测试

## 技术栈

- Astro 7 + Tailwind CSS 3
- `otplib` 13
- `@otplib/plugin-crypto-web`
- `@otplib/plugin-crypto-noble`
- `@otplib/plugin-base32-scure`
- Node 内置 test runner

第三方包在构建时打入静态资源，不从运行时 CDN 加载。

## 本地开发

需要 Node 22.12+ 和 pnpm。

```bash
pnpm install --frozen-lockfile
pnpm dev
```

本地开发地址默认为 `http://localhost:4321`。

## 验证

```bash
pnpm test
pnpm check
pnpm build
```

`pnpm build` 完成静态构建后会自动执行 `postbuild`：从最终 HTML 计算所有内联 script/style 的 SHA-256，并把不含 `unsafe-inline` 的 Content Security Policy 写入 `dist/_headers`。如果产物出现 inline event handler 或 `style=` 属性，构建会失败而不是静默放宽 CSP。

SEO build 产物可以使用仓库外的 `seo-audit` 度量脚本检查：

```bash
node ~/.agents/skills/seo-audit/scripts/measure-seo-page.mjs \
  dist/index.html \
  --primary "2fa code generator" \
  --core "2fa code"
```

## 输入格式

每行一个条目，最多 50 行：

```text
GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ
Work | GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ
otpauth://totp/Example:account?secret=...
```

为符合 RFC 4226 / 6238 的最低 secret 强度，Base32 secret 解码后至少需要 128 bits；对应未填充的 Base32 通常至少 26 个字符。

## 隐私与安全边界

正常生成流程不会把 secret 发送给服务器，也不会写入 LocalStorage、SessionStorage、IndexedDB、cookie、URL 或 console。主题选择可能单独保存在 LocalStorage，但不包含认证数据。

浏览器本地计算不等于绝对安全。被入侵的设备、恶意浏览器扩展、仿冒域名、屏幕/剪贴板监控或被篡改的未来构建仍可能读取输入。高价值账户的长期 secret 应保存在可信 authenticator、硬件方案或加密 vault 中。

详细说明见 [`src/pages/security.md`](src/pages/security.md) 和 [`src/pages/privacy.md`](src/pages/privacy.md)。

## 源码许可

代码公开用于安全审查、学习、研究和其他非商业用途，采用 [PolyForm Noncommercial License 1.0.0](LICENSE)。商业使用不在许可范围内。本项目因此是 source-available（源码可用），不是 OSI 定义的开源软件。

## 目录重点

```text
src/components/TwoFactorTool.astro  # 工具 UI 与浏览器交互
src/scripts/totp.mjs                # 输入解析、后端选择、TOTP 生成
test/totp.test.mjs                  # RFC 和输入边界测试
src/pages/index.astro               # 首页、FAQ、Schema
docs/research/                      # SERP、关键词和页面规划
public/_headers                     # Cloudflare / Netlify 基线安全响应头
scripts/generate-csp-headers.mjs    # 最终 HTML hash CSP 生成与验证
vercel.json                         # Vercel 基线响应头；不包含宽松 CSP
```

## 发布前待办

- 确认部署平台、HTTPS、apex/www redirect 和 HSTS
- 如果选择 Vercel，为最终产物配置等价的动态 hash CSP；不要回退到 `unsafe-inline`
- 接入 Google Search Console 后，用 impressions 决定下一批页面

网站不会发布猜测的邮箱、评分、用户数或安全审计徽章。普通反馈请使用 [GitHub Issues](https://github.com/wxin11011-ship-it/2FACode.im/issues)；敏感安全问题请使用 [GitHub Private Vulnerability Reporting](https://github.com/wxin11011-ship-it/2FACode.im/security/advisories/new)，并且不要提交真实认证信息。

## 参与贡献

提交改动前请阅读 [`CONTRIBUTING.md`](CONTRIBUTING.md)。CI 会执行源码检查、全部测试、静态构建、CSP postbuild 和依赖漏洞审计。
