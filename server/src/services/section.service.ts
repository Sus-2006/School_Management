import { db } from "../prisma/db";

export async function getAllSections() {
  return await db.orm.public.Section.all();
}

export async function createSection(
  name: string,
  classId: string,
) {
  return await db.orm.public.Section.create({
    name,
    classId,
  });
}