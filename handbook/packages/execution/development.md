# Phát triển · Điều phối thực thi

API .NET riêng; hàng đợi theo tải; tái dùng CI khi khớp commit và cấu hình; phân biệt lỗi hạ tầng với test fail.

## Cấu trúc và kiểm thử

Package triển khai sở hữu hợp đồng, cấu hình và fixture của phần mình. Với UI, tổ chức theo `src/features`, `src/routes` và `tests`. Với service .NET, tách `Api`, `Application`, `Infrastructure` và `Tests` theo nhu cầu; nếu lưu dữ liệu riêng thì sở hữu migration. Chạy dev với fixture hoặc dịch vụ dev đã cấp quyền. Kiểm thử tiêu chí trong [trang yêu cầu](requirements.md) trước khi phát hành.
