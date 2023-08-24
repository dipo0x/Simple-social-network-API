import jwt from 'jsonwebtoken';
import { AuthUser } from 'user';

const jwtStrategies = {
  async signToken(user: AuthUser) {
    const token = jwt.sign({ id: user.id.toString() }, `${process.env.AccessTokenKey}`, {
      expiresIn: `${process.env.accessTokenExpiresIn}m`,
    });
    return token;
  },
};

export default jwtStrategies;