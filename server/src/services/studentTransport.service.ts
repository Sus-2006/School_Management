import { db } from "../prisma/db";

export async function getAllStudentTransports() {
  return await db.orm.public.StudentTransport.all();
}

export async function createStudentTransport(
  studentId: string,
  busId: string,
  routeId: string,
  stopId: string,
  startDate?: Date,
) {
  const startDateValue = startDate
    ? globalThis.Temporal.Instant.from(startDate.toISOString())
    : undefined;

  return await db.orm.public.StudentTransport.create({
    studentId,
    busId,
    routeId,
    stopId,
    startDate: startDateValue,
    active: true,
  });
}