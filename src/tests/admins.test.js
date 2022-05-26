import req from 'supertest';
import app from '../app';
import seeds from '../seeds/admins-seeds';
import models from '../models/Admins';

beforeAll(async () => {
  await models.collection.insertMany(seeds);
});
let empId;
const empPut = '62891bfc9f301fea90d2771d';
describe('GET ALL /admins', () => {
  test('Shold return a 200 status', async () => {
    const response = await req(app).get('/admins').send();
    expect(response.status).toBe(200);
  });
  test('Shold return a false error', async () => {
    const response = await req(app).get('/admins').send();
    expect(response.error).toBe(false);
  });
  test('response should return the admins', async () => {
    const response = await req(app).get('/admins').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});
describe('GET ONE /:id', () => {
  test('should return one admin', async () => {
    const response = await req(app).get(`/admins/${empPut}`).send();
    const admin = {
      name: 'Fernando',
      lastName: 'Gonzalez',
      email: 'fer@gmail.com',
      password: 'fer12',
      active: true,
    };
    expect(response.body.data).toMatchObject(admin);
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
    empId = response.body.data._id;
  });
});
describe('DELETE /admins/:id', () => {
  test('Shold delete an admin', async () => {
    const response = await req(app).get(`/admins/${empId}`).send();
    expect(response.status).toBe(200);
  });
});

describe('PUT /admins/:id', () => {
  test('Shold put an admin', async () => {
    const response = await req(app).put(`/admins/${empPut}`).send({
      name: 'Esteban',
      lastName: 'Gmez',
      email: 'Est@gmail.com',
      password: 'estee12',
      active: 'false',
    });
    expect(response.status).toBe(200);
  });
});
test.todo('complete test');
