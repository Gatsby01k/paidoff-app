# PaidOFF App (Next.js + NextAuth + Prisma)

Личный кабинет: регистрация/логин и создание депозитов.

## Быстрый запуск (локально)
```bash
npm install
# Создайте .env на основе .env.example
# Установите DATABASE_URL (Neon/Supabase), NEXTAUTH_SECRET, NEXTAUTH_URL=http://localhost:3000
npx prisma migrate deploy
npm run dev
```

## Деплой на Vercel (отдельный проект)
1. Создай базу Postgres в Neon (или Supabase) → скопируй `DATABASE_URL`.
2. В Vercel → Project → Settings → Environment Variables добавь:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET` (рандомная строка)
   - `NEXTAUTH_URL` (адрес проекта, Vercel даст после первого деплоя)
3. В Build Command поставь: `npx prisma migrate deploy && next build`
4. Деплой → /auth/signup, /auth/signin, /dashboard
