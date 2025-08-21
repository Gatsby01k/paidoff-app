'use client';
import { useEffect, useState } from "react";

type Deposit = { id: string; amount: number; days: number; strategy: string; createdAt: string; };

export default function Deposits() {
  const [items, setItems] = useState<Deposit[]>([]);

  async function load() {
    const res = await fetch('/api/deposits');
    const j = await res.json();
    if (res.ok) setItems(j.items || []);
  }

  useEffect(()=>{ load(); }, []);
  useEffect(()=>{
    const h = () => load();
    window.addEventListener('deposits:reload', h);
    return () => window.removeEventListener('deposits:reload', h);
  }, []);

  return (
    <div className="card">
      <h3 className="font-bold mb-3">My deposits</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="opacity-70">
            <tr><th className="text-left p-2">Date</th><th className="text-left p-2">Amount</th><th className="text-left p-2">Days</th><th className="text-left p-2">Strategy</th></tr>
          </thead>
          <tbody>
            {items.length===0 && <tr><td className="p-2 opacity-70" colSpan={4}>No deposits yet</td></tr>}
            {items.map(d => (
              <tr key={d.id} className="border-t border-neutral-800">
                <td className="p-2">{new Date(d.createdAt).toLocaleString()}</td>
                <td className="p-2">${d.amount.toFixed(2)}</td>
                <td className="p-2">{d.days}</td>
                <td className="p-2 capitalize">{d.strategy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
