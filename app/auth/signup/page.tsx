'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg('Creating account...');
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const j = await res.json();
    if (res.ok && j.ok) {
      setMsg('Account created. You can sign in now.');
      setTimeout(()=> router.push('/auth/signin'), 600);
    } else {
      setMsg(j.error || 'Error');
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-black mb-4">Create account</h2>
      <form onSubmit={onSubmit} className="space-y-4 card">
        <div><label className="label">Name</label><input className="input" value={name} onChange={e=>setName(e.target.value)} required minLength={2}/></div>
        <div><label className="label">Email</label><input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
        <div><label className="label">Password</label><input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required minLength={6}/></div>
        <button className="btn btn-primary w-full" type="submit">Sign up</button>
        {msg && <p className="text-sm opacity-80">{msg}</p>}
      </form>
    </div>
  );
}
