import { Router, Request, Response, NextFunction } from "express";
export interface User {
    email: string;
    username: string;
    password: string;
}

export interface AuthUser {
    id: string;
    email: string;
    username: string;
    password: string;
}

export interface RequestWithUser extends Request {
    user: AuthUser;
}

export interface Post {
    title: string;
    body: string;
}

declare module 'express' {
    interface Request {
      user?: User
    }
  }
  