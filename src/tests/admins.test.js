import req from 'supertest';
import app from '../app';
import seeds from '../seeds/admins-seeds';
import models from '../models/Admins';

beforeAll(async () => {
  await models.collection.insertMany(seeds);
});

describe('GET ALL /admins', () => {
  test('Shold return a list of admins', async () => {
    const response = await req(app).get('/admins').send();
    expect(response.body.data.lenght).toBeGreaterThan(0);
  });
  test('Shold return a 200 status', async () => {
    const response = await req(app).get('/admins').send();
    expect(response.status).toBe(200);
  });
  test('Shold return a false error', async () => {
    const response = await req(app).get('/admins').send();
    expect(response.error).toBe(false);
  });
});
describe('GET BY ID/admins', () => {
  test('Shold teturn one admin', async () => {
    const res = await req(app).get('/admins').send();
    const empId = res.body.data.id;
    const response = await req(app).get(`/admins/${empId}`).send();
    expect(response.status).toEqual(200);
  });
});
describe('POST /admins', () => {
  test('Shold create an admin', async () => {
    const response = await req(app).post('/admins').send({
      name: 'Fernando',
      lastName: 'Gonzalez',
      email: 'fer@gmail.com',
      password: 'fer12',
      active: true,
    });
    expect(response.status).toBe(201);
  });
  test('Admins should not be created', async () => {
    const response = await req(app).post('/admins').send();
    expect(response.status).toBe(400);
  });
});
describe('PUT /admins', () => {
  test('Shold put an admin', async () => {
    const res = await req(app).get('/admins').send();
    const empId = res.body.data.id;
    const response = await req(app).post(`/admins/${empId}`).send({
      name: 'Gustavo',
      lastName: 'Gomez',
      email: 'gus@gmail.com',
      password: 'fer12',
      active: true,
    });
    expect(response.status).toBe(201);
  });
});
describe('DELETE /admins', () => {
  test('Shold delete an admin', async () => {
    const res = await req(app).get('/admins').send();
    const empId = res.body.data.id;
    const response = await req(app).get(`/admins/${empId}`).send();
    expect(response.status).toEqual(200);
  });
});
