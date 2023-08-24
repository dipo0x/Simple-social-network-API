import { prisma } from '../../config/database'
import { Request } from 'express';
import { AuthUser } from 'user';

const service = {
    async getPaginatedUsersPosts(offset: number, pageSize: number, req: Request) {
        const posts = await prisma.post.findMany({
            where: { authorId: (req.user as AuthUser).id },
            skip: offset,
            take: pageSize,
        });

        return posts
    }
}

export default service;