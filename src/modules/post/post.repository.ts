import { Post } from 'post';
import { prisma } from '../../config/database'
import { Request } from 'express';
import { AuthUser } from 'user';

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
        const post = await prisma.post.create({
          data: { ...rest, authorId: (req.user as AuthUser).id},
        });
    
        return post;
      },
};

export default repository