// GitHub Pages uses a repository prefix until a custom domain is configured.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export function withBasePath(href: string) {
  return href.startsWith('/') && !href.startsWith('//') ? `${basePath}${href}` : href;
}
