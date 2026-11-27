# Quy chuẩn tài liệu và phát triển

## Trình bày

- Viết tiếng Việt, đặt mục đích ở đầu trang, dùng câu ngắn. Mỗi trang một chủ đề, đề mục tối đa ba cấp. Dùng bảng cho dữ liệu so sánh, code fence có tên ngôn ngữ, sơ đồ ở nơi có luồng hoặc ranh giới cần giải thích.
- Dùng màu xanh chàm cho điều hướng, xanh ngọc cho điểm nhấn và nền sáng/tối theo chế độ đọc. Trạng thái luôn có chữ đi kèm màu. Kiểm tra bố cục hẹp, focus và độ tương phản.
- Tên file dùng chữ thường và dấu gạch ngang. Link nội bộ dùng đường dẫn tương đối. Ví dụ chỉ dùng dữ liệu mẫu, tránh tên khách hàng, log thật và key.

## Hợp đồng và phát hành

- OpenAPI cho HTTP, JSON Schema cho event và manifest. Thay đổi phá vỡ tương thích cần phiên bản mới và kế hoạch chuyển đổi. Mỗi repo build/test độc lập với fixture, kiểm thử hợp đồng và smoke test qua staging.
- PR phải mô tả tác động, kiểm thử và rollback nếu có thay đổi vận hành. Dùng review của chủ package; cấu hình CODEOWNERS khi đã có nhóm thật. Chạy build tài liệu ở chế độ strict trước merge.

## Mẫu bắt buộc theo loại thay đổi

| Mẫu | Dùng khi |
|---|---|
| [Yêu cầu tính năng](../templates/feature.md) | Thêm hoặc thay đổi hành vi sản phẩm |
| [Quyết định kiến trúc](../templates/adr.md) | Chọn giải pháp có tác động dài hạn |
| [Runbook](../templates/runbook.md) | Thêm luồng vận hành có thể cần can thiệp |
| [Pull request](../templates/pull-request.md) | Đề nghị merge |
