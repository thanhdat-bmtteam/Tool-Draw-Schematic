# Sơ đồ khối mạch điện

Công cụ vẽ sơ đồ khối (nguồn, vi điều khiển, cảm biến, thiết bị chấp hành, kết nối), tự nối dây theo chân. Xuất PNG/SVG. Lưu dự án lên Supabase hoặc trên trình duyệt.

## Cấu trúc

```
index.html            toàn bộ công cụ (HTML + CSS + JS, không cần build)
config.js             URL và anon key của Supabase
supabase/schema.sql   tạo bảng projects + phân quyền
.nojekyll             để GitHub Pages phục vụ nguyên trạng
```

## 1. Chạy trên máy

Mở thẳng `index.html` bằng trình duyệt là dùng được (lưu trên trình duyệt).

Muốn đăng nhập Supabase thì nên chạy qua một web server nhỏ:

```bash
cd so-do-khoi
python -m http.server 8080      # hoặc: npx serve .
```

Rồi mở http://localhost:8080

## 2. Cấu hình Supabase

1. Tạo dự án tại https://supabase.com (gói Free là đủ).
2. Vào **SQL Editor → New query**, dán toàn bộ `supabase/schema.sql`, bấm **Run**. Lệnh này tạo bảng `projects` và bucket kho ảnh `images`.
3. Vào **Project Settings → API Keys**, copy **Publishable key** (`sb_publishable_...`) dán vào `config.js`. Project URL lấy ở nút **Connect**. Không dùng Secret key.
4. Vào **Authentication → URL Configuration**:
   - **Site URL**: địa chỉ trang (ví dụ `https://<tên-github>.github.io/so-do-khoi/`).
   - **Redirect URLs**: thêm cả địa chỉ đó và `http://localhost:8080`.
5. (Tùy chọn) **Authentication → Providers → Email**: tắt *Confirm email* nếu muốn tạo tài khoản là dùng ngay, không cần xác nhận qua email.

Anon key được phép để công khai trong mã nguồn. Dữ liệu được bảo vệ bằng Row Level Security: mỗi tài khoản chỉ đọc/sửa được dự án của mình. **Không** đưa `service_role` key vào đây.

## 3. Đưa lên GitHub Pages

```bash
cd so-do-khoi
git init
git add .
git commit -m "So do khoi"
git branch -M main
git remote add origin https://github.com/<tên-github>/so-do-khoi.git
git push -u origin main
```

Trên GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → main / (root) → Save**. Sau 1–2 phút trang sẽ có ở `https://<tên-github>.github.io/so-do-khoi/`.

Nhớ cập nhật Site URL / Redirect URLs trong Supabase theo địa chỉ này (bước 2.4).

## Sử dụng

- **Dự án đám mây**: đăng nhập, lưu, mở, xóa dự án. Phím tắt **Ctrl+S** để lưu nhanh.
- **Tải JSON / Mở JSON**: sao lưu dự án ra tệp, dùng được cả khi không có mạng.
- **Xuất PNG / SVG**: chèn vào báo cáo, slide.
- **Kho ảnh**: chọn linh kiện → *Chọn từ kho ảnh…* để tải ảnh lên Supabase Storage và dùng lại cho nhiều sơ đồ. *Tải ảnh lên…* hoặc **Ctrl+V** cũng tự đưa ảnh vào kho khi đã đăng nhập (chưa đăng nhập thì ảnh lưu kèm trong dự án).
- Khi lưu lên đám mây, ảnh cũ nằm trong dự án sẽ tự được chuyển lên kho.
- Xuất PNG/SVG tự nhúng ảnh từ kho vào file, nên file xuất ra dùng được cả khi không có mạng.

## Thêm linh kiện vào thư viện

Trong `index.html`, tìm `const CAT={`. Mỗi nhóm (`power`, `mcu`, `in`, `out`, `link`) là một mảng. Ví dụ thêm cảm biến:

```js
{t:'max30102', name:'MAX30102', sub:'Cảm biến nhịp tim, SpO2', iface:'i2c', volt:'3.3V',
 art:{k:'breakout', p:['#6a1b9a','MAX30102']}}
```

`iface`: `1wire`, `i2c`, `uart`, `spi`, `digital`, `analog`, `pwm`. Muốn đặt chân riêng thì thêm `pins:['VCC (5V)','OUT','GND']`.

## Sửa lỗi thường gặp trên GitHub Pages

- **Trang 404**: `index.html` phải nằm ngay ở gốc repo (không nằm trong thư mục con `so-do-khoi/`). Repo phải để Public. Kiểm tra lại Settings → Pages đã chọn `main` và `/ (root)`.
- **Trang trắng hoặc có thanh đỏ "Lỗi: …" ở trên cùng**: chụp nội dung thanh đỏ để sửa. Có thể mở DevTools (F12) → Console để xem chi tiết.
- **Sửa code rồi mà trang không đổi**: GitHub Pages cần 1–2 phút để cập nhật. Sau đó bấm Ctrl+F5 để tải lại không dùng cache.
- **Dòng trạng thái báo "SECRET key"**: đổi sang Publishable key trong `config.js`.
- **Đăng nhập được nhưng không lưu được**: trong *Dự án đám mây*, bấm **Kiểm tra kết nối**. Nếu báo lỗi ở bảng `projects` hoặc kho ảnh thì chạy lại `schema.sql`.
- **Tạo tài khoản mà không nhận được email**: tắt *Confirm email* (Authentication → Sign In / Providers → Email), hoặc kiểm tra Site URL.
