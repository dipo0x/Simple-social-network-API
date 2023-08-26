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

describe(`${process.env.SERVER_NAME} - Post Integration tests`, async () => {
  describe('Post /api/v1/posts/create-post', function () {  
    it('should CREATE a new post', async () => {
        const user = {
            email: email,
            password: password
        };
        const post = {
            "title": "My test post title",
            "body": "My test post body",
        }
      
        const loginRes = await request(app)
        .post('/api/v1/auth/login')
        .send(user);
        const responseBody = loginRes.body

      const res = await request(app)
        .post('/api/v1/posts/create-post')
        .send(post)
        .set('Authorization', responseBody.message.access_token)

      assert.deepStrictEqual(res?.statusCode, 201);
      assert.deepStrictEqual(JSON.parse(res?.text).success, true);
    })
  }),
  describe('Post /api/v1/posts/:postId/comments', function () {  
    it("should GET user's post", async () => {
        const user = {
            email: email,
            password: password
        };

        const loginRes = await request(app)
        .post('/api/v1/auth/login')
        .send(user);
        const responseBody = loginRes.body

        const usersPostRes = await request(app)
            .get(`/api/v1/users/${responseBody.message.user.id}/posts?page=1&pageSize=4`)
            .set('Authorization', responseBody.message.access_token)

        const postResponseBody = usersPostRes.body
        const comment = {
            body: "This is my comment on this post" 
        }
        const postCommentRes = await request(app)
            .post(`/api/v1/posts/${postResponseBody.message[0].id}/comments`)
            .send(comment)
            .set('Authorization', responseBody.message.access_token)
        assert.deepStrictEqual(postCommentRes?.statusCode, 201);
        assert.deepStrictEqual(JSON.parse(postCommentRes?.text).success, true);
    })
  })
});

