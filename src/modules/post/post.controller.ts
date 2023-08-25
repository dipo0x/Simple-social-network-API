import { Request, Response } from "express";
import ApiError from '../../errors/ApiErrorHandler';
import service from "./post.service";
import repository from "./post.repository";
import { AuthUser } from "user";
import { User } from "@prisma/client";

const auth = {
    async createPostHandler(
        req: Request<
        {},
        {},
        {
        title: string
        body: string
        }
    >,
    res: Response
    )  {
        try {
            let { title, body } = req.body;

            if (!title?.trim() || !body?.trim()) {
            return ApiError(400, 'All fields are required', res);
            }
            const postExists = await repository.findPostByContent( title, body, req );
            if (postExists) {
                return ApiError(400, `Post with this ${postExists} already exist`, res);
            }
            const post = await repository.createPost(req.body, req);
            return res.status(201).send({
                status: 201,
                success: true,
                message: post,
            });
        } 
        catch (err) {
            console.log(err)
            return ApiError(500, 'Something went wrong', res);
        }
    },
    async getUserPosts(
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
          const posts = await service.getPaginatedUsersPosts(offset, pageSizeInt, req);
  
          return res.status(200).send({
            status: 200,
            success: true,
            message: posts,
          });
        } catch (err) {
          console.log(err)
          return ApiError(500, 'Something went wrong', res);
      }
    },
    async addCommentHandler(
        req: Request<
        {  
            postId: string
        },
        {},
        {
            body: string
        }
    >,
    res: Response
    )  {
        try {
            const { postId } = req.params;
            const { body } = req.body;

            if (!body?.trim()) {
            return ApiError(400, 'Comment is required', res);
            }
            const comment = await repository.findCommentByPostId( postId, body, req );
            if (comment) {
                return ApiError(400, `This is a duplicate comment`, res);
            }
            const post = await repository.createComment(postId, body, req.user as User);
            return res.status(201).send({
                status: 201,
                success: true,
                message: post,
            });
        } 
        catch (err) {
            console.log(err)
            return ApiError(500, 'Something went wrong', res);
        }
    }
}
export default auth;