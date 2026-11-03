import "dotenv/config";
import "temporal-polyfill/full/global";

import { db } from "../prisma/db";

async function main() {
  const user = await db.orm.public.User.create({
    firebaseUid: "test-firebase-admin-001",
    loginId: "admin001",
    email: "admin@test.school",
    role: "ADMIN",
  });

  console.log("✅ Test user created:");
  console.log(user);
}

main().catch((error) => {
  console.error("❌ Failed to create test user:");
  console.error(error);
});