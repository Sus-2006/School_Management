import { db } from "../prisma/db";

export async function getAllExams() {
  return await db.orm.public.Exam.all();
}

export async function createExam(
  name: string,
  examDate?: Date,
) {
  const examDateValue = examDate
    ? globalThis.Temporal.Instant.from(examDate.toISOString())
    : undefined;

  return await db.orm.public.Exam.create({
    name,
    examDate: examDateValue,
  });
}