# DevCraft Studio Portfolio (Monorepo)

Highly animated, premium-style business portfolio using:
- Next.js (App Router) + Tailwind + Framer Motion
- Next.js API routes (single deployment)
- PostgreSQL + Prisma
- Shared UI package (`packages/ui`)

## Project Structure

- `apps/frontend` - Next.js frontend
- `apps/backend` - Express API
- `packages/ui` - Shared reusable UI components
- `db` - Prisma schema, generated client, and seed script

## 1) Install Dependencies

```bash
npm install
```

## 2) Configure Environment

### Frontend env (used by API routes)
Copy `apps/frontend/.env.local.example` to `apps/frontend/.env.local` and set your PostgreSQL credentials:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/portfolio_db?schema=public"
```

## 3) Setup Database

Run migrations and seed data:

```bash
npm run db:migrate
npm run db:seed
```

## 4) Run Locally (Frontend-Only)

```bash
npm run dev
```

This generates Prisma client (frontend workspace) and starts Next.js on `:3000`.

If you still want to run the legacy split backend + frontend locally:

```bash
npm run dev:full
```

## API Endpoints (Next.js)

- `GET /api/testimonials` - Return all testimonials
- `POST /api/testimonials` - Add a new testimonial

POST body:

```json
{
  "name": "Jane Doe",
  "message": "Great experience working with DevCraft!"
}
```

## Feature Coverage

- Sticky navbar + smooth-scrolling anchors
- Hero, services, portfolio, testimonials, contact, and animated footer
- Framer Motion page transitions, scroll reveals, hover/tap animations, and modal animations
- Glassmorphism cards, soft shadows, dark premium theme
- Testimonials fetched from internal API routes with loading skeletons
- Reusable shared UI components in `packages/ui`

## Vercel (Single Project Deploy)

1. Import this repository into Vercel.
2. Set **Root Directory** to `apps/frontend`.
3. Add `DATABASE_URL` in Vercel project environment variables.
4. Deploy.

The testimonials API runs from `apps/frontend/app/api/testimonials/route.ts`, so you do not need to host Express separately.

## Quick Commands

- `npm run db:migrate` - run Prisma migrations (frontend workspace)
- `npm run db:seed` - seed testimonials
- `npm run dev` - start frontend-only local app
