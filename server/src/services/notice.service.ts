import { db } from "../prisma/db";

export async function getAllNotices() {
  return await db.orm.public.Notice.all();
}

export async function createNotice(
  title: string,
  content: string,
  audience: string,
  date?: Date,
) {
  const dateValue = date
    ? globalThis.Temporal.Instant.from(date.toISOString())
    : undefined;

  return await db.orm.public.Notice.create({
    title,
    content,
    audience,
    date: dateValue,
  });
}