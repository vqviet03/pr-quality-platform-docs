import Link from 'next/link';
export default function NotFound() {
  return <div className="page-stack"><header className="hero"><p>404</p><h1>Không tìm thấy tài liệu</h1><p>Đường dẫn này không tồn tại hoặc tài liệu đã được chuyển.</p><Link className="glass-button" href="/">Về trang tổng quan</Link></header></div>;
}
