export const repository = 'https://github.com/vqviet03/pr-quality-platform-docs';
export const siteUrl = 'https://cra-docs.eeslern.com';

export const platformDocs = [
  { title: 'Yêu cầu sản phẩm', href: '/docs/requirements/', description: 'Review, phê duyệt phạm vi sửa, kiểm thử và xác nhận ghi Git.' },
  { title: 'Kiến trúc', href: '/docs/architecture/', description: 'Shell giữ layout; mỗi module phát triển và phát hành riêng.' },
  { title: 'Bảo mật', href: '/docs/security/', description: 'Cô lập runner và kiểm soát dữ liệu gửi sang LLM.' },
  { title: 'Vận hành', href: '/docs/operations/', description: 'Theo dõi hàng đợi, chi phí, lưu trữ và phục hồi.' },
  { title: 'Lộ trình 8 đợt', href: '/docs/roadmap/', description: 'Mỗi đợt kết thúc bằng một luồng dùng được.' },
  { title: 'Quy chuẩn', href: '/docs/standards/', description: 'Quy định về trình bày, hợp đồng và phát hành.' },
];

export const packageGroups = [
  { title: 'Giao diện', id: 'giao-dien', description: 'Portal Shell · Design System', packages: [
    { id: 'portal-shell', title: 'Shell giao diện', description: 'Shell chung giữ layout, route và session.' },
    { id: 'platform-ui', title: 'Design system', description: 'Thành phần và quy chuẩn giao diện dùng chung.' },
  ] },
  { title: 'Git và chất lượng', id: 'git-chat-luong', description: 'Dự án và Git · Review · Sửa và phê duyệt', packages: [
    { id: 'projects-git', title: 'Dự án và Git', description: 'Kết nối repository, dự án và sự kiện Git.' },
    { id: 'review', title: 'Review và phát hiện', description: 'Phân tích diff theo commit và trình bày phát hiện có bằng chứng.' },
    { id: 'fixes-approvals', title: 'Bản sửa và phê duyệt', description: 'Phạm vi sửa, patch và xác nhận ghi Git.' },
  ] },
  { title: 'Thực thi', id: 'thuc-thi', description: 'Điều phối · Preview · Local Agent', packages: [
    { id: 'execution', title: 'Điều phối thực thi', description: 'Điều phối job và quản lý trạng thái thực thi.' },
    { id: 'preview', title: 'Kiểm thử trình duyệt và preview', description: 'Kiểm thử giao diện và thu thập bằng chứng.' },
    { id: 'local-agent', title: 'Agent máy người dùng', description: 'Thực thi trên workspace máy người dùng.' },
  ] },
  { title: 'Quản trị và dữ liệu', id: 'quan-tri-du-lieu', description: 'Tổ chức và quyền · Chi phí và audit · Kho bằng chứng', packages: [
    { id: 'organization-access', title: 'Tổ chức và quyền', description: 'Quản lý tenant, thành viên và phân quyền.' },
    { id: 'usage-audit', title: 'Chi phí và audit', description: 'Theo dõi sử dụng, ngân sách và lịch sử thao tác.' },
    { id: 'artifacts', title: 'Kho bằng chứng', description: 'Lưu trữ và truy xuất artifact theo phiên bản.' },
  ] },
];

export const packages = packageGroups.flatMap(group => group.packages);
export const templates = [
  { title: 'Yêu cầu tính năng', href: '/templates/feature/', description: 'Mục tiêu, phạm vi, quyền và tiêu chí nghiệm thu.' },
  { title: 'Quyết định kiến trúc', href: '/templates/adr/', description: 'Bối cảnh, phương án, quyết định và rollback.' },
  { title: 'Runbook', href: '/templates/runbook/', description: 'Dấu hiệu, chẩn đoán, khôi phục và người phụ trách.' },
  { title: 'Pull request', href: '/templates/pull-request/', description: 'Thay đổi, kiểm thử, tác động và triển khai.' },
];

export const diagramInfo = {
  architecture: { title: 'Kiến trúc triển khai', description: 'Tách giao diện, điều phối và thực thi để mở rộng độc lập.' },
  'pr-workflow': { title: 'Luồng duyệt và sửa PR', description: 'Hai điểm duyệt tách quyền sửa workspace khỏi quyền ghi Git.' },
  'ai-permissions': { title: 'Quyền gửi dữ liệu sang AI', description: 'Kiểm tra quyền dữ liệu trước khi gọi provider hoặc fallback.' },
};
export type DiagramKind = keyof typeof diagramInfo;
