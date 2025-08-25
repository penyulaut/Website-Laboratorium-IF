import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

export default function CalendarPage() {
  return (
    <div className="p-6" id="calendar">
      <h2 className="text-center text-4xl font-extrabold text-violet-800 mb-4 py-9">Jadwal Laboratorium</h2>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        events={[
          { title: "Praktikum Jaringan", start: "2025-08-26" },
          {
            title: "Seminar Informatika",
            start: "2025-08-28",
            end: "2025-08-29",
          },
          { title: "Ujian Praktikum", start: "2025-09-05" },
        ]}
        selectable={true} // user bisa pilih tanggal
        editable={true} // event bisa digeser
        height="80vh" // tinggi kalender
      />
    </div>
  );
}
