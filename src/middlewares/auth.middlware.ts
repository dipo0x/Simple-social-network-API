import { Router, Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import authUserRepository from '../modules/auth/auth.repository';
import ApiError from '../errors/ApiErrorHandler';

const authMiddleware = {
  async authenticateRequest(
    req: Request,
    res: Response,
    next: NextFunction
    ) {
    try {
      const token: string | undefined | string[] = req.headers.authorization || req.headers.Authorization;
      if (!token) {
        return res.status(400).send({
          status: 400,
          success: false,
          message: 'No Authorization was provided',
        });
      }

      const decoded: JwtPayload = jwt.verify(token as any, `${process.env.AccessTokenKey}`) as JwtPayload;
      const user = await authUserRepository.findUserById(decoded.id);
      if (!user) {
        return ApiError(400, 'Login to proceed', res)
      }
      req.user = user 
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return ApiError(400, 'Session expired, please login again', res)
      }
      if (error instanceof jwt.JsonWebTokenError) {
        return ApiError(400, 'Invalid token, please login again', res)
      }
      console.log(error)
      return ApiError(400, 'Login to proceed', res)
    }
  },
};

export default authMiddleware;
