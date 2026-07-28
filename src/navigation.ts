import { getPermalink } from './utils/permalinks';

// ============================================
// Site navigation — edit this file to customize header/footer links
// ============================================

/** Public source repository for security review under the noncommercial license. */
export const GITHUB_REPO_URL = 'https://github.com/wxin11011-ship-it/2FACode.im';

export const TOOL_LINKS = [
  {
    text: '2FA Code Generator',
    href: getPermalink('/'),
    description: 'Paste secrets or upload a setup QR. Get live TOTP codes in the browser.',
  },
  {
    text: '2FA QR Code Generator',
    href: getPermalink('/2fa-qr-code-generator'),
    description: 'Turn a Base32 secret into a scannable authenticator QR code.',
  },
  {
    text: 'TOTP Secret Key Generator',
    href: getPermalink('/totp-secret-key-generator'),
    description: 'Create a new 160-bit Base32 secret, otpauth URI, and enrollment QR.',
  },
  {
    text: 'TOTP Verifier',
    href: getPermalink('/totp-verifier'),
    description: 'Test a candidate TOTP code against a secret and nearby time windows.',
  },
] as const;

export const GUIDE_LINKS = [
  {
    text: '2FA Code Not Working',
    href: getPermalink('/guides/2fa-code-not-working'),
    description: 'Diagnose authenticator clock, secret, and configuration mismatches.',
  },
] as const;

export const headerData = {
  links: [
    {
      text: 'Tools',
      href: getPermalink('/tools'),
      links: TOOL_LINKS.map(({ text, href }) => ({ text, href })),
    },
    {
      text: 'Guides',
      href: getPermalink('/guides'),
      links: GUIDE_LINKS.map(({ text, href }) => ({ text, href })),
    },
  ],
  actions: [] as Array<{ text: string; href: string; variant?: 'primary' | 'secondary' | 'tertiary' | 'link' }>,
  githubUrl: GITHUB_REPO_URL,
  showFeedback: true,
};

export const footerData = {
  links: [
    {
      title: 'Tools',
      links: TOOL_LINKS.map(({ text, href }) => ({ text, href })),
    },
    {
      title: 'Guides',
      links: [
        { text: 'All guides', href: getPermalink('/guides') },
        ...GUIDE_LINKS.map(({ text, href }) => ({ text, href })),
      ],
    },
    {
      title: 'Trust',
      links: [
        { text: 'Security', href: getPermalink('/security') },
        { text: 'Privacy', href: getPermalink('/privacy') },
        { text: 'About', href: getPermalink('/about') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy', href: getPermalink('/privacy') },
    { text: 'Disclaimer', href: getPermalink('/disclaimer') },
    { text: 'Source', href: GITHUB_REPO_URL },
    { text: 'Issues', href: `${GITHUB_REPO_URL}/issues` },
  ],
  socialLinks: [],
  footNote: `
    <span class="text-gray-500">© ${new Date().getFullYear()} 2FACode.im. Browser-only TOTP.</span>
  `,
};
