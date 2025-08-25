import React, { useState, useEffect } from 'react';

export default function AdminPanel() {
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';
  const [token, setToken] = useState(() => localStorage.getItem('adm_token') || '');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState(null);
  const [statusForm, setStatusForm] = useState({ open: true, note: '' });
  const [articleForm, setArticleForm] = useState({ title: '', body: '', excerpt: '' });
  const [scheduleForm, setScheduleForm] = useState({ title: '', start: '', end: '' });
  const [message, setMessage] = useState(null);

  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    fetch(`${API_BASE}/api/status`).then(r=>r.json()).then(d=> { setStatus(d); setStatusForm({ open: d.open, note: d.note || '' }); });
  }, [API_BASE]);

  const login = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(loginForm)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login gagal');
      setToken(data.token); localStorage.setItem('adm_token', data.token);
      setMessage({ type: 'success', text: 'Login sukses' });
    } catch (e) { setMessage({ type: 'error', text: e.message }); }
  };

  const updateStatus = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', ...authHeaders }, body: JSON.stringify(statusForm) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal update status');
      setStatus(data); setMessage({ type: 'success', text: 'Status lab diperbarui' });
    } catch (e) { setMessage({ type: 'error', text: e.message }); }
  };

  const createArticle = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/articles`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeaders }, body: JSON.stringify(articleForm) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal membuat artikel');
      setArticleForm({ title: '', body: '', excerpt: '' });
      setMessage({ type: 'success', text: 'Artikel dibuat' });
    } catch (e) { setMessage({ type: 'error', text: e.message }); }
  };

  const createSchedule = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/schedules`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeaders }, body: JSON.stringify(scheduleForm) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal menambah jadwal');
      setScheduleForm({ title: '', start: '', end: '' });
      setMessage({ type: 'success', text: 'Jadwal dibuat' });
    } catch (e) { setMessage({ type: 'error', text: e.message }); }
  };

  return (
    <section className="py-9" id="admin">
      <div className="mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl font-extrabold text-violet-800 mb-6">Admin Panel</h1>
        {message && <div className={`mb-4 text-sm ${message.type==='error'?'text-red-400':'text-green-400'}`}>{message.text}</div>}
        {!token && (
          <form onSubmit={login} className="bg-zinc-800 p-6 rounded-xl mb-8 max-w-md space-y-4">
            <h2 className="text-xl font-semibold text-violet-500">Login Admin</h2>
            <input placeholder="Email" type="email" required value={loginForm.email} onChange={e=>setLoginForm(f=>({...f,email:e.target.value}))} className="w-full p-2 rounded bg-zinc-900 border border-zinc-700" />
            <input placeholder="Password" type="password" required value={loginForm.password} onChange={e=>setLoginForm(f=>({...f,password:e.target.value}))} className="w-full p-2 rounded bg-zinc-900 border border-zinc-700" />
            <button className="bg-violet-700 hover:bg-violet-600 px-4 py-2 rounded">Login</button>
          </form>
        )}
        {token && (
          <div className="space-y-10">
            <form onSubmit={updateStatus} className="bg-zinc-800 p-6 rounded-xl space-y-4">
              <h2 className="text-lg font-semibold text-violet-400">Status Lab</h2>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={statusForm.open} onChange={e=>setStatusForm(f=>({...f, open:e.target.checked}))} /> Buka?
                </label>
                <input placeholder="Catatan" value={statusForm.note} onChange={e=>setStatusForm(f=>({...f, note:e.target.value}))} className="flex-1 p-2 rounded bg-zinc-900 border border-zinc-700" />
                <button className="bg-violet-700 hover:bg-violet-600 px-4 py-2 rounded">Simpan</button>
              </div>
              {status && <p className="text-xs text-zinc-500">Update terakhir: {new Date(status.updatedAt).toLocaleString()}</p>}
            </form>

            <form onSubmit={createArticle} className="bg-zinc-800 p-6 rounded-xl space-y-3">
              <h2 className="text-lg font-semibold text-violet-400">Tambah Artikel</h2>
              <input placeholder="Judul" required value={articleForm.title} onChange={e=>setArticleForm(f=>({...f, title:e.target.value}))} className="w-full p-2 rounded bg-zinc-900 border border-zinc-700" />
              <textarea placeholder="Isi" required rows={6} value={articleForm.body} onChange={e=>setArticleForm(f=>({...f, body:e.target.value}))} className="w-full p-2 rounded bg-zinc-900 border border-zinc-700" />
              <input placeholder="Excerpt (opsional)" value={articleForm.excerpt} onChange={e=>setArticleForm(f=>({...f, excerpt:e.target.value}))} className="w-full p-2 rounded bg-zinc-900 border border-zinc-700" />
              <button className="bg-violet-700 hover:bg-violet-600 px-4 py-2 rounded">Publikasi</button>
            </form>

            <form onSubmit={createSchedule} className="bg-zinc-800 p-6 rounded-xl space-y-3">
              <h2 className="text-lg font-semibold text-violet-400">Tambah Jadwal</h2>
              <input placeholder="Judul" required value={scheduleForm.title} onChange={e=>setScheduleForm(f=>({...f,title:e.target.value}))} className="w-full p-2 rounded bg-zinc-900 border border-zinc-700" />
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs">Mulai</label>
                  <input type="datetime-local" required value={scheduleForm.start} onChange={e=>setScheduleForm(f=>({...f,start:e.target.value}))} className="w-full p-2 rounded bg-zinc-900 border border-zinc-700" />
                </div>
                <div>
                  <label className="text-xs">Selesai</label>
                  <input type="datetime-local" value={scheduleForm.end} onChange={e=>setScheduleForm(f=>({...f,end:e.target.value}))} className="w-full p-2 rounded bg-zinc-900 border border-zinc-700" />
                </div>
              </div>
              <button className="bg-violet-700 hover:bg-violet-600 px-4 py-2 rounded">Tambah</button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
