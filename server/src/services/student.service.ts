import { db } from "../prisma/db";

export async function getAllStudents() {
  return await db.orm.public.Student.all();
}

export async function createStudent(
  admissionNo: string,
  name: string,
  classId: string,
  sectionId: string,
  parentId: string,
  dob?: Date,
  gender?: "MALE" | "FEMALE" | "OTHER",
  bloodGroup?: string,
) {
  const dobValue = dob
    ? globalThis.Temporal.Instant.from(dob.toISOString())
    : undefined;

  return await db.transaction(async (tx) => {
    const parents = await tx.orm.public.Parent.all();

    console.log(
      "TRANSACTION PARENT IDS:",
      parents.map((p) => p.id),
    );

    console.log(
      "TRANSACTION PARENT COUNT:",
      parents.length,
    );

    console.log(
      "TRANSACTION MATCH:",
      parents.some((p) => p.id === parentId),
    );

    return await tx.orm.public.Student.create({
      admissionNo,
      name,
      classId,
      sectionId,
      parentId,
      dob: dobValue,
      gender,
      bloodGroup,
    });
  });
}