import { db } from "../prisma/db";

export async function getAllSubjects() {
  return await db.orm.public.Subject.all();
}

export async function createSubject(
  name: string,
  code?: string,
) {
  return await db.orm.public.Subject.create({
    name,
    code,
  });
}