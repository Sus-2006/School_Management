import "dotenv/config";
import "temporal-polyfill/full/global";

import postgres from "@prisma/orm-postgres/runtime";
import { contractFromJson } from "@prisma/orm-postgres/static";

import type { Contract } from "./contract.d";
import contractJson from "./contract.json" with { type: "json" };

export const contract = contractFromJson<Contract>(contractJson);

export const databaseUrl = process.env.DATABASE_URL;

export const db = postgres({
  contract,
  // The Prisma 8 Postgres client is a process-lifetime, lazy pool. Supplying the
  // URL here binds it; do not call db.connect() at module scope or per request.
  ...(databaseUrl ? { url: databaseUrl } : {}),
});
