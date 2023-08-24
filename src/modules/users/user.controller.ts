import { Router, Request, Response, NextFunction } from "express";
import ApiError from '../../errors/ApiErrorHandler';
import service from './user.service'

const auth = {
  async getUsersHandler(
      req: Request<
      {},
      {},
      {}
    >,
    res: Response
    ) 
    {
      try {
        let { page, pageSize }  = req.query;

        let pageInt: number = parseInt(page as string) || 1
        let pageSizeInt: number = parseInt(pageSize as string) || 5
        const offset = (pageInt - 1) * pageSizeInt;
        const users = await service.getPaginatedUsers(offset, pageSizeInt);

        return res.status(200).send({
          status: 200,
          success: true,
          message: users,
        });
      } catch (err) {
        console.log(err)
        return ApiError(500, 'Something went wrong', res);
    }
  }
}

export default auth;