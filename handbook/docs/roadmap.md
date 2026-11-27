# Lộ trình phát triển

| Đợt | Chức năng | Điều kiện hoàn thành |
|---|---|---|
| 1 · Review thủ công | Đăng nhập; chọn repo/PR; pin SHA; đọc diff; gọi Claude; báo cáo; lịch sử | Review được PR mẫu Ees edu |
| 2 · Git và CI | Webhook; bộ lọc trigger; nhận CI; chạy CI theo yêu cầu; retry; chống trùng; Git check | PR đổi tự cập nhật báo cáo đúng SHA |
| 3 · Sửa có duyệt | Duyệt phạm vi; workspace; patch; test; sửa lại có giới hạn; diff; ghi Git; kiểm tra SHA | Hoàn tất luồng từ finding đến draft PR |
| 4 · Preview | Cấu hình start; dữ liệu mẫu; Playwright; trace; phân tích bằng chứng; preview TTL | Duyệt bản sửa qua preview có xác thực |
| 5 · Local agent | Ghép thiết bị; chọn repo; giới hạn tải; chạy job; hủy; fallback; phát hành hai hệ điều hành | Một repo chạy được qua CI và local |
| 6 · Nhiều đội | Vai trò; cô lập tenant; quota; phân lịch; chi phí; lưu trữ; audit | Hai tổ chức dùng song song an toàn |
| 7 · Thay provider | LLM thứ hai; routing; chính sách dữ liệu; bộ đánh giá; canary; Git thứ hai; chuyển kho | Rollback provider và đối soát artifact |
| 8 · Scale | Autoscale; giãn tải; tối ưu DB; tách analytics khi cần; pool riêng; deploy tương thích; restore; kiểm thử tải | Tải đỉnh và sự cố được kiểm chứng |
