import { db } from "../prisma/db";

export async function getAllDrivers() {
  return await db.orm.public.Driver.all();
}

export async function createDriver(
  name: string,
  phone: string,
  licenseNo?: string,
) {
  return await db.orm.public.Driver.create({
    name,
    phone,
    licenseNo,
  });
}
