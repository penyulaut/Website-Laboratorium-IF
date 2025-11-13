import React, { useState, useEffect } from "react";

export default function AdminPanel() {
  const API_BASE = import.meta.env.VITE_API_BASE;
  const [token, setToken] = useState(
    () => localStorage.getItem("adm_token") || ""
  );
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [role, setRole] = useState(() => localStorage.getItem('adm_role') || '');
  const [status, setStatus] = useState(null);
  const [statusForm, setStatusForm] = useState({ status: 'Buka' });
  const [articleForm, setArticleForm] = useState({
    judul: "",
    isi: "",
    gambar: null
  });
  const [message, setMessage] = useState(null);
  const [reservasi, setReservasi] = useState([]);
  const [resvLoading, setResvLoading] = useState(false);
  const [resvFilter, setResvFilter] = useState('Pending');
  const [newAdminForm, setNewAdminForm] = useState({ email:'', password:'', role:'admin' });
  const [admins, setAdmins] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [contactLoading, setContactLoading] = useState(false);

  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  // Helper fetch dengan token otomatis
  async function authFetch(url, options={}) {
    const headers = { ...(options.headers||{}) };
    if (token) headers.Authorization = `Bearer ${token}`;
    const res = await fetch(url, { ...options, headers });
    return res;
  }

  useEffect(() => {
    fetch(`${API_BASE}/status`)
      .then(r=>r.json())
      .then(d=>{
        setStatus(d);
        setStatusForm({ status: d.status });
      })
      .catch(()=>{});
    loadReservasi('Pending');
  }, [API_BASE]);

  async function loadReservasi(filter){
    setResvLoading(true);
    try{
      const url = filter && filter !== 'Semua' ? `${API_BASE}/reservasi?status=${encodeURIComponent(filter)}` : `${API_BASE}/reservasi`;
      const res = await fetch(url);
      const data = await res.json();
      setReservasi(Array.isArray(data)? data: []);
    }catch(e){
      console.error(e);
    }finally{
      setResvLoading(false);
    }
  }

  async function loadKontak(){
    if(!token) return;
    setContactLoading(true);
    try {
      const res = await authFetch(`${API_BASE}/kontak`);
      const data = await res.json();
      if(!res.ok) throw new Error(data.message || 'Gagal memuat pesan kontak');
      setContactMessages(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setMessage({ type: 'error', text: e.message });
    } finally {
      setContactLoading(false);
    }
  }

  async function fetchAdmins(){
    if(!token) return;
    try {
    const res = await authFetch(`${API_BASE}/auth/admins`);
      if(!res.ok) return;
      const data = await res.json();
      setAdmins(Array.isArray(data)? data: []);
    } catch(e){ /* ignore */ }
  }
  useEffect(() => {
    if (token) {
      fetchAdmins();
      loadKontak();
    } else {
      setAdmins([]);
      setContactMessages([]);
    }
  }, [token]);

  const login = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Login gagal");
      setToken(data.token);
      setRole(data.role || '');
      localStorage.setItem("adm_token", data.token);
      if(data.role) localStorage.setItem('adm_role', data.role);
      setMessage({ type: "success", text: "Login sukses" });
    } catch (e) {
      setMessage({ type: "error", text: e.message });
    }
  };

  async function createNewAdmin(e){
    e.preventDefault();
    try {
      const res = await authFetch(`${API_BASE}/auth/admins`, {
        method:'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(newAdminForm)
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data.message || 'Gagal membuat admin');
      setMessage({ type:'success', text:'Admin baru dibuat'});
      setNewAdminForm({ email:'', password:'', role:'admin' });
      fetchAdmins();
    } catch(e){
      setMessage({ type:'error', text:e.message });
    }
  }

  const updateStatus = async (e) => {
    e.preventDefault();
    try {
      const payload = { status: statusForm.status };
      const res = await authFetch(`${API_BASE}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data.message || 'Gagal update status');
      setStatus(data);
      setMessage({ type: 'success', text: 'Status lab diperbarui' });
    } catch(e){
      setMessage({ type: 'error', text: e.message });
    }
  };

  const createArticle = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('judul', articleForm.judul);
      formData.append('isi', articleForm.isi);
      if(articleForm.gambar) formData.append('gambar', articleForm.gambar);
      const res = await authFetch(`${API_BASE}/artikel`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data.message || 'Gagal membuat artikel');
      setArticleForm({ judul: '', isi: '', gambar: null });
      setMessage({ type: 'success', text: 'Artikel dibuat' });
    } catch(e){
      setMessage({ type: 'error', text: e.message });
    }
  };

  async function updateResvStatus(id, status){
    try {
      const res = await authFetch(`${API_BASE}/reservasi/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data.message || 'Gagal update status');
      setMessage({ type:'success', text:`Status diubah ke ${status}` });
      loadReservasi(resvFilter);
    } catch(e){
      setMessage({ type:'error', text:e.message });
    }
  }

  async function deleteResv(id){
    if(!confirm('Hapus reservasi ini?')) return;
    try {
  const res = await authFetch(`${API_BASE}/reservasi/${id}`, { method:'DELETE' });
      const data = await res.json();
      if(!res.ok) throw new Error(data.message || 'Gagal menghapus');
      setMessage({ type:'success', text:'Reservasi dihapus' });
      loadReservasi(resvFilter);
    } catch(e){
      setMessage({ type:'error', text:e.message });
    }
  }

  // remove createSchedule dead code

  return (
    <section className="py-9" id="admin">
      <div className="mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl font-extrabold text-violet-800 mb-6">
          Admin Panel
        </h1>
        {message && (
          <div
            className={`mb-4 text-sm ${
              message.type === "error" ? "text-red-400" : "text-green-400"
            }`}
          >
            {message.text}
          </div>
        )}
        {!token && (
          <form
            onSubmit={login}
            className="bg-zinc-800 p-6 rounded-xl mb-8 max-w-md space-y-4"
          >
            <h2 className="text-xl font-semibold text-violet-500">
              Login Admin
            </h2>
            <input
              placeholder="Email"
              type="email"
              required
              value={loginForm.email}
              onChange={(e) =>
                setLoginForm((f) => ({ ...f, email: e.target.value }))
              }
              className="w-full p-2 rounded bg-zinc-900 border border-zinc-700"
            />
            <input
              placeholder="Password"
              type="password"
              required
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm((f) => ({ ...f, password: e.target.value }))
              }
              className="w-full p-2 rounded bg-zinc-900 border border-zinc-700"
            />
            <button className="bg-violet-700 hover:bg-violet-600 px-4 py-2 rounded">
              Login
            </button>
          </form>
        )}
        {token && (
          <div className="space-y-10">
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setToken("");
                  setRole("");
                  setContactMessages([]);
                  localStorage.removeItem("adm_token");
                  localStorage.removeItem("adm_role");
                }}
                className="text-xs text-red-400 hover:text-red-300 underline"
              >
                Logout
              </button>
            </div>
            <form onSubmit={updateStatus} className="bg-zinc-800 p-6 rounded-xl space-y-4">
              <h2 className="text-lg font-semibold text-violet-400">Status Lab</h2>
              <div className="flex items-center gap-4">
                <select
                  value={statusForm.status}
                  onChange={e=> setStatusForm({ status: e.target.value })}
                  className="p-2 rounded bg-zinc-900 border border-zinc-700"
                >
                  <option value="Buka">Buka</option>
                  <option value="Tutup">Tutup</option>
                </select>
                <button className="bg-violet-700 hover:bg-violet-600 px-4 py-2 rounded">Simpan</button>
              </div>
              {status && (
                <p className="text-xs text-zinc-500">Terakhir diubah: {new Date(status.terakhirDiubah).toLocaleString()}</p>
              )}
            </form>

            <form onSubmit={createArticle} className="bg-zinc-800 p-6 rounded-xl space-y-3">
              <h2 className="text-lg font-semibold text-violet-400">Tambah Artikel</h2>
              <input
                placeholder="Judul"
                required
                value={articleForm.judul}
                onChange={e=> setArticleForm(f=> ({ ...f, judul: e.target.value }))}
                className="w-full p-2 rounded bg-zinc-900 border border-zinc-700"
              />
              <textarea
                placeholder="Isi"
                required
                rows={6}
                value={articleForm.isi}
                onChange={e=> setArticleForm(f=> ({ ...f, isi: e.target.value }))}
                className="w-full p-2 rounded bg-zinc-900 border border-zinc-700"
              />
              <input
                type="file"
                accept="image/*"
                onChange={e=> setArticleForm(f=> ({ ...f, gambar: e.target.files?.[0] || null }))}
                className="w-full text-sm"
              />
              <button className="bg-violet-700 hover:bg-violet-600 px-4 py-2 rounded">Publikasi</button>
            </form>

            {role === 'super' && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-zinc-800 p-6 rounded-xl space-y-3">
                  <h2 className="text-lg font-semibold text-violet-400">Daftar Admin</h2>
                  <ul className="text-xs space-y-1 max-h-40 overflow-auto">
                    {admins.map(a=> <li key={a.email} className="flex justify-between border-b border-zinc-700 py-1"><span>{a.email}</span><span className="text-violet-400">{a.role}</span></li>) }
                  </ul>
                </div>
                <form onSubmit={createNewAdmin} className="bg-zinc-800 p-6 rounded-xl space-y-3">
                  <h2 className="text-lg font-semibold text-violet-400">Tambah Admin Baru</h2>
                  <input
                    placeholder="Email"
                    type="email"
                    required
                    value={newAdminForm.email}
                    onChange={e=> setNewAdminForm(f=> ({ ...f, email: e.target.value }))}
                    className="w-full p-2 rounded bg-zinc-900 border border-zinc-700"
                  />
                  <input
                    placeholder="Password"
                    type="password"
                    required
                    value={newAdminForm.password}
                    onChange={e=> setNewAdminForm(f=> ({ ...f, password: e.target.value }))}
                    className="w-full p-2 rounded bg-zinc-900 border border-zinc-700"
                  />
                  <select
                    value={newAdminForm.role}
                    onChange={e=> setNewAdminForm(f=> ({ ...f, role: e.target.value }))}
                    className="w-full p-2 rounded bg-zinc-900 border border-zinc-700"
                  >
                    <option value="admin">admin</option>
                    <option value="super">super</option>
                  </select>
                  <button className="bg-violet-700 hover:bg-violet-600 px-4 py-2 rounded">Buat Admin</button>
                  <p className="text-[10px] text-zinc-500">Hanya role super yang dapat membuat admin baru.</p>
                </form>
              </div>
            )}

            {/* Seksi jadwal dihapus karena belum ada endpoint khusus. */}
            <div className="bg-zinc-800 p-6 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-violet-400">Reservasi</h2>
                <div className="flex items-center gap-2 text-xs">
                  <select value={resvFilter} onChange={e=> { setResvFilter(e.target.value); loadReservasi(e.target.value); }} className="bg-zinc-900 border border-zinc-700 p-1 rounded">
                    <option>Pending</option>
                    <option>Disetujui</option>
                    <option>Ditolak</option>
                    <option>Semua</option>
                  </select>
                  <button onClick={()=>loadReservasi(resvFilter)} type="button" className="px-2 py-1 bg-violet-700 hover:bg-violet-600 rounded">Refresh</button>
                </div>
              </div>
              {resvLoading && <div className="text-zinc-400 text-sm">Memuat...</div>}
              {!resvLoading && reservasi.length === 0 && (
                <div className="text-zinc-500 text-sm">Tidak ada data.</div>
              )}
              <div className="space-y-3 max-h-96 overflow-auto pr-2">
                {reservasi.map(r => (
                  <div key={r._id} className="border border-zinc-700 rounded p-3 text-xs flex flex-col gap-1 bg-zinc-900">
                    <div className="flex justify-between">
                      <span className="font-semibold text-violet-300">{r.nama}</span>
                      <span className={`px-2 py-[2px] rounded-full text-[10px] font-medium ${r.status === 'Pending' ? 'bg-yellow-600' : r.status === 'Disetujui' ? 'bg-green-600' : 'bg-red-600'}`}>{r.status}</span>
                    </div>
                    <div className="text-zinc-400">{r.keperluan}</div>
                    <div className="text-zinc-500">{new Date(r.tanggal).toLocaleDateString()} {r.waktuMulai}-{r.waktuSelesai}</div>
                    <div className="flex gap-2 mt-1 flex-wrap">
                      {r.status !== 'Disetujui' && <button onClick={()=>updateResvStatus(r._id,'Disetujui')} className="px-2 py-1 bg-green-700 hover:bg-green-600 rounded" type="button">Approve</button>}
                      {r.status !== 'Ditolak' && <button onClick={()=>updateResvStatus(r._id,'Ditolak')} className="px-2 py-1 bg-red-700 hover:bg-red-600 rounded" type="button">Tolak</button>}
                      {r.status !== 'Pending' && <button onClick={()=>updateResvStatus(r._id,'Pending')} className="px-2 py-1 bg-yellow-700 hover:bg-yellow-600 rounded" type="button">Reset</button>}
                      <button onClick={()=>deleteResv(r._id)} className="px-2 py-1 bg-zinc-700 hover:bg-zinc-600 rounded" type="button">Hapus</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-zinc-800 p-6 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-violet-400">Pesan Kontak</h2>
                <button
                  type="button"
                  onClick={loadKontak}
                  className="px-3 py-1 bg-violet-700 hover:bg-violet-600 rounded text-xs"
                >
                  Refresh
                </button>
              </div>
              {contactLoading && <p className="text-sm text-zinc-400">Memuat...</p>}
              {!contactLoading && contactMessages.length === 0 && (
                <p className="text-sm text-zinc-500">Belum ada pesan.</p>
              )}
              <div className="space-y-3 max-h-80 overflow-auto pr-2">
                {contactMessages.map((msg) => (
                  <div key={msg._id} className="border border-zinc-700 rounded p-3 text-sm bg-zinc-900">
                    <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                      <span>{msg.email}</span>
                      <span>{msg.tanggal ? new Date(msg.tanggal).toLocaleString() : ''}</span>
                    </div>
                    <div className="text-violet-300 font-semibold text-sm">{msg.nama}</div>
                    <p className="text-zinc-200 whitespace-pre-wrap mt-1">{msg.pesan}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
