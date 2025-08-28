import React, { useState } from "react";
import DateTimeSlotPicker from "../components/DateTimeSlotPicker";

export default function ReservationPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    purpose: "",
    start: "",
    end: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const API_BASE = import.meta.env.VITE_API_BASE;

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch(`${API_BASE}/api/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengirim");
      setMsg({ type: "success", text: "Reservasi dikirim (pending)." });
      setForm({ name: "", email: "", purpose: "", start: "", end: "" });
    } catch (e) {
      setMsg({ type: "error", text: e.message });
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
        <form
          onSubmit={submit}
          className="bg-zinc-800 p-6 rounded-xl space-y-4"
        >
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
            onChange={({ start, end }) =>
              setForm((f) => ({ ...f, start, end }))
            }
            label="Pilih Tanggal & Slot Waktu"
          />
          <button
            disabled={loading}
            className="bg-violet-700 hover:bg-violet-600 disabled:opacity-50 px-5 py-2 rounded"
          >
            {loading ? "Mengirim..." : "Kirim Reservasi"}
          </button>
          {msg && (
            <div
              className={`text-sm ${
                msg.type === "error" ? "text-red-400" : "text-green-400"
              }`}
            >
              {msg.text}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
