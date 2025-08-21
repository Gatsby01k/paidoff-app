import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black">PaidOFF App</h1>
      <p className="opacity-80">
        Это личный кабинет. Зарегистрируйтесь и войдите, чтобы создавать депозиты и выбирать срок торговли.
      </p>
      <div className="flex gap-3">
        <Link href="/auth/signup" className="btn btn-primary">Sign up</Link>
        <Link href="/auth/signin" className="btn border border-neutral-700">Sign in</Link>
      </div>
      <p className="text-sm opacity-70">
        Маркетинговый сайт оставь в текущем проекте Vercel. Этот проект — для <b>app.paidoff.ai</b>.
      </p>
    </div>
  );
}
