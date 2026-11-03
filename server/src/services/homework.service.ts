import { db } from "../prisma/db";

export async function getAllHomework() {
  return await db.orm.public.Homework.all();
}

export async function createHomework(
  classId: string,
  subjectId: string,
  teacherId: string,
  title: string,
  description: string | undefined,
  dueDate: Date,
  attachmentUrl?: string,
) {
  const dueDateValue =
    globalThis.Temporal.Instant.from(dueDate.toISOString());

  return await db.orm.public.Homework.create({
    classId,
    subjectId,
    teacherId,
    title,
    description,
    dueDate: dueDateValue,
    attachmentUrl,
  });
}