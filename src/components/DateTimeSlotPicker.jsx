import React, { useState, useEffect, useMemo } from 'react';

// Template slot waktu harian default
const DEFAULT_SLOTS = [
  { label: 'Sesi 1 (08:00 - 10:00)', start: '08:00', end: '10:00' },
  { label: 'Sesi 2 (10:00 - 12:00)', start: '10:00', end: '12:00' },
  { label: 'Sesi 3 (13:00 - 15:00)', start: '13:00', end: '15:00' },
  { label: 'Sesi 4 (15:00 - 17:00)', start: '15:00', end: '17:00' },
  { label: 'Full Day (08:00 - 17:00)', start: '08:00', end: '17:00' },
];

/* Props:
  valueStart?: ISO datetime string
  valueEnd?: ISO datetime string
  onChange: ({start,end}) => void
  label?: string
  slots?: custom template slot array
  minuteStep?: number (for custom mode, default 15)
*/
export default function DateTimeSlotPicker({ valueStart, valueEnd, onChange, label = 'Waktu', slots = DEFAULT_SLOTS, minuteStep = 15 }) {
  const today = new Date().toISOString().slice(0,10);
  const initDate = valueStart ? valueStart.slice(0,10) : today;
  const [date, setDate] = useState(initDate);
  const [mode, setMode] = useState('template'); // 'template' | 'custom'
  const [slotIndex, setSlotIndex] = useState(0);
  const [customStartHour, setCustomStartHour] = useState(8);
  const [customStartMinute, setCustomStartMinute] = useState(0);
  const [customEndHour, setCustomEndHour] = useState(10);
  const [customEndMinute, setCustomEndMinute] = useState(0);

  const minutesOptions = useMemo(() => {
    const arr = [];
    for (let m=0; m<60; m+= minuteStep) arr.push(m);
    return arr;
  }, [minuteStep]);

  useEffect(() => {
    if (mode === 'template') {
      const slot = slots[slotIndex];
      if (slot) {
        emit(slot.start, slot.end);
      }
    } else {
      const startStr = two(customStartHour)+':'+two(customStartMinute);
      const endStr = two(customEndHour)+':'+two(customEndMinute);
      emit(startStr, endStr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, slotIndex, mode, customStartHour, customStartMinute, customEndHour, customEndMinute]);

  function two(n){ return n.toString().padStart(2,'0'); }

  function emit(startHHMM, endHHMM){
    // Validasi waktu (end harus > start)
    const startDate = new Date(`${date}T${startHHMM}:00`);
    let endDate = new Date(`${date}T${endHHMM}:00`);
    if (endDate <= startDate) {
      // Auto adjust end (tambah minuteStep)
      endDate = new Date(startDate.getTime() + minuteStep*60000);
    }
    onChange && onChange({ start: startDate.toISOString().slice(0,19), end: endDate.toISOString().slice(0,19) });
  }

  // Analog-like circle hours (for custom start hour selection)
  const hours = [...Array(12)].map((_,i)=> (i+8)%24); // start display from 08 to 19 (12 positions)
  function setHourCircular(type, h){
    if (type==='start') {
      setCustomStartHour(h);
      if (h > customEndHour || (h===customEndHour && customStartMinute>=customEndMinute)) {
        setCustomEndHour(Math.min(h+1,23));
      }
    } else {
      setCustomEndHour(h);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-wide text-zinc-400">{label}</label>
        <div className="flex gap-2 text-[11px]">
          <button type="button" onClick={()=>setMode('template')} className={`px-2 py-1 rounded ${mode==='template'?'bg-violet-600':'bg-zinc-800'} hover:bg-violet-600`}>Template</button>
          <button type="button" onClick={()=>setMode('custom')} className={`px-2 py-1 rounded ${mode==='custom'?'bg-violet-600':'bg-zinc-800'} hover:bg-violet-600`}>Custom</button>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <input
          type="date"
          value={date}
          min={today}
          onChange={e=>setDate(e.target.value)}
          className="w-full p-2 rounded bg-zinc-900 border border-zinc-700"
        />
        {mode==='template' && (
          <select
            value={slotIndex}
            onChange={e=>setSlotIndex(Number(e.target.value))}
            className="w-full p-2 rounded bg-zinc-900 border border-zinc-700"
          >
            {slots.map((s,i)=>(<option key={s.label} value={i}>{s.label}</option>))}
          </select>
        )}
      </div>

      {mode==='custom' && (
        <div className="space-y-4 bg-zinc-900 rounded p-4 border border-zinc-700">
          <p className="text-xs text-zinc-400">Pilih jam (klik pada lingkaran), lalu menit.</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs mb-2 text-zinc-400">Start Hour</h4>
              <div className="relative w-40 h-40 mx-auto">
                {hours.map((h,i)=>{
                  const angle = (i / hours.length) * 2 * Math.PI - Math.PI/2;
                  const x = 70 + Math.cos(angle)*60;
                  const y = 70 + Math.sin(angle)*60;
                  const active = h===customStartHour;
                  return (
                    <button type="button" key={h} onClick={()=>setHourCircular('start',h)} className={`absolute text-xs w-8 h-8 flex items-center justify-center rounded-full ${active?'bg-violet-600 text-white':'bg-zinc-800 hover:bg-violet-700'} transition`} style={{ left: x, top: y }}>
                      {two(h)}
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 flex gap-2 items-center">
                <select value={customStartMinute} onChange={e=>setCustomStartMinute(Number(e.target.value))} className="bg-zinc-800 p-1 rounded border border-zinc-700">
                  {minutesOptions.map(m=> <option key={m} value={m}>{two(m)}</option>)}
                </select>
                <span className="text-xs text-zinc-400">Menit</span>
              </div>
            </div>
            <div>
              <h4 className="text-xs mb-2 text-zinc-400">End Hour</h4>
              <div className="relative w-40 h-40 mx-auto">
                {hours.map((h,i)=>{
                  const angle = (i / hours.length) * 2 * Math.PI - Math.PI/2;
                  const x = 70 + Math.cos(angle)*60;
                  const y = 70 + Math.sin(angle)*60;
                  const active = h===customEndHour;
                  return (
                    <button type="button" key={h} onClick={()=>setHourCircular('end',h)} className={`absolute text-xs w-8 h-8 flex items-center justify-center rounded-full ${active?'bg-violet-600 text-white':'bg-zinc-800 hover:bg-violet-700'} transition`} style={{ left: x, top: y }}>
                      {two(h)}
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 flex gap-2 items-center">
                <select value={customEndMinute} onChange={e=>setCustomEndMinute(Number(e.target.value))} className="bg-zinc-800 p-1 rounded border border-zinc-700">
                  {minutesOptions.map(m=> <option key={m} value={m}>{two(m)}</option>)}
                </select>
                <span className="text-xs text-zinc-400">Menit</span>
              </div>
            </div>
          </div>
          <div className="text-xs text-zinc-400">Start: {two(customStartHour)}:{two(customStartMinute)} | End: {two(customEndHour)}:{two(customEndMinute)}</div>
        </div>
      )}
    </div>
  );
}
