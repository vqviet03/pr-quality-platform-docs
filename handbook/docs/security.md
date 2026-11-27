# Bảo mật và quyền dữ liệu

- Phân quyền tại API theo tổ chức, repo và thao tác. Dùng tài khoản dịch vụ riêng; xác minh chữ ký webhook; kiểm tra CSRF với thao tác dùng cookie.
- Kho bí mật chỉ cấp key cho service cần dùng. Runner và preview không nhận credential production hoặc token ghi Git. Code PR chạy trong môi trường tạm thời có giới hạn mạng và tài nguyên.
- Nội dung PR, log và tài liệu được xử lý như dữ liệu. Backend cưỡng chế danh sách tool, phạm vi file, lệnh test đã cấu hình và phê duyệt. Tác vụ review dùng quyền đọc; sửa trong workspace cần duyệt; ghi Git cần xác nhận riêng.
- Chính sách tổ chức quyết định source/log nào được gửi đến provider nào. Loại secret và dữ liệu cá nhân không cần thiết trước khi gửi. Fallback tuân thủ cùng chính sách.
- Shell chỉ tải module từ origin và manifest đã duyệt. Package UI chạy cùng quyền với shell; dùng review, khóa dependency, CSP, kiểm tra nguồn build và giới hạn quyền publish. Preview chạy trên origin riêng.
- Quyền tải artifact được kiểm tra theo tenant và job. URL tải có thời hạn. Audit ghi actor, tài nguyên, quyết định và phiên bản cấu hình; loại secret khỏi audit và log.
