import React, { useEffect, useState } from 'react';

export default function LabStatusBar() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

  useEffect(() => {
    let cancelled = false;
    async function fetchStatus() {
      try {
        const res = await fetch(`${API_BASE}/status`);
        const raw = await res.json();
        if (!cancelled) {
          setData({
            open: raw.status === 'Buka',
            last: raw.terakhirDiubah ? new Date(raw.terakhirDiubah).toLocaleTimeString() : '',
          });
        }
      } catch (e) {
        console.error('Gagal memuat status lab', e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchStatus();
    const id = setInterval(fetchStatus, 60000);
    return () => { cancelled = true; clearInterval(id); };
  }, [API_BASE]);

  if (loading || !data) return null;
  return (
    <div className={`w-full text-center py-2 text-xs md:text-lg font-medium tracking-wide ${data.open ? 'bg-green-700' : 'bg-red-700'}`}> 
      Lab {data.open ? 'BUKA' : 'TUTUP'}
      {data.last && <span className="ml-2 opacity-80">(Update {data.last})</span>}
    </div>
  );
}
