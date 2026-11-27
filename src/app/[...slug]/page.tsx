import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumb, CardGrid, FlowStrip, Hero } from '@/components/page-parts';
import { Diagram } from '@/components/diagram';
import { allDocuments, renderDocument } from '@/lib/content';
import { diagramInfo, packageGroups, packages, platformDocs, repository, templates, type DiagramKind } from '@/lib/navigation';

const categories = ['platform', 'packages', 'templates', 'diagrams'];
type Props = { params: Promise<{ slug: string[] }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return [...categories, ...Object.keys(diagramInfo).map(key => `diagrams/${key}`), ...allDocuments().map(doc => doc.href.slice(1, -1))].map(route => ({ slug: route.split('/') }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const route = slug.join('/');
  const doc = allDocuments().find(item => item.href === `/${route}/`);
  const categoryTitle = { platform: 'Tài liệu nền tảng', packages: 'Danh mục package', templates: 'Mẫu tài liệu', diagrams: 'Sơ đồ hệ thống' }[route];
  const diagramTitle = route.startsWith('diagrams/') ? diagramInfo[slug[1] as DiagramKind]?.title : undefined;
  return { title: doc?.title ?? categoryTitle ?? diagramTitle, description: doc?.description || undefined, alternates: { canonical: `/${route}/` } };
}

export default async function ContentPage({ params }: Props) {
  const { slug } = await params;
  const route = slug.join('/');
  if (route.startsWith('diagrams/') && slug[1] in diagramInfo) {
    return <div className="page-stack"><Breadcrumb items={[{ title: 'SƠ ĐỒ', href: '/diagrams/' }, { title: diagramInfo[slug[1] as DiagramKind].title }]} /><Diagram kind={slug[1] as DiagramKind} /></div>;
  }
  if (route === 'platform') return <div className="page-stack"><Breadcrumb items={[{ title: 'NỀN TẢNG' }]} /><Hero title="Tài liệu nền tảng" description="Các quyết định áp dụng xuyên suốt các package." action={{ title: 'Mở tài liệu', href: '/docs/requirements/' }} /><CardGrid items={platformDocs} /><FlowStrip title="Kiến trúc" href="/diagrams/architecture/" items={['Portal Shell', 'API .NET', 'Worker / Runner', 'Kho bằng chứng']} /></div>;
  if (route === 'templates') return <div className="page-stack"><Breadcrumb items={[{ title: 'MẪU' }]} /><Hero title="Mẫu tài liệu" description="Dùng cùng cấu trúc để các team có thể đọc và review nhanh." action={{ title: 'Mở tài liệu', href: '/templates/feature/' }} /><CardGrid items={templates} /></div>;
  if (route === 'packages') return <div className="page-stack"><Breadcrumb items={[{ title: 'PACKAGE' }]} /><Hero title="Danh mục package" description="11 package được nhóm theo phạm vi sở hữu. Mỗi package có tài liệu yêu cầu và phát triển." action={{ title: 'Mở tài liệu', href: '#danh-muc' }} /><CardGrid items={packageGroups.map(group => ({ title: group.title, description: group.description, href: `#${group.id}` }))} /><div className="package-directory" id="danh-muc">{packageGroups.map(group => <section key={group.id} id={group.id}><h2>{group.title}</h2><CardGrid items={group.packages.map(pkg => ({ ...pkg, href: `/packages/${pkg.id}/` }))} /></section>)}</div></div>;
  if (route === 'diagrams') return <div className="page-stack"><Breadcrumb items={[{ title: 'SƠ ĐỒ' }]} /><Hero title="Sơ đồ hệ thống" description="Kiến trúc triển khai, luồng xử lý PR và kiểm soát dữ liệu." action={{ title: 'Xem kiến trúc', href: '/diagrams/architecture/' }} /><FlowStrip title="Kiến trúc" href="/diagrams/architecture/" items={['Portal Shell', 'API .NET', 'Worker / Runner', 'Kho bằng chứng']} /><FlowStrip title="Luồng PR" href="/diagrams/pr-workflow/" items={['Nhận PR', 'Review AI', 'Duyệt sửa', 'Kiểm thử', 'Xác nhận ghi Git']} /><FlowStrip title="Bảo mật" href="/diagrams/ai-permissions/" items={['Tổ chức', 'Kiểm quyền', 'Lọc dữ liệu', 'LLM được phép']} /></div>;

  const match = allDocuments().find(doc => doc.href === `/${route}/`);
  if (!match) notFound();
  const doc = await renderDocument(match.file);
  const pkg = slug[0] === 'packages' ? packages.find(item => item.id === slug[1]) : undefined;
  const packageRoot = pkg ? `/packages/${pkg.id}/` : '';
  const packageOverview = pkg && slug.length === 2;
  const breadcrumbs = pkg ? [{ title: 'PACKAGE', href: '/packages/' }, { title: pkg.title, href: packageRoot }, ...(packageOverview ? [] : [{ title: slug.at(-1) === 'requirements' ? 'YÊU CẦU' : 'PHÁT TRIỂN' }])] : [{ title: slug[0] === 'templates' ? 'MẪU' : 'NỀN TẢNG', href: slug[0] === 'templates' ? '/templates/' : '/platform/' }, { title: doc.title }];
  const relatedDiagram = route === 'docs/architecture' ? 'architecture' : route === 'docs/requirements' || route === 'packages/fixes-approvals' ? 'pr-workflow' : route === 'docs/security' ? 'ai-permissions' : null;
  const ordered = allDocuments();
  const current = ordered.findIndex(item => item.file === doc.file);
  return <div className="page-stack"><Breadcrumb items={breadcrumbs} /><Hero title={doc.title} description={packageOverview ? pkg.description : doc.description || 'Mẫu dùng chung cho tài liệu sản phẩm và kỹ thuật.'} action={packageOverview ? { title: 'Mở tài liệu', href: `${packageRoot}requirements/` } : undefined} />
    {pkg && <nav className="document-tabs" aria-label="Tài liệu package">{[{ title: 'Tổng quan', href: packageRoot }, { title: 'Yêu cầu và nghiệm thu', href: `${packageRoot}requirements/` }, { title: 'Cấu trúc và phát triển', href: `${packageRoot}development/` }].map(item => <Link key={item.href} href={item.href} aria-current={doc.href === item.href ? 'page' : undefined}>{item.title}</Link>)}</nav>}
    {packageOverview && pkg.id === 'review' && <><CardGrid items={[
      { title: 'Yêu cầu', description: 'Báo cáo theo file, dòng và mức độ. Phân biệt nội dung đã xác minh.', href: `${packageRoot}requirements/` },
      { title: 'Phát triển', description: 'Dùng adapter LLM và checkpoint. Ghi nhận token và chi phí.', href: `${packageRoot}development/` },
      { title: 'Nghiệm thu', description: 'Kết quả cũ được đánh dấu khi PR có commit mới.', href: `${packageRoot}requirements/#tiêu-chí-nghiệm-thu` },
      { title: 'Điều hướng', description: 'Tổng quan · Yêu cầu và nghiệm thu · Cấu trúc và phát triển', href: '#noi-dung' },
    ]} /><FlowStrip title="Luồng PR" href="/diagrams/pr-workflow/" items={['Nhận PR', 'Review AI', 'Duyệt sửa', 'Kiểm thử', 'Xác nhận ghi Git']} /></>}
    {relatedDiagram && <Link className="related-diagram" href={`/diagrams/${relatedDiagram}/`}>Xem sơ đồ: {diagramInfo[relatedDiagram].title}</Link>}
    <div className={`article-layout${doc.headings.length ? ' with-toc' : ''}`} id="noi-dung"><article className="prose" dangerouslySetInnerHTML={{ __html: doc.html }} />{doc.headings.length > 0 && <aside className="table-of-contents"><p>TRONG TRANG NÀY</p><nav aria-label="Mục lục trang">{doc.headings.map(heading => <a key={heading.id} href={`#${heading.id}`} className={heading.level === 3 ? 'toc-nested' : ''}>{heading.text}</a>)}</nav></aside>}</div>
    <footer className="document-footer"><a href={`${repository}/edit/main/handbook/${doc.file}`} target="_blank" rel="noreferrer">Chỉnh sửa trang này trên GitHub</a><nav aria-label="Trang trước và sau">{current > 0 && <Link href={ordered[current - 1].href}><small>Trang trước</small>{ordered[current - 1].title}</Link>}{current < ordered.length - 1 && <Link href={ordered[current + 1].href}><small>Trang tiếp theo</small>{ordered[current + 1].title}</Link>}</nav></footer>
  </div>;
}
