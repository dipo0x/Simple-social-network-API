import { Router, Request, Response, NextFunction } from "express";

declare module 'express' {
    interface Request {
      user?: {
          email: string,
          username: string,
          password: string,
      };
    }
  }
  