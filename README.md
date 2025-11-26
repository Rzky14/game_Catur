# ♔ Game Catur ♚

Game catur interaktif yang dibuat dengan HTML, CSS, dan JavaScript murni (Vanilla JavaScript).

## 🎮 [MAIN SEKARANG!](https://rzky14.github.io/game_Catur/)

![Chess Game](https://img.shields.io/badge/Game-Chess-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-yellow)
![HTML5](https://img.shields.io/badge/HTML-5-orange)
![CSS3](https://img.shields.io/badge/CSS-3-blue)

## 🎮 Fitur

- ✅ Papan catur 8x8 dengan desain responsif
- ✅ Semua aturan catur standar untuk setiap bidak (Pawn, Rook, Knight, Bishop, Queen, King)
- ✅ Highlight gerakan valid saat memilih bidak
- ✅ Deteksi Skak (Check) dan Skakmat (Checkmate)
- ✅ Promosi Pawn otomatis menjadi Queen
- ✅ Tampilan bidak yang tertangkap
- ✅ Indikator giliran pemain
- ✅ Tombol Undo untuk membatalkan gerakan
- ✅ Tombol Reset untuk memulai game baru
- ✅ Interface yang menarik dengan gradient dan animasi

## 🚀 Cara Menjalankan

1. Clone repository ini:
```bash
git clone https://github.com/[username]/game-catur.git
```

2. Masuk ke direktori proyek:
```bash
cd game-catur
```

3. Buka file `index.html` di browser favorit Anda, atau gunakan Live Server di VS Code

Tidak perlu instalasi dependensi karena proyek ini menggunakan Vanilla JavaScript!

## 🎯 Cara Bermain

1. **Memilih Bidak**: Klik pada bidak yang ingin Anda gerakkan (hanya bidak dengan warna giliran Anda yang bisa dipilih)
2. **Melihat Gerakan**: Setelah memilih bidak, kotak hijau akan menunjukkan gerakan yang valid
3. **Menggerakkan Bidak**: Klik pada kotak yang di-highlight untuk menggerakkan bidak
4. **Menangkap Bidak Lawan**: Klik pada bidak lawan yang berada dalam gerakan valid untuk menangkapnya
5. **Undo**: Klik tombol "Undo" untuk membatalkan gerakan terakhir
6. **Main Ulang**: Klik tombol "Main Ulang" untuk memulai game baru

## 📋 Aturan Catur

- **Pawn (♙/♟)**: Bergerak maju 1 kotak, atau 2 kotak dari posisi awal. Menangkap diagonal.
- **Rook (♖/♜)**: Bergerak horizontal atau vertikal tanpa batas.
- **Knight (♘/♞)**: Bergerak bentuk L (2+1 kotak). Bisa melompati bidak lain.
- **Bishop (♗/♝)**: Bergerak diagonal tanpa batas.
- **Queen (♕/♛)**: Kombinasi Rook dan Bishop, gerakan paling kuat.
- **King (♔/♚)**: Bergerak 1 kotak ke segala arah.

## 🛠️ Teknologi yang Digunakan

- **HTML5**: Struktur halaman
- **CSS3**: Styling dengan gradient, flexbox, dan grid
- **JavaScript (Vanilla)**: Logika game tanpa framework

## 📁 Struktur Proyek

```
game-catur/
│
├── index.html      # Struktur HTML utama
├── styles.css      # Styling dan desain
├── script.js       # Logika game catur
└── README.md       # Dokumentasi
```

## 🎨 Screenshot

Game menampilkan:
- Papan catur dengan warna klasik
- Bidak menggunakan Unicode symbols
- Highlight untuk bidak terpilih dan gerakan valid
- Panel informasi giliran dan bidak tertangkap
- Tombol kontrol yang intuitif

## 🔮 Pengembangan Selanjutnya

Fitur yang bisa ditambahkan:
- [ ] Castling (Rokade)
- [ ] En Passant
- [ ] Timer untuk setiap pemain
- [ ] Mode AI (bermain melawan komputer)
- [ ] Simpan dan load game
- [ ] Multiplayer online
- [ ] Sound effects
- [ ] History gerakan lengkap dengan notasi catur

## 📝 Lisensi

Proyek ini bebas digunakan untuk keperluan pembelajaran dan pengembangan.

## 👨‍💻 Kontribusi

Kontribusi selalu diterima! Silakan fork repository ini dan buat pull request untuk perbaikan atau penambahan fitur.

---

Dibuat dengan ❤️ menggunakan Vanilla JavaScript
