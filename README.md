# LOOP — AI Customer Feedback Intelligence Platform

Zidio Development Internship Project — Web Development Track

## What it is
LOOP ingests customer feedback and uses Claude AI to classify sentiment, helping teams understand what customers are saying at a glance.

## Tech Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- PostgreSQL (Neon) + Prisma ORM
- Anthropic Claude API (classification)
- NextAuth (scaffolded, in progress)
- Deployed on Vercel

## Live Demo
https://loop-psi-one.vercel.app

## Features Implemented
- Multi-tenant data model (Workspace, User, Feedback, Theme, Report)
- Dashboard, Inbox, Trends, Ask LOOP, Reports UI
- Feedback inbox pulling live data from database
- AI-powered sentiment classification via Claude API
- Seed script with demo workspace, users, and feedback data

## Local Setup
1. Clone the repo
2. `npm install`
3. Copy `.env.example` to `.env` and fill in your own values
4. `npx prisma db push`
5. `npx tsx prisma/seed.ts`
6. `npm run dev`

## Demo Credentials (seeded)
- Admin: admin@demo.com / password123
- Analyst: analyst@demo.com / password123
- Viewer: viewer@demo.com / password123

## Known Limitations
- Login (NextAuth) is scaffolded but not fully functional yet
- CSV upload, Ask LOOP Q&A, and Voice-of-Customer reports are planned next steps