import chai from 'chai';
import chaiHttp from 'chai-http';
import App from '../app';
import { before, describe, it } from 'node:test';
import assert from 'assert';
import request from 'supertest'; 
import { email, password } from './auth.test'

const appInstance = new App(3000);
const app = appInstance.express;

chai.should();
chai.use(chaiHttp);

describe(`${process.env.SERVER_NAME} - Users Integration tests`, async () => {
  describe('Post /api/v1/users/?page=1&pageSize=1', function () {  
    it('should GET list of users', async () => {
      const res = await request(app)
        .get('/api/v1/users/?page=1&pageSize=1')

      assert.deepStrictEqual(res?.statusCode, 200);
      assert.deepStrictEqual(JSON.parse(res?.text).success, true);
    })
  }),
  describe('Post /api/v1/users/:id/posts?page=1&pageSize=4', function () {  
    it("should GET user's post", async () => {
        const user = {
            email: email,
            password: password
        };
      
        const loginRes = await request(app)
        .post('/api/v1/auth/login')
        .send(user);
        const responseBody = loginRes.body

        const res = await request(app)
            .get(`/api/v1/users/${responseBody.message.user.id}/posts?page=1&pageSize=4`)
            .set('Authorization', responseBody.message.access_token)

        assert.deepStrictEqual(res?.statusCode, 200);
        assert.deepStrictEqual(JSON.parse(res?.text).success, true);
    }),
    it("should GET top 3 users", async () => {
        const user = {
            email: email,
            password: password
        };
      
        const loginRes = await request(app)
        .post('/api/v1/auth/login')
        .send(user);
        const responseBody = loginRes.body

        const res = await request(app)
            .get(`/api/v1/users/top/3/posts/`)
            .set('Authorization', responseBody.message.access_token)

        assert.deepStrictEqual(res?.statusCode, 200);
        assert.deepStrictEqual(JSON.parse(res?.text).success, true);
    })
  })
});

