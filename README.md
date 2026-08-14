# Assets

Semua gambar dirujuk langsung dari root folder (satu folder sama `index.html`),
jadi pastikan semua file di bawah ini ada di folder yang sama sebelum dibuka/di-deploy:

- `logo.png` — logo utama Sylla (siluet wanita berwarna rose). Dipakai di navbar, footer, dan favicon.
- `fotosalon.png` & `fotosalon1.png` — dipakai bergantian sebagai background Hero (auto-slide tiap 4 detik). `fotosalon.png` juga jadi gambar default kategori "Hair Treatment" di Services.
- `bgsection2.png` — dipakai sebagai background section About (motif bunga).
- `fotosalon3.png` — gambar kategori "Face & Body" di Services.
- `riaspengantin.png` — gambar kategori "Rias & Makeup" di Services.
- `fotosalon.png` s.d. `fotosalon6.png` + `riaspengantin.png` — 8 foto galeri lengkap di section Gallery (semua foto dipakai).

## Catatan sebelum publish

- Nama file gambar yang mengandung spasi/koma (kalau ada) sebaiknya di-rename
  jadi format `nama-file.png` tanpa spasi — lebih aman untuk deploy ke GitHub Pages/Netlify.
- Embed peta di section Location memakai pencarian teks alamat (`output=embed`).
  Kalau mau versi pin yang lebih presisi, buka Google Maps -> cari lokasi persis ->
  Share -> Embed a map -> copy src iframe-nya ke `index.html`.
- Nomor WhatsApp: 0813-8369-3708 (dipakai di 4 tempat: schema markup, Booking CTA,
  Location, dan Footer — kalau ganti nomor, update di keempatnya).
