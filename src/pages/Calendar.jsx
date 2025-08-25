import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [labStatus, setLabStatus] = useState(null);
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

  useEffect(() => {
    async function load() {
      try {
        const [sRes, stRes] = await Promise.all([
          fetch(`${API_BASE}/api/schedules`),
          fetch(`${API_BASE}/api/status`)
        ]);
        const sData = await sRes.json();
        const statusData = await stRes.json();
        setEvents(sData);
        setLabStatus(statusData);
      } catch (e) {
        console.error('Gagal memuat data jadwal/status', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [API_BASE]);

  return (
    <div className="p-6" id="calendar">
      <div className="flex flex-col items-center mb-4 py-4">
        <h2 className="text-center text-4xl font-extrabold text-violet-800 mb-2">Jadwal Laboratorium</h2>
        {labStatus && (
          <div className="text-sm flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full font-medium ${labStatus.open ? 'bg-green-600' : 'bg-red-600'}`}>
              Lab {labStatus.open ? 'BUKA' : 'TUTUP'}
            </span>
            <span className="text-zinc-300">{labStatus.note}</span>
          </div>
        )}
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
        />
      )}
    </div>
  );
}
