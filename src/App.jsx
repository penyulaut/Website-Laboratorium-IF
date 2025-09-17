import heroimg from "./assets/heroimg.svg";
// import laptop from "./assets/laptop.jpg";
import komputer from "./assets/komputer.svg";
import CalendarPage from "./pages/Calendar";
import ArticlesPage from "./pages/Articles";
import ReservationPage from "./pages/Reservation";
import LabStatusBar from "./components/LabStatusBar";

function App() {
  return (
    <>
      <LabStatusBar />
      {/* Hero section Start */}
      <div className="hero grid md:grid-cols-2 items-center pt-10 xl:gap-0 gap-6 grid-cols-1">
        <div className="tekshero">
          <h1 className="lg:text-5xl/tight text-4xl/tight font-bold mb-6">
            Asisten Laboratorium Informatika
          </h1>
          <p className="pb-4 lg:text-xl text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
            consectetur distinctio repudiandae ad fugiat hic laborum, dicta
            corrupti repellendus cum id nemo ducimus expedita illum ut
            blanditiis, officiis, nam sint.
          </p>
          <div className="flex items-center sm:gap-4 gap-2">
            <a
              href="#calendar"
              className="bg-violet-700 p-4 rounded-2xl hover:bg-violet-600"
            >
              Lihat Jadwal Praktikum{" "}
              <i className="ri-calendar-schedule-line ri-lg p-2"></i>
            </a>
            <a
              href="/reservasi"
              className="bg-zinc-700 p-4 rounded-2xl hover:bg-zinc-600"
            >
              Reservasi Lab <i className="ri-service-line ri-lg p-2"></i>
            </a>
          </div>
        </div>
        <img src={heroimg} alt="Hero" />
      </div>
      {/* Hero Section End */}

      {/* Tentang section Start */}
      <section className="tentang" id="tentang">
        <div className="mx-auto my-5 px-4 py-9 rounded-3xl bg-zinc-800">
          <div className="mb-2">
            <h1 className="text-4xl text-center font-extrabold text-violet-800 mb-4 pt-9">
              Tentang Kami
            </h1>
            <div className="flex justify-between gap-6 pt-5">
              <div>
                <img src={heroimg} alt="" className="w-500" />
              </div>
              <div className="">
                <p className="text-lg">
                  Kami adalah tim Asisten Laboratorium Informatika yang
                  berdedikasi untuk mendukung pembelajaran dan riset di bidang
                  teknologi.Kami menyediakan fasilitas laboratorium yang lengkap
                  dan modern, serta bimbingan praktis untuk membantu mahasiswa
                  menguasai keterampilan teknis yang dibutuhkan di dunia kerja.
                  Dengan pengalaman dan pengetahuan yang luas, kami berkomitmen
                  untuk menciptakan lingkungan belajar yang inspiratif dan
                  inovatif bagi seluruh civitas akademika.
                </p>
                <div className="mt-6">
                  <a
                    href=""
                    className="bg-violet-700 p-5 rounded-2xl hover:bg-violet-600"
                  >
                    Lihat Kepengurusan <i className="ri-team-fill ri-lg"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Tentang section End */}

      {/* Fasilitas Section Start */}
      <section className="fasilitas py-9">
        <div className="mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-violet-800 mb-4 pt-9">
              Fasilitas Kami
            </h1>
            <p className="text-lg">
              Kami menyediakan berbagai fasilitas modern untuk mendukung
              kegiatan praktikum dan riset Anda.
            </p>
          </div>
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
            <div className="p-6 text-center">
              <img src={komputer} alt="" />
              <h2 className="text-2xl font-semibold text-violet-700 mb-2 mt-3">
                Ruang Komputer
              </h2>
              <p className="text-white">
                Dilengkapi dengan komputer terbaru dan perangkat lunak terkini
                untuk mendukung pembelajaran Anda.
              </p>
            </div>
            <div className="p-6 text-center">
              <img src={komputer} alt="" />
              <h2 className="text-2xl font-semibold text-violet-700 mb-2 mt-3">
                Perangkat Jaringan
              </h2>
              <p className="text-white">
                Fasilitas jaringan lengkap termasuk router, switch, dan alat
                lainnya untuk praktikum jaringan.
              </p>
            </div>
            <div className="p-6 text-center">
              <img src={komputer} alt="" />
              <h2 className="text-2xl font-semibold text-violet-700 mb-2 mt-3">
                Laboratorium Riset
              </h2>
              <p className="text-white">
                Ruang khusus untuk riset dengan peralatan canggih dan dukungan
                teknis.
              </p>
            </div>
            <div className="p-6 text-center">
              <img src={komputer} alt="" />
              <h2 className="text-2xl font-semibold text-violet-700 mb-2 mt-3">
                Perpustakaan Digital
              </h2>
              <p className="text-white">
                Akses ke berbagai sumber belajar digital dan jurnal ilmiah
                terbaru.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Fasilitas Section End */}

      {/* Articles dynamic */}
      <div className="artikel">
        <ArticlesPage />
        <a href="/artikel">Lihat Selengkapnya</a>
      </div>

      {/* Kalender Section */}
      <div className="kalender">
        <CalendarPage />
      </div>

      {/* Reservation */}
      {/* <ReservationPage /> */}

      {/* Kontak Section Start */}
      <section id="kontak" className="kontak py-12 bg-zinc-900">
          {/* Form Kontak */}
          <div className="text-center mb-12 px-4">
              <h1 className="text-4xl font-extrabold text-violet-800 mb-4">
                Hubungi Kami
              </h1>
              <p className="text-lg text-zinc-300">
                Punya pertanyaan atau butuh bantuan? Jangan ragu untuk menghubungi kami.
              </p>
          </div>
        <div className="mx-auto px-4 grid md:grid-cols-2 gap-12 items-start">          
          <div>            
            <form className="bg-zinc-800 p-6 rounded-lg shadow-lg space-y-4">
              <div>
                <label htmlFor="name" className="block text-zinc-200 font-medium mb-2">
                  Nama
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
                  placeholder="Masukkan nama Anda"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-zinc-200 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
                  placeholder="Masukkan email Anda"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-zinc-200 font-medium mb-2">
                  Pesan
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full px-3 py-2 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
                  placeholder="Tulis pesan Anda di sini"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-violet-700 text-white px-6 py-3 rounded-lg hover:bg-violet-600 transition-colors w-full"
              >
                Kirim Pesan
              </button>
            </form>
          </div>

          {/* Informasi Kontak */}
          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg text-zinc-200 space-y-6">
            <h2 className="text-2xl font-bold text-violet-700 mb-4">Informasi Kontak</h2>
            <div className="space-y-3">
              <p className="flex items-center">
                <span className="mr-2">📍</span> Jl. Contoh No.123, Jakarta
              </p>
              <p className="flex items-center">
                <span className="mr-2">📞</span> +62 812 3456 7890
              </p>
              <p className="flex items-center">
                <span className="mr-2">📧</span> info@contoh.com
              </p>
              <p className="flex items-center">
                <span className="mr-2">⏰</span> Senin - Jumat, 09.00 - 17.00
              </p>
            </div>

            {/* Google Maps Embed */}
            <div className="overflow-hidden rounded-lg">
              <iframe
                title="lokasi-kami"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.988272247151!2d106.02950537498853!3d-5.996345293988736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e418e2782651571%3A0x249411dd80bfd66e!2sEngineering%20Faculty%20of%20Sultan%20Ageng%20Tirtayasa%20University!5e0!3m2!1sen!2sid!4v1758068928572!5m2!1sen!2sid"
                width="100%"
                height="250"
                className="border-0"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>


      {/* Kontak Section End */}
    </>
  );
}

export default App;
