import { prisma } from '../../config/database';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const service = {
  async deleteUser(email: string) {
    try {
      await prisma.user.delete({
        where: {
          email
        }
      });
    } catch (error) {
      const knownError = error as PrismaClientKnownRequestError;
      if (knownError.code === 'P2025') {
        console.log(`User with email ${email} not found. Nothing to delete.`);
      } else {
        console.log(error)
      }
    }
  }
};

export default service;