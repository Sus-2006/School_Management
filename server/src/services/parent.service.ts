import { db } from "../prisma/db";

export async function getAllParents() {
  return await db.orm.public.Parent.all();
}

export async function createParent(
  fatherName: string,
  motherName: string,
  phone: string,
  email?: string,
  address?: string,
) {
  return await db.orm.public.Parent.create({
    fatherName,
    motherName,
    phone,
    email,
    address,
  });
}