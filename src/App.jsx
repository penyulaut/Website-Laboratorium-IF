import heroimg from "./assets/heroimg.svg";

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
              href="#"
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
      <section className="tentang">
        <div className="max-w-6xl mx-auto px-4 py-9">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-violet-800 mb-4 pt-9">
              Tentang Kami
            </h1>
            <p className="text-lg">
              Kami adalah tim Asisten Laboratorium Informatika yang berdedikasi
              untuk mendukung pembelajaran dan riset di bidang teknologi.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform">
              <img
                src={heroimg}
                alt="Komputer"
                className="w-24 h-24 mb-4"
              />
              <h2 className="text-2xl font-semibold text-violet-700 mb-2">
                Fasilitas Komputer
              </h2>
              <p className="text-zinc-600 text-center">
                Laboratorium kami dilengkapi komputer terbaru untuk mendukung
                praktikum dan penelitian mahasiswa.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform">
              <img
                src={heroimg}
                alt="Jaringan"
                className="w-24 h-24 mb-4"
              />
              <h2 className="text-2xl font-semibold text-violet-700 mb-2">
                Jaringan Internet
              </h2>
              <p className="text-zinc-600 text-center">
                Akses internet cepat dan stabil tersedia untuk menunjang
                aktivitas belajar dan riset.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform">
              <img
                src={heroimg}
                alt="Pendampingan"
                className="w-24 h-24 mb-4"
              />
              <h2 className="text-2xl font-semibold text-violet-700 mb-2">
                Pendampingan Asisten
              </h2>
              <p className="text-zinc-600 text-center">
                Asisten siap membantu mahasiswa dalam memahami materi praktikum
                dan menyelesaikan tugas.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Tentang section End */}
    </>
  );
}

export default App;
