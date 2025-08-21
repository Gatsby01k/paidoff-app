'use client';
import { useState } from "react";

export default function Form() {
  const [amount, setAmount] = useState(100);
  const [days, setDays] = useState(7);
  const [strategy, setStrategy] = useState('balanced');
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg('Saving...');
    const res = await fetch('/api/deposits', {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ amount, days, strategy })
    });
    const j = await res.json();
    setMsg(res.ok ? 'Saved!' : (j.error || 'Error'));
    if (res.ok) {
      setAmount(100); setDays(7); setStrategy('balanced');
      window.dispatchEvent(new CustomEvent('deposits:reload'));
    }
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <div><label className="label">Amount (USD)</label><input type="number" className="input" min={10} value={amount} onChange={e=>setAmount(parseFloat(e.target.value)||0)} required/></div>
        <div><label className="label">Days</label><input type="number" className="input" min={1} max={365} value={days} onChange={e=>setDays(parseInt(e.target.value)||1)} required/></div>
        <div><label className="label">Strategy</label>
          <select className="input" value={strategy} onChange={e=>setStrategy(e.target.value)}>
            <option value="conservative">Conservative</option>
            <option value="balanced">Balanced</option>
            <option value="aggressive">Aggressive</option>
          </select>
        </div>
      </div>
      <button className="btn btn-primary" type="submit">Create deposit</button>
      {msg && <p className="text-sm opacity-80">{msg}</p>}
    </form>
  );
}
