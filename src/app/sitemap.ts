import type { MetadataRoute } from 'next';
import { allDocuments } from '@/lib/content';
import { diagramInfo, siteUrl } from '@/lib/navigation';

export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/platform/', '/packages/', '/templates/', '/diagrams/', ...Object.keys(diagramInfo).map(key => `/diagrams/${key}/`), ...allDocuments().map(doc => doc.href)].map(href => ({ url: `${siteUrl}${href}` }));
}
