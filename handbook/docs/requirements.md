# Yêu cầu sản phẩm

| Vai trò | Công việc |
|---|---|
| Quản trị tổ chức | Kết nối Git, cấp quyền, đặt hạn mức và cấu hình dữ liệu |
| Developer | Chạy review, đọc findings, xem diff và log |
| Người duyệt | Duyệt sửa trong workspace và xác nhận riêng trước khi ghi Git |

Luồng chính gồm nhận PR → lấy diff và kết quả CI đúng commit → Claude đề xuất → duyệt phạm vi → sửa và test → xem bằng chứng → xác nhận thao tác Git. Báo cáo ghi rõ phần đã kiểm thử, phần chưa kiểm thử và nguồn bằng chứng. Job chờ duyệt hoặc chờ CI giải phóng runner.

Chấp nhận MVP khi một PR mẫu đi hết luồng, có thể hủy job, retry không tạo bản ghi hoặc PR trùng, và lỗi AI không làm mất quyền xem báo cáo đã lưu.
