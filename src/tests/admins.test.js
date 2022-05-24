/* import req from 'supertest';
import app from '../app';
import seeds from '../seeds/admins-seeds';
import models from '../models/Admins';

beforeAll(async () => {
  await models.collection.insertMany(seeds);
});
let empId;
let empId2;
describe('GET ALL /admins', () => {
  test('Shold return a 200 status', async () => {
    const response = await req(app).get('/admins').send();
    expect(response.status).toBe(200);
  });
  test('Shold return a false error', async () => {
    const response = await req(app).get('/admins').send();
    expect(response.error).toBe(false);
  });
});
describe('POST /admins', () => {
  test('Shold create an admin', async () => {
    const response = await req(app).post('/admins').send({
      name: 'Esteban',
      lastName: 'Perez',
      email: 'esteban@gmail.com',
      password: 'estt12',
      active: false,
    });
    expect(response.status).toBe(201);
    empId = response.body.data.id;
  });
  test('Shold create a new admin', async () => {
    const response = await req(app).post('/admins').send({
      name: 'Roberto',
      lastName: 'Garcia',
      email: 'rober@gmail.com',
      password: 'robt12',
      active: false,
    });
    expect(response.body.msg).toEqual('Admin has been successfully created');
    empId2 = response.body.data._id;
  });
  test('Admins should not be created', async () => {
    const response = await req(app).post('/admins').send();
    expect(response.status).toBe(400);
  });
});
describe('PUT /admins', () => {
  test('Shold put an admin', async () => {
    const response = await req(app).put(`/admins/${empId2}`).send({
      email: 'estebanPerez@gmail.com',
    });
    expect(response.status).toEqual(200);
    empId2 = response.body.data._id;
  });
});
describe('DELETE /admins', () => {
  test('Shold delete an admin', async () => {
    const response = await req(app).get(`/admins/${empId2}`).send();
    expect(response.status).toEqual(200);
  });
}); */
// test.todo('complete test');
