import { db } from "../prisma/db";

export async function getUserByFirebaseUid(firebaseUid: string) {
  const users = await db.orm.public.User.all();

  return users.find(
    (user) => user.firebaseUid === firebaseUid,
  );
}