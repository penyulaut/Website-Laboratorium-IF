import React, { useEffect, useState } from "react";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const API_BASE = import.meta.env.VITE_API_BASE;

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/articles`);
        const data = await res.json();
        setArticles(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [API_BASE]);

  const openArticle = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/articles/${id}`);
      const data = await res.json();
      setSelected(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="py-9" id="articles">
      <div className="mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-violet-800 mb-6">
          Artikel
        </h1>
        {loading && <div className="text-zinc-400">Memuat...</div>}
        {!loading && (
          <div className="grid md:grid-cols-3 gap-5">
            {articles.map((a) => (
              <div
                key={a.id}
                className="bg-zinc-800 rounded-xl p-5 hover:shadow-lg transition cursor-pointer"
                onClick={() => openArticle(a.id)}
              >
                <h2 className="text-xl font-semibold text-violet-600 mb-2">
                  {a.title}
                </h2>
                <p className="text-sm text-zinc-300">{a.excerpt}</p>
                <p className="text-[11px] text-zinc-500 mt-3">
                  {new Date(a.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
        {selected && (
          <div className="mt-8 bg-zinc-900 p-6 rounded-xl">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-violet-500">
                {selected.title}
              </h2>
              <button
                onClick={() => setSelected(null)}
                className="text-zinc-400 hover:text-white"
              >
                Tutup
              </button>
            </div>
            <p className="text-xs text-zinc-500 mb-4">
              {new Date(selected.createdAt).toLocaleString()}
            </p>
            <p className="leading-relaxed whitespace-pre-wrap text-zinc-100">
              {selected.body}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
