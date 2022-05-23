/* import req from 'supertest';
admin
import app from '../app';
import seeds from '../seeds/members-seeds';
import models from '../models/Members';
beforeAll(async () => {
  await models.collection.insertMany(seeds);
});
let empId;
let empId2;
describe('GET ALL /members', () => {
  test('Shold return a 200 status', async () => {
    const response = await req(app).get('/members').send();
    expect(response.status).toBe(200);
  });
  test('Shold return a false error', async () => {
    const response = await req(app).get('/members').send();
    expect(response.error).toBe(false);
  });
});
describe('POST /members', () => {
  test('Shold create a member', async () => {
    const response = await req(app).post('/members').send({
        _employee:'628b086d95a83f5650853dbf',
        role: 'DEV',
        rate: '10',
    });
    expect(response.status).toBe(201);
    empId = response.body.data._id;

  });
  test('Shold create a new member', async () => {
    const response = await req(app).post('/amembers').send({
        role: 'TL',
        rate: '1',
    });
    expect(response.body.msg).toEqual('Admin has been successfully created');
    empId2 = response.body.data._id;
    })
  test('Members should not be created', async () => {
    const response = await req(app).post('/members').send();
    expect(response.status).toBe(400);
  });
});
describe('PUT /member', () => {
  test('Shold put an member', async () => {
    const response = await req(app).post(`/member/${empId2}`).send({
      rate: '6'
    });
    expect(response.status).toEqual(200);
    empId = response.body.data._id;
  });
});
describe('DELETE /members', () => {
  test('Shold delete an member', async () => {
    const response = await req(app).get(`/members/${empId2}`).send();
    expect(response.status).toEqual(200);
  });
});
 */
test.todo('complete test');
