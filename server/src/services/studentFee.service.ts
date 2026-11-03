import { db } from "../prisma/db";

export async function getAllStudentFees() {
  return await db.orm.public.StudentFee.all();
}

export async function createStudentFee(
  studentId: string,
  feeStructureId: string,
  totalAmount: number,
  paidAmount: number,
  dueDate?: Date,
) {
  const balance = Math.max(totalAmount - paidAmount, 0);

  let status: "PENDING" | "PARTIAL" | "PAID";

  if (balance === 0) {
    status = "PAID";
  } else if (paidAmount > 0) {
    status = "PARTIAL";
  } else {
    status = "PENDING";
  }

  const dueDateValue = dueDate
    ? globalThis.Temporal.Instant.from(dueDate.toISOString())
    : undefined;

  return await db.orm.public.StudentFee.create({
    studentId,
    feeStructureId,
    totalAmount,
    paidAmount,
    balance,
    dueDate: dueDateValue,
    status,
  });
}