import React, { useEffect, useState } from 'react';

export default function LabStatusBar() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

  useEffect(() => {
    let cancelled = false;
    async function fetchStatus() {
      try {
        const res = await fetch(`${API_BASE}/api/status`);
        const data = await res.json();
        if (!cancelled) setStatus(data);
      } catch (e) {
        console.error('Gagal memuat status lab', e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchStatus();
    const id = setInterval(fetchStatus, 60000); // refresh tiap menit
    return () => { cancelled = true; clearInterval(id); };
  }, [API_BASE]);

  if (loading) return null;
  if (!status) return null;
  return (
    <div className={`w-full text-center py-2 text-sm font-medium ${status.open ? 'bg-green-700' : 'bg-red-700'}`}> 
      Lab {status.open ? 'BUKA' : 'TUTUP'} - {status.note}
    </div>
  );
}
