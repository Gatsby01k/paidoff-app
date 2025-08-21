'use client';
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg('Signing in...');
    const res = await signIn('credentials', { redirect: false, email, password });
    if (res?.ok) {
      router.push('/dashboard');
    } else {
      setMsg(res?.error || 'Invalid credentials');
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-black mb-4">Sign in</h2>
      <form onSubmit={onSubmit} className="space-y-4 card">
        <div><label className="label">Email</label><input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
        <div><label className="label">Password</label><input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></div>
        <button className="btn btn-primary w-full" type="submit">Sign in</button>
        {msg && <p className="text-sm opacity-80">{msg}</p>}
      </form>
    </div>
  );
}
