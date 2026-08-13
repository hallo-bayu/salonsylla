# Assets

Semua gambar dirujuk langsung dari root folder (satu folder sama `index.html`),
jadi pastikan semua file di bawah ini ada di folder yang sama sebelum dibuka/di-deploy:

- `fotosalon1.png` — dipakai sebagai background Hero & gambar default Services.
  Kalau `fotosalon.png` (tanpa angka) ternyata angle-nya lebih luas/cerah,
  cukup ganti `src="fotosalon1.png"` jadi `src="fotosalon.png"` di dua tempat:
  section Hero dan `id="servicesImage"` di section Services.
- `bgsection2.png` — dipakai sebagai background section About (motif bunga).
- `riaspengantin.png` — dipakai sebagai gambar untuk tab "Rias & Makeup" di section Services.
- `fotosalon2.png` s.d. `fotosalon7.png` — 6 foto galeri di section Gallery.
- `icons/favicon.svg` — placeholder favicon (monogram Sylla). Ganti dengan logo asli kalau ada.

## Catatan sebelum publish

- Nama file gambar yang mengandung spasi/koma (kalau ada) sebaiknya di-rename
  jadi format `nama-file.png` tanpa spasi — lebih aman untuk deploy ke GitHub Pages/Netlify.
- Embed peta di section Location memakai pencarian teks alamat (`output=embed`).
  Kalau mau versi pin yang lebih presisi, buka Google Maps -> cari lokasi persis ->
  Share -> Embed a map -> copy src iframe-nya ke `index.html`.
- Nomor WhatsApp: 0813-8369-3708 (dipakai di 4 tempat: schema markup, Booking CTA,
  Location, dan Footer — kalau ganti nomor, update di keempatnya).
