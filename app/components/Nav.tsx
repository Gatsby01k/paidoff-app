'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 z-50 bg-black/70 backdrop-blur border-b border-neutral-800">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-black text-yellow-300">PAID$OFF</Link>
        <div className="flex gap-4 text-sm">
          <Link href="/dashboard" className={pathname?.startsWith('/dashboard')?'text-yellow-300':'opacity-80 hover:opacity-100'}>Dashboard</Link>
          <Link href="/auth/signin" className={pathname==='/auth/signin'?'text-yellow-300':'opacity-80 hover:opacity-100'}>Sign in</Link>
          <Link href="/auth/signup" className={pathname==='/auth/signup'?'text-yellow-300':'opacity-80 hover:opacity-100'}>Sign up</Link>
        </div>
      </div>
    </nav>
  );
}
