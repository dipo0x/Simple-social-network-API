import token from '../../utils/token.utils';
import { prisma } from '../../config/database'
import { User } from 'user';

const service = {
  async createUser(userPayload: User) {
    const { ...rest } = userPayload;
    const password = await token.hashPassword(userPayload.password);
    const user = await prisma.user.create({
      data: { ...rest, password },
    });
    return user;
  },
}

export default service;