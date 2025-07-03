import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id?: string;
  iat?: number;
  exp?: number;
}

declare global {
  namespace Express {
    interface Request {
      id?: string;
    }
  }
}

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized, Please Login to continue",
      });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JET_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET not defined");
    }

    const decode = jwt.verify(token, secret) as JwtPayload;
    req.id = decode.id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
    });
  }
};

export default isAuthenticated;
