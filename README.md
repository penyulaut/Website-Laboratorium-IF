## Website Laboratorium IF

Proyek ini adalah website berbasis React (dengan Vite) untuk kebutuhan informasi / administrasi Laboratorium Informatika. Saat ini sudah memakai komponen kalender menggunakan FullCalendar dan styling dengan Tailwind CSS.

### Teknologi Utama
- React + Vite (development cepat dengan HMR)
- Tailwind CSS v4 (@tailwindcss/vite)
- FullCalendar (dayGrid, timeGrid, list view)
- Express (rencana backend – folder `server/`)

### Struktur Folder Singkat
```
Website-Laboratorium-IF/
  src/            -> Kode React (komponen, halaman)
  public/         -> Aset statis publik
  server/         -> Rencana backend Express (masih kosong)
  index.html      -> Entry HTML Vite
  vite.config.js  -> Konfigurasi Vite
```

### Menjalankan Secara Lokal
1. Install dependency frontend:
	```bash
	npm install
	```
2. Jalankan mode development (otomatis buka di http://localhost:5173):
	```bash
	npm run dev
	```
3. (Opsional) Build untuk produksi:
	```bash
	npm run build
	```
4. (Opsional) Preview hasil build:
	```bash
	npm run preview
	```

### Backend (Server)
Folder `server/` sudah disiapkan dengan Express, tetapi file `server.js` masih kosong. Untuk mulai:
1. Masuk ke folder server:
	```bash
	cd server
	npm install
	```
2. Ubah script `start` di `server/package.json` menjadi:
	```json
	"start": "node server.js",
	"dev": "nodemon server.js"
	```
3. Isi `server.js` minimal:
	```js
	const express = require('express');
	const app = express();
	app.get('/', (req,res)=> res.send('API Laboratorium IF')); 
	app.listen(3000, ()=> console.log('Server berjalan di http://localhost:3000'));
	```
4. Jalankan:
	```bash
	npm run dev
	```

### Kalender
Komponen kalender berada di halaman `pages/Calendar.jsx` dan memanfaatkan paket:
- `@fullcalendar/react`
- `@fullcalendar/daygrid`
- `@fullcalendar/timegrid`
- `@fullcalendar/list`

Anda bisa menambahkan event dengan menyiapkan state event atau mengambil dari API backend (jika sudah dibuat).

### Styling
Tailwind CSS v4 sudah terintegrasi lewat plugin Vite. Cukup gunakan kelas utilitas di komponen React. Tidak perlu file konfigurasi tambahan jika kebutuhan dasar sudah cukup.

### Linting
Jalankan:
```bash
npm run lint
```
Untuk memastikan kode mengikuti aturan dasar ESLint + plugin React hooks/refresh.

### Rencana Pengembangan Lanjut
- Implementasi API backend (jadwal, peminjaman, inventaris)
- Autentikasi (admin / asisten / umum)
- Integrasi database (MySQL / PostgreSQL / MongoDB)
- Upload & manajemen dokumen / asset lab

### Kontribusi
Silakan buat branch baru lalu ajukan pull request. Contoh alur singkat:
```bash
git checkout -b fitur-kalender-ekspor
git commit -m "feat: tambah tombol ekspor kalender"
git push origin fitur-kalender-ekspor
```

Jika ada pertanyaan atau ingin menambahkan fitur, buat issue di repository ini.
