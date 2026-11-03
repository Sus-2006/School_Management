import "dotenv/config";
import { readFileSync } from "fs";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const serviceAccount = JSON.parse(
  readFileSync("./firebase-service-account.json", "utf-8"),
);

const firebaseApp =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: cert(serviceAccount),
      });

export const firebaseAuth = getAuth(firebaseApp);