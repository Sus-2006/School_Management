import { db } from "../prisma/db";

export async function getAllClasses() {
  return await db.orm.public.Class.all();
}

export async function createClass(name: string, grade: number) {
  return await db.orm.public.Class.create({
    name,
    grade,
  });
}