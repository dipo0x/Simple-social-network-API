import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthUser } from 'user';

const token = {
    async hashPassword(password: string) {
        return await bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    }, 
  async signToken(user: AuthUser) {
    const token = jwt.sign({ id: user.id.toString() }, `${process.env.AccessTokenKey}`, {
      expiresIn: `${process.env.accessTokenExpiresIn}m`,
    });
    return token;
  },
};

export default token;