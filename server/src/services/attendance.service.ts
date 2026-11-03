import { db } from "../prisma/db";

export async function getAllAttendance() {
  return await db.orm.public.Attendance.all();
}

export async function createAttendance(
  studentId: string,
  date: Date,
  status: "PRESENT" | "ABSENT" | "LATE" | "LEAVE",
) {
  const dateValue =
    globalThis.Temporal.Instant.from(date.toISOString());

  return await db.orm.public.Attendance.create({
    studentId,
    date: dateValue,
    status,
  });
}