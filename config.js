// Lấy ở Supabase: Project Settings → API Keys → Publishable key (sb_publishable_...).
// TUYỆT ĐỐI không dán Secret key (sb_secret_...) hay service_role vào đây.
// Để trống URL và key thì công cụ chạy offline, lưu trên trình duyệt.
window.APP_CONFIG = {
  SUPABASE_URL: "https://wqdjchhangkeqqaijlgn.supabase.co",
  SUPABASE_ANON_KEY: "",          // dán Publishable key vào đây
  STORAGE_BUCKET: "images"        // tên bucket kho ảnh (tạo bằng schema.sql)
};
