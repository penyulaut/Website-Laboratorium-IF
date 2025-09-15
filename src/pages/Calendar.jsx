import React, { useEffect, useState, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [rawReservations, setRawReservations] = useState([]); // simpan semua tanpa filter
  const [loading, setLoading] = useState(true);
  const [labStatus, setLabStatus] = useState(null);
  const [statusFilter, setStatusFilter] = useState({ Pending: true, Disetujui: true, Ditolak: false });
  const API_BASE = import.meta.env.VITE_API_BASE;

  useEffect(() => {
    async function load() {
      try {
        const [resvRes, statusRes] = await Promise.all([
          fetch(`${API_BASE}/reservasi`), // sekarang ambil semua status
          fetch(`${API_BASE}/status`)
        ]);
        const [reservasiData, statusData] = await Promise.all([
          resvRes.json(), statusRes.json()
        ]);
        const colorMap = { Pending: '#fbbf24', Disetujui: '#10b981', Ditolak: '#ef4444' };
        setRawReservations(reservasiData);
        const ev = reservasiData.map(r => {
          const baseDate = new Date(r.tanggal);
          function build(dtStr){
            // r.tanggal is ISO date or date string, combine with HH:MM
            const [HH,MM] = dtStr.split(':');
            const d = new Date(baseDate);
            d.setHours(Number(HH), Number(MM), 0, 0);
            return d.toISOString();
          }
          return {
            id: r._id,
            title: `${r.keperluan} (${r.status})`,
            start: build(r.waktuMulai),
            end: build(r.waktuSelesai),
            backgroundColor: colorMap[r.status] || '#6366f1',
            borderColor: colorMap[r.status] || '#6366f1',
            extendedProps: { ...r }
          };
        });
        setEvents(ev);
        setLabStatus({ open: statusData.status === 'Buka', note: new Date(statusData.terakhirDiubah).toLocaleString() });
      } catch (e) {
        console.error('Gagal memuat data reservasi/status', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [API_BASE]);

  // Refilter events when statusFilter or rawReservations changes
  useEffect(() => {
    if (!rawReservations.length) return;
    const colorMap = { Pending: '#fbbf24', Disetujui: '#10b981', Ditolak: '#ef4444' };
    const filtered = rawReservations.filter(r => statusFilter[r.status]);
    const ev = filtered.map(r => {
      const baseDate = new Date(r.tanggal);
      function build(dtStr){
        const [HH,MM] = dtStr.split(':');
        const d = new Date(baseDate);
        d.setHours(Number(HH), Number(MM), 0, 0);
        return d.toISOString();
      }
      return {
        id: r._id,
        title: `${r.keperluan} (${r.status})`,
        start: build(r.waktuMulai),
        end: build(r.waktuSelesai),
        backgroundColor: colorMap[r.status] || '#6366f1',
        borderColor: colorMap[r.status] || '#6366f1',
        extendedProps: { ...r }
      };
    });
    setEvents(ev);
  }, [statusFilter, rawReservations]);

  function toggleStatus(key){
    setStatusFilter(f => ({ ...f, [key]: !f[key] }));
  }

  return (
    <div className="p-6" id="calendar">
      <div className="flex flex-col items-center mb-4 py-4">
        <h2 className="text-center text-4xl font-extrabold text-violet-800 mb-2">
          Jadwal Laboratorium
        </h2>
        {labStatus && (
          <div className="text-sm flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full font-medium ${
                labStatus.open ? "bg-green-600" : "bg-red-600"
              }`}
            >
              Lab {labStatus.open ? "BUKA" : "TUTUP"}
            </span>
            <span className="text-zinc-300">{labStatus.note}</span>
          </div>
        )}
        <div className="flex flex-wrap gap-4 mt-4 text-[11px] md:text-xs items-center justify-center">
          {['Pending','Disetujui','Ditolak'].map(s => (
            <label key={s} className="flex items-center gap-1 cursor-pointer select-none">
              <input type="checkbox" checked={statusFilter[s]} onChange={()=>toggleStatus(s)} className="accent-violet-600" />
              <span className="flex items-center gap-1">
                <span className={`w-3 h-3 rounded ${s==='Pending'?'bg-[#fbbf24]': s==='Disetujui'?'bg-[#10b981]':'bg-[#ef4444]'}`}></span>{s}
              </span>
            </label>
          ))}
        </div>
      </div>
      {loading ? (
        <div className="text-center text-zinc-400">Memuat jadwal...</div>
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          events={events}
          selectable={false}
          editable={false}
          height="80vh"
          eventDidMount={(info) => {
            const p = info.event.extendedProps;
            info.el.title = `${p.nama} | ${p.keperluan}\n${p.waktuMulai}-${p.waktuSelesai}\nStatus: ${p.status}`;
          }}
        />
      )}
    </div>
  );
}
