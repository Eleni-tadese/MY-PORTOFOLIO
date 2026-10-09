# Eleni Tadese — Portfolio

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Postgres (Neon) via Drizzle · Cloudinary.

All site content is edited in the admin dashboard at **`/admin`**. The public
pages are statically generated and refreshed automatically whenever you save.

## How it fits together

| Piece | Where |
| --- | --- |
| Database schema | `src/db/schema.ts` (migrations in `drizzle/`) |
| Content loader (cached, with fallback) | `src/lib/content.ts` |
| Seed / fallback content | `src/content/seed.ts` |
| Admin pages | `src/app/admin/(dashboard)/…` |
| Admin Server Actions (all writes) | `src/app/admin/actions.ts` |
| Input validation | `src/lib/validation.ts` |
| Auth (session, rate limit) | `src/lib/auth/*`, `src/proxy.ts` |
| Upload signing | `src/app/api/admin/upload-signature/route.ts` |

- **Caching:** pages read content through `getSiteContent()`, cached under one
  tag. Every admin save calls `revalidateContent()`, so the next visit renders
  fresh content; everything else is served statically.
- **Fallbacks:** with no `DATABASE_URL` or an empty database the site uses
  `src/content/seed.ts`. If the database is down during a build, the seed is
  used; if it goes down later, visitors keep getting the last published pages.
- **Security:** one admin account from environment variables (bcrypt hash),
  an 8-hour signed httpOnly session cookie, login rate-limited to 5 failures
  per IP per 15 minutes, `/admin` and `/api/admin` guarded in `proxy.ts` *and*
  in every page/action, and every input validated with Zod on the server.
  Image/CV URLs must point at your Cloudinary account or this site.

## Setup

1. **Install:** `npm install`
2. **Environment:** copy `.env.example` to `.env.local` and fill it in:
   - `DATABASE_URL` — Neon **pooled** connection string.
   - `ADMIN_EMAIL` — the email you'll sign in with.
   - `ADMIN_PASSWORD_HASH` — run `npm run admin:hash` and paste the output.
   - `SESSION_SECRET` — 32+ random characters (command in `.env.example`).
   - `CLOUDINARY_*` — from your Cloudinary dashboard.
3. **Database:** `npm run db:migrate` then `npm run db:seed` (imports the
   current content; it won't overwrite existing data unless you pass
   `-- --force`).
4. **Run:** `npm run dev` → http://localhost:3000 and http://localhost:3000/admin

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` / `build` / `start` | Next.js |
| `npm run db:generate` | Create a new migration after editing `src/db/schema.ts` |
| `npm run db:migrate` | Apply migrations to `DATABASE_URL` |
| `npm run db:seed` | Seed an empty database from `src/content/seed.ts` |
| `npm run db:studio` | Browse the database (Drizzle Studio) |
| `npm run admin:hash` | Generate `ADMIN_PASSWORD_HASH` for a new password |

## Changing the admin password

Run `npm run admin:hash`, put the new value in `ADMIN_PASSWORD_HASH` (locally
and on your host), and redeploy. To sign out every session immediately, also
change `SESSION_SECRET`.
