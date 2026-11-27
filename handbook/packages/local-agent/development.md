# Phát triển · Agent máy người dùng

Go CLI macOS/Windows; kết nối đi ra; token thiết bị thu hồi được; giới hạn job và tài nguyên. Tách workspace khỏi thư mục đang làm việc.

## Cấu trúc và kiểm thử

Package triển khai sở hữu hợp đồng, cấu hình và fixture của phần mình. Với UI, tổ chức theo `src/features`, `src/routes` và `tests`. Với service .NET, tách `Api`, `Application`, `Infrastructure` và `Tests` theo nhu cầu; nếu lưu dữ liệu riêng thì sở hữu migration. Chạy dev với fixture hoặc dịch vụ dev đã cấp quyền. Kiểm thử tiêu chí trong [trang yêu cầu](requirements.md) trước khi phát hành.
