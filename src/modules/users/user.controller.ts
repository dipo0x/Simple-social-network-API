import { Router, Request, Response, NextFunction } from "express";
import ApiError from '../../errors/ApiErrorHandler';
import service from './user.service'
import repository from './user.repository'

const auth = {
    async registerUserHandler(
        req: Request<
        {},
        {},
        {
          email: string
          username: string
          password: string
        }
      >,
      res: Response
    ) {
      try {
        let { email, username, password } = req.body;

        if (!username?.trim() || !email?.trim() || !password?.trim()) {
          return ApiError(400, 'All fields are required', res);
        }
        const userExists = await service.findUserByEmail(email);
        if (userExists) {
          return ApiError(400, 'User already exists', res);
        }
        const user = await repository.createUser(req.body);
        return res.status(201).send({
          status: 201,
          success: true,
          message: user,
        });
      } catch (err) {
        console.log(err)
        return ApiError(500, 'Something went wrong', res);
      }
    }
}

export default auth;