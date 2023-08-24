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
    }
}

export default service;