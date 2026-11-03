import type { Request, Response, NextFunction } from "express";
import { firebaseAuth } from "../config/firebase";
import { getUserByFirebaseUid } from "../services/user.service";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    uid: string;
    email?: string;
    role: string;
  };
}

export async function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        success: false,
        message: "Authorization header is required",
      });
    }

    if (!authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format",
      });
    }

    const idToken = authorization.substring(7);

    const decodedToken = await firebaseAuth.verifyIdToken(idToken);

    const user = await getUserByFirebaseUid(decodedToken.uid);

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Firebase user is not registered in the school system",
      });
    }

    req.user = {
      id: user.id,
      uid: decodedToken.uid,
      email: user.email ?? undefined,
      role: user.role,
    };

    next();
  } catch (error) {
    console.error("Authentication error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token",
    });
  }
}

export function requireRole(...allowedRoles: string[]) {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to access this resource",
      });
    }

    next();
  };
}