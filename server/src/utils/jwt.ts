import jwt from "jsonwebtoken";

export interface JWTPayload {
  userId: string;
  email: string;
}

export const generateToken = (payload: JWTPayload): string => {
  const secret = process.env.JWT_SECRET || "your-super-secret-jwt-key";
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

  return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
};

export const verifyToken = (token: string): JWTPayload => {
  const secret = process.env.JWT_SECRET || "your-super-secret-jwt-key";

  try {
    return jwt.verify(token, secret) as JWTPayload;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

export const generateRefreshToken = (payload: JWTPayload): string => {
  const secret =
    process.env.JWT_REFRESH_SECRET || "your-super-secret-refresh-key";
  const expiresIn = process.env.JWT_REFRESH_EXPIRES_IN || "30d";

  return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
};

export const verifyRefreshToken = (token: string): JWTPayload => {
  const secret =
    process.env.JWT_REFRESH_SECRET || "your-super-secret-refresh-key";

  try {
    return jwt.verify(token, secret) as JWTPayload;
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
};
