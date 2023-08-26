import chai from 'chai';
import chaiHttp from 'chai-http';
import App from '../app';
import { before, describe, it } from 'node:test';
import assert from 'assert';
import request from 'supertest'; 
import userRepo from '../modules/users/user.repository';

const appInstance = new App(3000);
const app = appInstance.express;

chai.should();
chai.use(chaiHttp);

export const email = 'johndoe@gmail.com';
export const password = 'test1234';
export const username = 'JohnDoe';

describe(`${process.env.SERVER_NAME} - Auth Integration tests`, async () => {

  describe('Post /api/v1/auth/add-user', function () {
    
    it('should POST a new user', async () => {
      const user = {
        username,
        email,
        password,
      };
      await userRepo.deleteUser(email);
      const res = await request(app)
        .post('/api/v1/auth/add-user')
        .send(user);

      assert.deepStrictEqual(res?.statusCode, 201);
      assert.deepStrictEqual(JSON.parse(res?.text).success, true);
    }),
    it('should NOT POST a new user that failed validation', async () => {
      const user = {
        username,
        email,
        password,
      };
  
      const res = await request(app)
        .post('/api/v1/auth/add-user')
        .send(user);
  
      assert.deepStrictEqual(res?.statusCode, 400);
      assert.deepStrictEqual(JSON.parse(res?.text).success, false);
    }),
    it('should LOGIN a user', async () => {
      const user = {
        email,
        password
      };
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send(user);

      assert.deepStrictEqual(res?.statusCode, 200);
      assert.deepStrictEqual(JSON.parse(res?.text).success, true);
    }),
    it('should NOT LOGIN a user that failed validation', async () => {
      const user = {
        email,
        password: "password"
      };
  
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send(user);
  
      assert.deepStrictEqual(res?.statusCode, 400);
      assert.deepStrictEqual(JSON.parse(res?.text).success, false);
    });
  })
});

