import React, { useState } from "react";
import DateTimeSlotPicker from "../components/DateTimeSlotPicker";

export default function ReservationPage() {
  const [form, setForm] = useState({
    name: "",
    nim: "",
    email: "",
    purpose: "",
    start: "",
    end: "",
  });
  const [slotLabel, setSlotLabel] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      if (!form.start || !form.end) {
        throw new Error('Pilih slot waktu terlebih dahulu');
      }

      const tanggal = form.start.slice(0,10);
      const waktuMulai = form.start.slice(11,16);
      const waktuSelesai = form.end.slice(11,16);

      const payload = {
        nama: form.name,
        nim: form.nim || undefined,
        email: form.email,
        keperluan: form.purpose,
        tanggal,
        waktuMulai,
        waktuSelesai
      };

      console.log('Kirim reservasi ke', `${API_BASE}/reservasi`, payload);
      const res = await fetch(`${API_BASE}/reservasi`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      let data = {};
      try { data = await res.json(); } catch(_) {}
      if (!res.ok) {
        throw new Error(data.message || `Gagal mengirim reservasi (HTTP ${res.status})`);
      }
      setMsg({ type: 'success', text: 'Reservasi terkirim. Status: Pending' });
      setForm(f => ({ ...f, purpose: '', start: '', end: '' }));
      setSlotLabel('');
    } catch (e2) {
      if (e2.name === 'TypeError') {
        setMsg({ type: 'error', text: 'Tidak dapat terhubung ke server.' });
      } else {
        setMsg({ type: 'error', text: e2.message });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-9" id="reservasi">
      <div className="mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-extrabold text-violet-800 mb-6">
          Reservasi Lab
        </h1>
        <form onSubmit={submit} className="bg-zinc-800 p-6 rounded-xl space-y-4">
          <div>
            <label className="block text-sm mb-1">Nama</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              required
              className="w-full p-2 rounded bg-zinc-900 border border-zinc-700"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">NIM (Opsional)</label>
            <input
              name="nim"
              value={form.nim}
              onChange={onChange}
              className="w-full p-2 rounded bg-zinc-900 border border-zinc-700"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              required
              className="w-full p-2 rounded bg-zinc-900 border border-zinc-700"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Keperluan / Judul</label>
            <input
              name="purpose"
              value={form.purpose}
              onChange={onChange}
              required
              className="w-full p-2 rounded bg-zinc-900 border border-zinc-700"
            />
          </div>
          <DateTimeSlotPicker
            valueStart={form.start}
            valueEnd={form.end}
            allowCustom={false}
            onChange={({ start, end, label }) => {
              setForm(f => ({ ...f, start, end }));
              setSlotLabel(label || "");
            }}
            label="Pilih Tanggal & Slot Waktu"
          />
          {slotLabel && (
            <div className="text-xs text-zinc-400 -mt-2">
              Slot dipilih: {slotLabel}
            </div>
          )}
          <button
            disabled={loading}
            className="bg-violet-700 hover:bg-violet-600 disabled:opacity-50 px-5 py-2 rounded"
          >
            {loading ? "Mengirim..." : "Kirim Reservasi"}
          </button>
          {msg && (
            <div className={`text-sm ${msg.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>
              {msg.text}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}