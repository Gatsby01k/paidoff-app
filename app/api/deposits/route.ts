import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// Небольшой типобезопасный каст, чтобы TS не ругался на session.user
type SessionUser = { email?: string | null };
type SessionLike = { user?: SessionUser } | null;

export async function GET() {
  const session = (await getServerSession(authOptions)) as SessionLike;
  if (!session?.user?.email) return NextResponse.json({ items: [] });

  const user = await db.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ items: [] });

  const items = await db.deposit.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const session = (await getServerSession(authOptions)) as SessionLike;
  if (!session?.user?.email) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const user = await db.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { amount, days, strategy } = await req.json();
    if (!Number.isFinite(amount) || amount < 10) {
      return NextResponse.json({ ok: false, error: "Invalid amount" }, { status: 400 });
    }
    const d = await db.deposit.create({
      data: {
        userId: user.id,
        amount,
        days: Math.max(1, parseInt(String(days) || "1")),
        strategy: String(strategy || "balanced"),
      },
    });
    return NextResponse.json({ ok: true, id: d.id });
  } catch {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
