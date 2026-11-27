# PR Quality Platform · Tài liệu

Cổng tài liệu **Next.js + TypeScript**, triển khai dạng static trên GitHub Pages tại **https://cra-docs.eeslern.com** khi Pages và DNS đã được bật.

Giao diện được triển khai theo [thiết kế Figma](https://www.figma.com/design/ovxqkcoRdSPnuejPi2hFlF?node-id=8-382): sidebar, tổng quan, danh mục nền tảng/package/mẫu, chế độ sáng/tối và bố cục mobile. Sơ đồ luồng duyệt PR, kiến trúc và quyền AI được dựng bằng HTML/CSS, có phiên bản đọc trên màn hình hẹp.

## Chạy tại máy

Yêu cầu Node.js 22 trở lên.

```bash
npm ci
npm run dev
```

Mở http://localhost:3000. Font Roboto được đóng gói cục bộ; trang không phụ thuộc Google Fonts hay URL asset tạm của Figma.

## Nội dung

**`handbook/` là nguồn nội dung duy nhất** cho 44 trang Markdown hiện có. Sửa hoặc thêm file `.md` tại đây rồi push lên `main`; build sẽ tự sinh trang, mục lục và chỉ mục tìm kiếm. Liên kết Markdown tương đối được đổi thành URL website và được kiểm tra khi build. Nội dung HTML thô trong Markdown không được thực thi.

| Nguồn | Đường dẫn web |
|---|---|
| `handbook/index.md` | `/overview/` |
| `handbook/docs/requirements.md` | `/docs/requirements/` |
| `handbook/packages/review/README.md` | `/packages/review/` |
| `handbook/packages/review/requirements.md` | `/packages/review/requirements/` |
| `handbook/templates/feature.md` | `/templates/feature/` |

Các trang tổng quan có đường dẫn `/`, `/platform/`, `/packages/`, `/templates/` và `/diagrams/`. Metadata danh mục nằm trong `src/lib/navigation.ts`; nếu thêm package mới, bổ sung vào danh mục này. Tìm kiếm toàn văn hỗ trợ tiếng Việt không dấu và phím tắt Ctrl/Cmd + K. Chế độ sáng/tối theo thiết bị ở lần đầu và nhớ lựa chọn trên trình duyệt.

## Build và kiểm tra

```bash
npm run build
npm run typecheck
npm run check:export
```

- Build xác thực liên kết Markdown, sinh tìm kiếm và xuất website vào `out/`.
- Kiểm tra export xác nhận mọi trang Markdown được xuất, các đường dẫn và anchor nội bộ hợp lệ, các asset tồn tại, có sitemap, chỉ mục tìm kiếm, `CNAME` và `.nojekyll`.
- Không cần server Node.js trong môi trường production.

`mkdocs.yml` và `requirements.txt` được giữ lại để đọc tài liệu với MkDocs nếu cần; workflow production sử dụng Next.js.

## GitHub Pages và tên miền

Workflow [Build and deploy documentation](.github/workflows/docs.yml) chạy trên push `main`, pull request và thao tác thủ công. Pull request chỉ build/kiểm tra; `main` deploy qua GitHub Pages Actions với quyền `pages: write` và `id-token: write`.

### Thiết lập lần đầu

1. Vào [Settings → Pages](https://github.com/vqviet03/pr-quality-platform-docs/settings/pages), chọn **Source → GitHub Actions**.
2. Trong **Custom domain**, nhập `cra-docs.eeslern.com` rồi Save. `public/CNAME` đã chứa tên miền này và được đưa vào mọi bản export. Với nguồn GitHub Actions, vẫn phải lưu custom domain trong Settings/API; chỉ file CNAME không đủ để thiết lập domain phía GitHub.
3. Tại nhà cung cấp DNS của `eeslern.com`, tạo bản ghi:

   | Type | Name/Host | Target/Value |
   |---|---|---|
   | CNAME | `cra-docs` | `vqviet03.github.io` |

   Nếu dùng Cloudflare, đặt **DNS only** trong lúc GitHub xác thực và cấp chứng chỉ. Không thêm đường dẫn repo vào giá trị CNAME. Thay bản ghi cũ cùng host nếu có xung đột.
4. Mở [Actions](https://github.com/vqviet03/pr-quality-platform-docs/actions/workflows/docs.yml), chọn **Run workflow** trên `main` nếu lần chạy trước bị dừng do Pages chưa bật.
5. Sau khi DNS check thành công và GitHub cấp chứng chỉ, bật **Enforce HTTPS** trong Settings → Pages.

Có thể cấu hình Pages qua REST API nếu token có quyền **Pages: write** (quyền push code không bao gồm quyền này):

```bash
# Chỉ chạy lệnh tạo khi repository chưa có Pages site.
gh api --method POST repos/vqviet03/pr-quality-platform-docs/pages -f build_type=workflow
# Với Pages site đã tồn tại, cập nhật nguồn deploy:
gh api --method PUT repos/vqviet03/pr-quality-platform-docs/pages -f build_type=workflow
gh api --method PUT repos/vqviet03/pr-quality-platform-docs/pages -f cname=cra-docs.eeslern.com
```

Nếu deployment báo không tìm thấy Pages site hoặc thiếu quyền, kiểm tra bước 1 và quyền GitHub App/token. Lỗi DNS/chứng chỉ phải được xử lý tại DNS và Pages settings; một commit `CNAME` không tự tạo bản ghi DNS.

## Các trang bắt đầu

| Tài liệu | Nội dung |
|---|---|
| [Yêu cầu sản phẩm](handbook/docs/requirements.md) | Phạm vi, vai trò, tiêu chí nghiệm thu |
| [Kiến trúc](handbook/docs/architecture.md) | Shell, microservices, dữ liệu, triển khai |
| [Lộ trình](handbook/docs/roadmap.md) | Tám đợt, mỗi đợt tối đa 10 chức năng |
| [Bảo mật](handbook/docs/security.md) | Quyền, cô lập, dữ liệu gửi LLM |
| [Vận hành](handbook/docs/operations.md) | SLO, chi phí, khôi phục |
| [Quy chuẩn](handbook/docs/standards.md) | Trình bày, hợp đồng, CI và template |
