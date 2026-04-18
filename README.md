# Bare-X

Bare-X is a full-stack skincare intelligence platform built with Next.js 16, Prisma, PostgreSQL, Gemini-powered explanation generation, and a premium animated frontend.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP
- Lenis
- Zustand
- Prisma + PostgreSQL
- Gemini API
- PostHog-ready analytics hook

## Local setup

1. Copy `.env.example` to `.env`.
2. Set `DATABASE_URL`.
3. Optionally add `GEMINI_API_KEY` and PostHog public keys.
4. Install dependencies with `npm install`.
5. Generate Prisma client with `npm run prisma:generate`.
6. Push the schema with `npm run prisma:push`.
7. Start development with `npm run dev`.

## Routes

- `/` landing page
- `/quiz` multi-step skin analysis quiz
- `/result` personalized output
- `/waitlist` demand capture form
- `/api/quiz` deterministic scoring + AI explanation
- `/api/waitlist` email capture

## Notes

- Skin scoring and product mapping are deterministic and live in `lib/skin-engine.ts`.
- Gemini is used only to explain the analysis more elegantly; the recommendation engine itself is not AI-generated.
- The project is structured so auth, subscriptions, and ordering can be added later without reshaping the core flow.
