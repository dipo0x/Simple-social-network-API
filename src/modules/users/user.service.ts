import { prisma } from '../../config/database'

const service = {
    async findUserByEmail(email: string) {
        if (!email) {
            return null;
        }
        const auth = await prisma.user.findUnique({
            where: { email: email },
        });
        return auth;
    },
    async getPaginatedUsers(offset: number, pageSize: number){
        const users = await prisma.user.findMany({
            skip: offset,
            take: pageSize,
        });

        return users
    },
    async getTopUsersWithPostsAndLatestComment(){
      const topUsers = await prisma.user.findMany({
        take: 3,
        orderBy: {
            posts: {
                _count: 'desc'
            }
        },
        select: {
            id: true,
            username: true,
            email: true,
            comments: {
                orderBy: {
                    createdAt: 'desc'
                },
                take: 1
            }
        }
    });
    return topUsers
  }
}

export default service;