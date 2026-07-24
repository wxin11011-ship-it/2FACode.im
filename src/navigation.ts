import { getPermalink } from './utils/permalinks';

// ============================================
// Site navigation — edit this file to customize header/footer links
// ============================================

/** Public source repository (open-source signal in the header). */
export const GITHUB_REPO_URL = 'https://github.com/wxin11011-ship-it/2FACode.im';

export const headerData = {
  // Tool site: keep the top bar free of section links; open source + feedback live as icons.
  links: [] as Array<{ text?: string; href?: string }>,
  actions: [] as Array<{ text: string; href: string; variant?: 'primary' | 'secondary' | 'tertiary' | 'link' }>,
  githubUrl: GITHUB_REPO_URL,
  showFeedback: true,
};

export const footerData = {
  links: [],
  secondaryLinks: [
    { text: 'About', href: getPermalink('/about') },
    { text: 'Security', href: getPermalink('/security') },
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
