import { db } from "../prisma/db";

export async function getAllStops() {
  return await db.orm.public.Stop.all();
}

export async function createStop(
  routeId: string,
  name: string,
  stopOrder: number,
  pickupTime?: string,
  dropTime?: string,
) {
  return await db.orm.public.Stop.create({
    routeId,
    name,
    stopOrder,
    pickupTime,
    dropTime,
  });
}