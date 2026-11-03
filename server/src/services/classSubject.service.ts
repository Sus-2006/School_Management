import { db } from "../prisma/db";

export async function getAllClassSubjects() {
  return await db.orm.public.ClassSubject.all();
}

export async function createClassSubject(
  classId: string,
  subjectId: string,
) {
  return await db.orm.public.ClassSubject.create({
    classId,
    subjectId,
  });
}