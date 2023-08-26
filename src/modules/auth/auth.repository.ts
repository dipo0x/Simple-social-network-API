import { prisma } from '../../config/database'
import token from '../../utils/token.utils';
import { User } from '@types';

const repository = {
    async createUser(userPayload: User) {
        const { ...rest } = userPayload;
        const password = await token.hashPassword(userPayload.password);
        const user = await prisma.user.create({
          data: { ...rest, password },
        });
    
        return user;
      },
    async findUserById(id: string) {
        if (!id) {
            return null;
        }
        const user = await prisma.user.findUnique({
            where: { id: id },
        });
        if(!user){
            return null
        }
        return user;
    },
};

export default repository