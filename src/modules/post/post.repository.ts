import { Post } from '@types';
import { prisma } from '../../config/database'
import { Request } from 'express';
import { AuthUser } from '@types';
import { User } from '@prisma/client';

const repository = {
    async findPostByContent(title: string, body: string, req: Request) {
        let existsType;
        const titlePost = await prisma.post.findFirst({ 
            where: { title, authorId: (req.user as AuthUser).id },
        });
        if(!titlePost){
            existsType = null
        } else {
            existsType = 'title'
            return existsType
        }
        const bodyPost = await prisma.post.findFirst({
            where: { body, authorId: (req.user as AuthUser).id },
        });
        if(!bodyPost){
            existsType = null
        } else {
            existsType = 'body'
            return existsType
        }
        return existsType;
    },
    async createPost(postPayload: Post, req: Request) {
        const { ...rest } = postPayload;
        const authorId = (req.user as AuthUser).id
        const post = await prisma.post.create({
          data: { 
            ...rest,
            author: {
                connect: { id: authorId }
              }
            },
        });
    
        return post;
    },
    async findCommentByPostId(postId: string, body: string, req: Request) {
        const comment = await prisma.comment.findFirst({ 
            where: { postId, body, authorId: (req.user as AuthUser).id },
        });
        if(!comment){
            return null
        } 
        return comment
    },
    async createComment(postId: string, body: string, req: Request) {
        const authorId = (req.user as AuthUser).id 
        const comment = await prisma.comment.create({ 
            data: { 
                body,
                post: {
                    connect: { id: postId }
                  },
                  author: {
                    connect: { id: authorId }
                }
            },
        });
        return comment
    }
};

export default repository