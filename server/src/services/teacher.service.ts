import { db } from "../prisma/db";

export async function getAllTeachers() {
  return await db.orm.public.Teacher.all();
}

export async function createTeacher(
  employeeId: string,
  firstName: string,
  lastName: string,
  phone?: string,
  email?: string,
  photoUrl?: string,
) {
  return await db.orm.public.Teacher.create({
    employeeId,
    firstName,
    lastName,
    phone,
    email,
    photoUrl,
  });
}