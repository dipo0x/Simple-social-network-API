import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

const jwtStrategies = {
  async signToken(user: User) {
    const token = jwt.sign({ id: user.id.toString() }, `${process.env.AccessTokenKey}`, {
      expiresIn: `${process.env.accessTokenExpiresIn}m`,
    });
    return token;
  },
};

export default jwtStrategies;