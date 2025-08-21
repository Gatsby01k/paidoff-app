import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password || password.length < 6) {
      return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
    }
    const exists = await db.user.findUnique({ where: { email: email.toLowerCase() } });
    if (exists) return NextResponse.json({ ok: false, error: "Email already registered" }, { status: 400 });
    const passwordHash = await hash(password, 10);
    await db.user.create({ data: { name, email: email.toLowerCase(), passwordHash } });
    return NextResponse.json({ ok: true });
  } catch (e:any) {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
