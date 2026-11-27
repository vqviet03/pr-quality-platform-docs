import type { Metadata } from 'next';
import '@fontsource/roboto/latin-400.css';
import '@fontsource/roboto/latin-700.css';
import '@fontsource/roboto/vietnamese-400.css';
import '@fontsource/roboto/vietnamese-700.css';
import './globals.css';
import { Shell } from '@/components/shell';
import { siteUrl } from '@/lib/navigation';
import { withBasePath } from '@/lib/paths';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Tài liệu PR Quality Platform', template: '%s · PR Quality' },
  description: 'Tài liệu sản phẩm và kỹ thuật cho nền tảng review PR, kiểm thử và duyệt bản sửa bằng AI.',
  icons: { icon: withBasePath('/favicon.svg') },
};
const themeScript = `try{document.documentElement.dataset.theme=localStorage.getItem('pq-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch{}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="vi" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body><Shell>{children}</Shell></body></html>;
}
