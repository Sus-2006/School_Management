import { db } from "../prisma/db";

export async function getAllMarks() {
  return await db.orm.public.Mark.all();
}

export async function createMark(
  studentId: string,
  subjectId: string,
  examId: string,
  marks: number,
  maxMarks: number = 100,
) {
  return await db.orm.public.Mark.create({
    studentId,
    subjectId,
    examId,
    marks,
    maxMarks,
  });
}