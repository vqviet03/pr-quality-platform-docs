# PR Quality Platform

Tài liệu sản phẩm và kỹ thuật cho nền tảng review PR, kiểm thử và duyệt bản sửa bằng AI.

| Bắt đầu | Nội dung |
|---|---|
| [Yêu cầu sản phẩm](docs/requirements.md) | Phạm vi, vai trò, tiêu chí nghiệm thu |
| [Kiến trúc](docs/architecture.md) | Shell, microservices, dữ liệu, triển khai |
| [Lộ trình](docs/roadmap.md) | Tám đợt, mỗi đợt tối đa 10 chức năng |
| [Bảo mật](docs/security.md) | Quyền, cô lập, dữ liệu gửi LLM |
| [Vận hành](docs/operations.md) | SLO, chi phí, khôi phục |
| [Quy chuẩn](docs/standards.md) | Trình bày, hợp đồng, CI và template |

## Package tài liệu

| Package | Phạm vi |
|---|---|
| [portal-shell](packages/portal-shell/README.md) | Shell giao diện |
| [platform-ui](packages/platform-ui/README.md) | Design system |
| [projects-git](packages/projects-git/README.md) | Dự án và Git |
| [review](packages/review/README.md) | Review và phát hiện |
| [fixes-approvals](packages/fixes-approvals/README.md) | Bản sửa và phê duyệt |
| [execution](packages/execution/README.md) | Điều phối thực thi |
| [preview](packages/preview/README.md) | Kiểm thử trình duyệt và preview |
| [local-agent](packages/local-agent/README.md) | Agent máy người dùng |
| [organization-access](packages/organization-access/README.md) | Tổ chức và quyền |
| [usage-audit](packages/usage-audit/README.md) | Chi phí và audit |
| [artifacts](packages/artifacts/README.md) | Kho bằng chứng |
