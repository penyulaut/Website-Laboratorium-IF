import heroimg from "./assets/heroimg.svg";
import CalendarPage from "./pages/Calendar";

function App() {
  return (
    <>
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
              Lihat Jadwal Praktikum
            </a>
            <a
              href=""
              className="bg-zinc-700 p-4 rounded-2xl hover:bg-zinc-600"
            >
              Reservasi Lab
            </a>
          </div>
        </div>
        <img src={heroimg} alt="Hero" />
      </div>
      {/* Hero Section End */}

      {/* Tentang section Start */}
      <section className="tentang" id="tentang">
        <div className="mx-auto my-5 px-4 py-9 bg-zinc-800">
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
                  <a href="" className="bg-violet-700 p-5 rounded-2xl hover:bg-violet-600">Lihat Selengkapnya</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Tentang section End */}

      {/* Blog Section Start */}
      <section className="blog py-9">
        <div className="mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-violet-800 mb-4 pt-9">
              Artikel Terbaru
            </h1>
            <p className="text-lg">
              Dapatkan informasi terbaru seputar teknologi dan tips bermanfaat
              dari kami.
            </p>
          </div>
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
            <div className="bg-zinc-200 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform">
              <img
                src={heroimg}
                alt="Artikel 1"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-violet-700 mb-2">
                  Tips Memilih Laptop untuk Mahasiswa
                </h2>
                <p className="text-zinc-600 mb-4">
                  Memilih laptop yang tepat sangat penting bagi mahasiswa.
                  Berikut beberapa tips yang bisa membantu Anda.
                </p>
                <a href="#" className="text-violet-700 font-medium">
                  Baca Selengkapnya &rarr;
                </a>
              </div>
            </div>
            <div className="bg-zinc-200 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform">
              <img
                src={heroimg}
                alt="Artikel 2"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-violet-700 mb-2">
                  Mengenal Cloud Computing
                </h2>
                <p className="text-zinc-600 mb-4">
                  Cloud computing semakin populer di dunia teknologi. Pelajari
                  konsep dasar dan manfaatnya di sini.
                </p>
                <a href="#" className="text-violet-700 font-medium">
                  Baca Selengkapnya &rarr;
                </a>
              </div>
            </div>
            <div className="bg-zinc-200 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform">
              <img
                src={heroimg}
                alt="Artikel 3"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-violet-700 mb-2">
                  Panduan Dasar Pemrograman Python
                </h2>
                <p className="text-zinc-600 mb-4">
                  Python adalah bahasa pemrograman yang mudah dipelajari. Ikuti
                  panduan dasar ini untuk memulai.
                </p>
                <a href="#" className="text-violet-700 font-medium">
                  Baca Selengkapnya &rarr;
                </a>
              </div>
            </div>
            <div className="bg-zinc-200 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform">
              <img
                src={heroimg}
                alt="Artikel 3"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-violet-700 mb-2">
                  Panduan Dasar Pemrograman Python
                </h2>
                <p className="text-zinc-600 mb-4">
                  Python adalah bahasa pemrograman yang mudah dipelajari. Ikuti
                  panduan dasar ini untuk memulai.
                </p>
                <a href="#" className="text-violet-700 font-medium">
                  Baca Selengkapnya &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Blog Section End */}

      {/* Kalender Section Start */}
      <div>
        <div className="kalender">
          <div>
            <CalendarPage />
          </div>
        </div>
      </div>
      {/* Kalender Section End */}

      {/* Kontak Section Start*/}
      <section className="kontak py-9">
        <div className="mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-violet-800 mb-4 pt-9">
              Hubungi Kami
            </h1>
            <p className="text-lg">
              Punya pertanyaan atau butuh bantuan? Jangan ragu untuk menghubungi
              kami.
            </p>
          </div>
          <form className="max-w-xl mx-auto bg-zinc-800 p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-zinc-200 font-medium mb-2"
              >
                Nama
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
                placeholder="Masukkan nama Anda"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-zinc-200 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
                placeholder="Masukkan email Anda"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-zinc-200 font-medium mb-2"
              >
                Pesan
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
                placeholder="Tulis pesan Anda di sini"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-violet-700 text-white px-6 py-3 rounded-lg hover:bg-violet-600 transition-colors"
            >
              Kirim Pesan
            </button>
          </form>
        </div>
      </section>
      {/* Kontak Section End*/}
    </>
  );
}

export default App;
