import React, { useEffect, useState } from "react";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const API_BASE = import.meta.env.VITE_API_BASE;

  useEffect(() => {
    load();
  }, [API_BASE]);

  async function load(){
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/artikel`);
      const data = await res.json();
      setArticles(Array.isArray(data)? data: []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const openArticle = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/artikel/${id}`);
      const data = await res.json();
      setSelected(data);
    } catch (e) {
      console.error(e);
    }
  };

  function imgUrl(file){
    if(!file) return null;
    return `${API_BASE}/uploads/${file}`;
  }

  return (
    <section className="py-9" id="articles">
      <div className="mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-violet-800 mb-6">
          Artikel
        </h1>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={load} className="text-xs bg-zinc-800 hover:bg-violet-600 px-3 py-1 rounded">
            Refresh
          </button>
          {!loading && <span className="text-[11px] text-zinc-500">{articles.length} artikel</span>}
        </div>
        {loading && <div className="text-zinc-400">Memuat...</div>}
        {!loading && articles.length === 0 && (
          <div className="text-zinc-500 text-sm">Belum ada artikel.</div>
        )}
        {!loading && articles.length > 0 && (
          <div className="grid md:grid-cols-3 gap-5">
            {articles.map((a) => (
              <div key={a._id} className="bg-zinc-800 rounded-xl hover:shadow-lg transition cursor-pointer flex flex-col" onClick={() => openArticle(a._id)}>
                {a.gambar && (
                  <div className="h-40 w-full overflow-hidden rounded-t-xl bg-zinc-700">
                    <img src={imgUrl(a.gambar)} alt={a.judul} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-5 flex-1 flex flex-col">
                  <h2 className="text-xl font-semibold text-violet-600 mb-2 line-clamp-2">{a.judul}</h2>
                  <p className="text-sm text-zinc-300 line-clamp-3 flex-1">{a.isi?.slice(0,120)}{a.isi && a.isi.length>120 ? '…' : ''}</p>
                  <p className="text-[11px] text-zinc-500 mt-3">{a.Tanggal ? new Date(a.Tanggal).toLocaleDateString() : ''}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {selected && (
          <div className="mt-8 bg-zinc-900 p-6 rounded-xl">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-violet-500">
                {selected.judul}
              </h2>
              <button
                onClick={() => setSelected(null)}
                className="text-zinc-400 hover:text-white"
              >
                Tutup
              </button>
            </div>
            <p className="text-xs text-zinc-500 mb-4">
              {selected.Tanggal ? new Date(selected.Tanggal).toLocaleString() : ''}
            </p>
            {selected.gambar && (
              <div className="mb-5 border border-zinc-700 rounded overflow-hidden max-h-[420px] flex justify-center bg-zinc-800">
                <img src={imgUrl(selected.gambar)} alt={selected.judul} className="object-contain max-h-[420px]" />
              </div>
            )}
            <p className="leading-relaxed whitespace-pre-wrap text-zinc-100">
              {selected.isi}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
