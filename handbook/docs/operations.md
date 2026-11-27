# Vận hành và hiệu suất

| Mục tiêu ban đầu | Đo và hành động |
|---|---|
| Dashboard vẫn dùng được khi AI lỗi | Kiểm thử lỗi provider; giữ lịch sử đọc được và hiển thị trạng thái chờ |
| API đọc p95 dưới 500 ms ở tải mục tiêu | Đo ở staging; giới hạn pool DB và số instance |
| Job tương tác chờ p95 dưới 2 phút ở tải mục tiêu | Theo dõi tuổi hàng đợi; giới hạn quota theo tenant, thêm slot theo tải |
| Khôi phục có thể kiểm chứng | Mục tiêu đề xuất RPO 15 phút, RTO 2 giờ; xác nhận bằng diễn tập restore |

Các ngưỡng là mục tiêu đề xuất, cần xác nhận bằng tải thực tế. Theo dõi với OpenTelemetry và Cloud Monitoring; liên kết theo run ID. Hạn chế label có độ phân mảnh cao, lấy mẫu trace và đặt TTL cho log.

Kích hoạt xử lý theo webhook, callback và thao tác người dùng. Đối soát theo mốc hết hạn; heartbeat chỉ khi cần theo dõi thiết bị hoặc lease. Hủy lượt review lỗi thời, dùng lại CI, gửi đoạn log cần thiết cho LLM, đóng preview khi hết TTL. Dùng retry có backoff và giới hạn. Khi nhà cung cấp quá tải, giãn tải theo tenant và ưu tiên job tương tác.

Deploy canary theo tổ chức. Migration theo hướng thêm → chuyển dữ liệu → bỏ sau. Giữ tương thích với job và agent phiên bản cũ trong cửa sổ nâng cấp. Kiểm tra rollback frontend manifest, service revision và restore dữ liệu định kỳ.
