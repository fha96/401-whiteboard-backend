'use strict';

const server = require('../server');

// to fake runnig my server
const supertest = require('supertest');

// faking 
const req = supertest(server.app);

describe('testing CRUD operations', () => {

     it('test getting all posts with comments in array of objects',async () => {
        let res = await req.get('/post');
        console.log(res.body);
        expect(typeof res.body).toEqual('object');
        expect(res.statusCode).toEqual(200)
     });
     it('test getting one post ',async () => {
        let res = await req.get('/post/1');
        console.log(res.body);
        expect(typeof res.body).toEqual('object');
     });
     it('test posting one post',async () => {
        const data = {
            title:'face book',
            description:'facebook has many bugs'
        }
        let res = await req.post('/post').send(data);
        console.log(res.body);
        expect(typeof res.body).toEqual('object');
        expect(res.statusCode).toBe(201);
     });
     it('test update one post',async () => {
        const data = {
            title:'dahab',
            description:'dahab has received many tourist last year'
        }
        let res = await req.put('/post/12').send(data);
        console.log(res.body);
        expect(typeof res.body).toEqual('object');
        expect(res.statusCode).toBe(202);
     });
     it('test delete one post',async () => {
        let res = await req.delete('/post/10');
        console.log(res);
        // expect(res.text).toEqual("item deleted");
        expect(res.statusCode).toBe(204);
     });


     it('test Add a new comment using POST ', async () => {
      const commentData = {
         description:" test ",
         name:"fha",
         postID:"2"
      }
      let res = await req.post('/comment/2').send(commentData);
      console.log(res.body);
      expect(typeof res).toEqual('object');
     });

     



});