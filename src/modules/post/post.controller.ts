import { Request, Response } from "express";
import ApiError from '../../errors/ApiErrorHandler';
// import repository from "./post.repository";
import repository from "./post.repository";

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
    ) 
    {
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
    } catch (err) {
        console.log(err)
        return ApiError(500, 'Something went wrong', res);
    }
    }

}
export default auth;