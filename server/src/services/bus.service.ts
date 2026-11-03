import { db } from "../prisma/db";

export async function getAllBuses() {
  return await db.orm.public.Bus.all();
}

export async function createBus(
  busNumber: string,
  registrationNo: string,
  capacity: number,
  driverId?: string,
  attendantName?: string,
  attendantPhone?: string,
) {
  return await db.orm.public.Bus.create({
    busNumber,
    registrationNo,
    capacity,
    driverId,
    attendantName,
    attendantPhone,
  });
}
