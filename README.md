# Encode & Decode Pro

Webapp mã hóa và giải mã văn bản đa định dạng, chạy hoàn toàn trong trình duyệt.

**Live site:** https://khahdihdz.github.io/encode/

## Tính năng

- Base64 UTF-8 và Base64 URL Safe
- URL Encode / Decode
- HTML Entities
- Unicode Escape
- Hexadecimal, Binary và Decimal Unicode
- ROT13 và Caesar Cipher
- Morse Code
- Reverse Text (giữ nguyên cụm ký tự Unicode)
- JSON String Escape / Unescape
- MD5, SHA-1, SHA-256 và SHA-512 (hash một chiều)
- Hỗ trợ tiếng Việt, Emoji, khoảng trắng, Tab và xuống dòng
- Tùy chọn xử lý khoảng trắng do người dùng kiểm soát
- Xử lý toàn văn bản hoặc từng dòng (Line by Line)\n- Sao chép kết quả và tải TXT theo thao tác chủ động
- Giao diện sáng/tối, responsive cho điện thoại và desktop

## Quyền riêng tư

- Không Backend, Database, tài khoản hoặc API xử lý bên ngoài.
- Không dùng LocalStorage, SessionStorage, IndexedDB hay Cookie.
- Không lưu lịch sử, Input, Output hoặc cấu hình chứa nội dung.
- Không Analytics, Tracking, Telemetry hoặc ghi nội dung vào Console.
- Không có request mạng trong luồng xử lý Encode / Decode.
- Nội dung chỉ tồn tại trong bộ nhớ của trang hiện tại. Tải lại hoặc đóng trang sẽ kết thúc phiên.
- Chỉ tạo tệp tải xuống khi người dùng bấm nút Download.

Trang web không tải thư viện, font hoặc tài nguyên bên thứ ba. Sau khi trang được tải từ GitHub Pages, các phép chuyển đổi không cần kết nối API.

## Chạy cục bộ

Mở `index.html` trực tiếp để sử dụng hầu hết chức năng. SHA-1/SHA-256/SHA-512 dùng Web Crypto API và cần ngữ cảnh bảo mật như HTTPS hoặc localhost.

Có thể chạy máy chủ tĩnh:

```bash
python -m http.server 8080
```

Sau đó mở http://localhost:8080.

## Triển khai GitHub Pages

1. Mở **Settings → Pages** trong repository.
2. Chọn **Deploy from a branch**.
3. Chọn branch **main**, folder **/(root)**.
4. Save và chờ GitHub Pages publish.
5. Trang web: https://khahdihdz.github.io/encode/

## Lưu ý kỹ thuật

- Base64, Hex và Binary xử lý theo byte UTF-8 để bảo toàn Unicode.
- Hex/Binary Decode nhận dữ liệu có hoặc không có dấu phân cách phổ biến.
- Không thể phục hồi khoảng trắng đã bị xóa khỏi dữ liệu trước khi Encode.
- Chuỗi viết liền không tự được chèn dấu cách hoặc đoán ranh giới từ.
- MD5 và SHA là hàm băm một chiều, không có chức năng Decode.
- MD5 được triển khai cục bộ bằng JavaScript; SHA dùng Web Crypto API.
- HTML entity hỗ trợ các entity phổ biến và numeric entity khi Decode.

## Cấu trúc

- `index.html` — landing page và giao diện ứng dụng.
- `styles.css` — giao diện responsive, không phụ thuộc CDN.
- `script.js` — logic Encode / Decode chạy phía client.
- `favicon.svg` — biểu tượng trang web.\n- `README.md` — tài liệu dự án.

## License

Chưa chỉ định giấy phép.