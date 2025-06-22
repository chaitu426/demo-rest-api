import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import createHttpError from "http-errors";
import config from "../config/config"

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const error = createHttpError(
      401, "Authorization header missing or invalid"
    );
    return next(error);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.jwt_secret as string);
    req.user = decoded; // Attach user info to request
    next();
  } catch (err) {
    const error = createHttpError(401, `Invalid token - ${err}`);
    return next(error);
  }
};

export default authMiddleware;





