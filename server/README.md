# School Management API

Copy `.env.example` to `.env` and restore the existing Supabase `DATABASE_URL` before starting the API. The database URL stays server-side.

```bash
bun run src/index.ts
```

Prisma 8 uses a lazy process-lifetime pool in `src/prisma/db.ts`; it must be constructed with `DATABASE_URL` and is closed on process shutdown.
