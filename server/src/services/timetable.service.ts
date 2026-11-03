import { db } from "../prisma/db";

export async function getAllTimetables() {
  return await db.orm.public.Timetable.all();
}

export async function createTimetable(
  classId: string,
  subjectId: string,
  teacherId: string,
  day: string,
  period: number,
  startTime?: string,
  endTime?: string,
) {
  return await db.orm.public.Timetable.create({
    classId,
    subjectId,
    teacherId,
    day,
    period,
    startTime,
    endTime,
  });
}