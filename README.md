# PR Quality Platform

Tài liệu sản phẩm và kỹ thuật cho nền tảng review PR, kiểm thử và duyệt bản sửa bằng AI.

| Bắt đầu | Nội dung |
|---|---|
| [Yêu cầu sản phẩm](handbook/docs/requirements.md) | Phạm vi, vai trò, tiêu chí nghiệm thu |
| [Kiến trúc](handbook/docs/architecture.md) | Shell, microservices, dữ liệu, triển khai |
| [Lộ trình](handbook/docs/roadmap.md) | Tám đợt, mỗi đợt tối đa 10 chức năng |
| [Bảo mật](handbook/docs/security.md) | Quyền, cô lập, dữ liệu gửi LLM |
| [Vận hành](handbook/docs/operations.md) | SLO, chi phí, khôi phục |
| [Quy chuẩn](handbook/docs/standards.md) | Trình bày, hợp đồng, CI và template |

## Package tài liệu

| Package | Phạm vi |
|---|---|
| [portal-shell](handbook/packages/portal-shell/README.md) | Shell giao diện |
| [platform-ui](handbook/packages/platform-ui/README.md) | Design system |
| [projects-git](handbook/packages/projects-git/README.md) | Dự án và Git |
| [review](handbook/packages/review/README.md) | Review và phát hiện |
| [fixes-approvals](handbook/packages/fixes-approvals/README.md) | Bản sửa và phê duyệt |
| [execution](handbook/packages/execution/README.md) | Điều phối thực thi |
| [preview](handbook/packages/preview/README.md) | Kiểm thử trình duyệt và preview |
| [local-agent](handbook/packages/local-agent/README.md) | Agent máy người dùng |
| [organization-access](handbook/packages/organization-access/README.md) | Tổ chức và quyền |
| [usage-audit](handbook/packages/usage-audit/README.md) | Chi phí và audit |
| [artifacts](handbook/packages/artifacts/README.md) | Kho bằng chứng |

Đọc trên GitHub hoặc mở bản web bằng `python -m pip install -r requirements.txt` và `python -m mkdocs serve`.
