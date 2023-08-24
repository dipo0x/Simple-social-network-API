import { Router, Request, Response, NextFunction } from "express";
import ApiError from '../../errors/ApiErrorHandler';
import userService from '../users/user.service'
import redisService from '../../services/redis.service';
import userRepository from '../users/user.repository'
import token from '../../utils/token.utils';
import jwtStrategies from "../../jwt/jwt.strategy";

const auth = {
    async loginUserHandler(
        req: Request<
        {},
        {},
        {
          email: string
          password: string
        }
      >,
      res: Response
    ) 
    {

    try {
        let { email, password } = req.body;

        if (!email?.trim() || !password?.trim()) {
            return ApiError(400, 'All fields are required', res);
        }
        const auth = await userService.findUserByEmail(email)
        if(!auth){
            return ApiError(404, 'Invalid credentials', res);
        }
        const isLocked = await redisService.getValue(auth.id)
        if(isLocked == 1){
            return ApiError(401, 'Your account is temporarily locked. Please contact support', res);
        }
        const isCorrectPassword = await token.comparePasswords(password, auth.password)
        if(!isCorrectPassword){
            const data = await redisService.createTempLock(auth.id)
            return ApiError(400, `Incorrect password. You have ${data} chance(s) left.`, res);
        }
        const access_token = await jwtStrategies.signToken(auth);
        const user = await userService.findUserByEmail(email)
        const message = {
            user,
            access_token
        }
        return res.status(200).send({
            status: 200,
            success: true,
            message: message
        });
    }
    catch (err) {
        console.log(err)
        ApiError(500, 'Something went wrong', res);
    }
    }
};

export default auth;