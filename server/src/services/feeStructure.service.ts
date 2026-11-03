import { db } from "../prisma/db";

export async function getAllFeeStructures() {
  return await db.orm.public.FeeStructure.all();
}

export async function createFeeStructure(
  name: string,
  amount: number,
  description?: string,
) {
  return await db.orm.public.FeeStructure.create({
    name,
    amount,
    description,
  });
}