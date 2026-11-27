import { Breadcrumb, CardGrid, Hero } from '@/components/page-parts';

export default function HomePage() {
  return <div className="page-stack home-page"><Breadcrumb items={[{ title: 'TỔNG QUAN' }]} /><Hero title="Tài liệu PR Quality Platform" description="Kiến trúc, yêu cầu phát triển và quy chuẩn cho nền tảng review PR và kiểm thử bằng AI." mobileTitle="Tài liệu PR Quality" mobileDescription="Bắt đầu từ yêu cầu, kiến trúc và lộ trình." action={{ title: 'Khám phá tài liệu', href: '/platform/' }} /><CardGrid compact items={[
    { title: 'Yêu cầu sản phẩm', href: '/docs/requirements/', description: 'Vai trò, luồng review và tiêu chí nghiệm thu.' },
    { title: 'Kiến trúc', mobileTitle: 'Kiến trúc và sơ đồ', href: '/docs/architecture/', description: 'Shell chung, service .NET và phân vùng dữ liệu.' },
    { title: 'Lộ trình 8 đợt', href: '/docs/roadmap/', description: 'Từ review một PR đến vận hành đa tổ chức.' },
    { title: 'Bảo mật và vận hành', href: '/docs/security/', description: 'Quyền theo tổ chức, quản lý chi phí và phục hồi.' },
  ]} /></div>;
}
