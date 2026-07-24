import { getPermalink } from './utils/permalinks';

// ============================================
// 导航配置 - 修改这里来自定义你的导航
// ============================================

export const headerData = {
  links: [
    {
      text: 'How it works',
      href: getPermalink('/#how-title'),
    },
    {
      text: 'Security',
      href: getPermalink('/#security'),
    },
    { text: 'FAQ', href: getPermalink('/#faq') },
    { text: 'Source', href: 'https://github.com/wxin11011-ship-it/2FACode.im' },
  ],
  actions: [
    {
      text: 'Generate codes',
      href: getPermalink('/#generator'),
      variant: 'primary' as const,
    },
  ],
};

export const footerData = {
  links: [],
  secondaryLinks: [
    { text: 'About', href: getPermalink('/about') },
    { text: 'Security', href: getPermalink('/security') },
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy', href: getPermalink('/privacy') },
    { text: 'Disclaimer', href: getPermalink('/disclaimer') },
    { text: 'Source', href: 'https://github.com/wxin11011-ship-it/2FACode.im' },
    { text: 'Issues', href: 'https://github.com/wxin11011-ship-it/2FACode.im/issues' },
  ],
  socialLinks: [],
  footNote: `
    <span class="text-gray-500">© ${new Date().getFullYear()} 2FACode. Browser-only TOTP.</span>
  `,
};
