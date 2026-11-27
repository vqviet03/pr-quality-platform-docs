# Kiến trúc và cấu trúc repository

| Lớp | Công cụ và ranh giới |
|---|---|
| Frontend | React + Vite, shell duy nhất giữ layout, route và session. Module Federation tải module theo phiên bản. |
| Backend | ASP.NET Core, EF Core/Npgsql, service tách theo nghiệp vụ; mỗi service sở hữu dữ liệu và migration. Có thể dùng chung PostgreSQL instance với database và role riêng. |
| Điều phối | Cloud Tasks cho bước hữu hạn; Pub/Sub cho sự kiện liên service khi cần fan-out. Trạng thái nghiệp vụ lưu PostgreSQL. Đánh giá Temporal khi cần nhiều workflow dài. |
| Thực thi | GitHub Actions trước; runner tạm thời và Go CLI theo nhu cầu. API và worker triển khai riêng trên Cloud Run. |
| Dữ liệu lớn | Cloud Storage cho artifact; PostgreSQL cho metadata. Mở rộng index, partition hoặc replica sau khi đo. |

Mỗi frontend module một package và repo phát hành riêng. Shell là chủ router. Khi đổi route, chỉ vùng nội dung đổi. Quality có các package Review và Fixes với route con riêng. Dev chạy module qua host thử nghiệm và fixture; tích hợp qua shell dev trỏ tới module local. Production gateway chuyển deep link về shell và định tuyến API tới service tương ứng. Asset dùng đường dẫn phiên bản bất biến. Manifest map route → phiên bản module; kiểm tra tương thích trước khi kích hoạt, rollback bằng manifest trước đó. Dùng chung phiên bản React tương thích và đặt vùng bắt lỗi riêng cho module.

API giao tiếp đồng bộ cho truy vấn và lệnh ngắn. Event chứa ID, tenant, phiên bản schema và commit khi liên quan. Dùng transactional outbox, consumer chống trùng và kiểm tra hợp đồng trong CI. Adapter AI, Git, runner và object storage là ranh giới thay provider; mỗi job lưu phiên bản cấu hình đã dùng.
