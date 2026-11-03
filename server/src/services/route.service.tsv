import { db } from "../prisma/db";

export async function getAllRoutes() {
  return await db.orm.public.Route.all();
}

export async function createRoute(
  name: string,
  busId?: string,
) {
  return await db.orm.public.Route.create({
    name,
    busId,
  });
}