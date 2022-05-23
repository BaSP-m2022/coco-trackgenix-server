import req from 'supertest';
import app from '../app';
import seeds from '../seeds/members-seeds';
import models from '../models/Members';

beforeAll(async () => {
  await models.collection.insertMany(seeds);
});

describe('GET ALL /members', () => {
  test('Shold return a list of members', async () => {
    const response = await req(app).get('/members').send();
    expect(response.body.data.lenght).toBeGreaterThan(0);
  });
  test('Shold return a 200 status', async () => {
    const response = await req(app).get('/members').send();
    expect(response.status).toBe(200);
  });
  test('Shold return a false error', async () => {
    const response = await req(app).get('/members').send();
    expect(response.error).toBe(false);
  });
});
describe('GET BY ID/members', () => {
  test('Shold teturn one admin', async () => {
    const res = await req(app).get('/admins').send();
    const empId = res.body.data.id;
    const response = await req(app).get(`/members/${empId}`).send();
    expect(response.status).toEqual(200);
  });
});
describe('POST /members', () => {
  test('Shold create an admin', async () => {
    const response = await req(app).post('/members').send({
      employee: '62891bfc9f301fea90d2771q',
      role: 'PM',
      rate: '8',
    });
    expect(response.status).toBe(201);
  });
  test('Members should not be created', async () => {
    const response = await req(app).post('/members').send();
    expect(response.status).toBe(400);
  });
});
describe('PUT /member', () => {
  test('Shold put an member', async () => {
    const res = await req(app).get('/admins').send();
    const empId = res.body.data.id;
    const response = await req(app).post(`/member/${empId}`).send({
      employee: '62891bfc9f301fea90d2771q',
      role: 'PM',
      rate: '8',
    });
    expect(response.status).toBe(201);
  });
});
describe('DELETE /members', () => {
  test('Shold delete an admin', async () => {
    const res = await req(app).get('/admins').send();
    const empId = res.body.data.id;
    const response = await req(app).get(`/members/${empId}`).send();
    expect(response.status).toEqual(200);
  });
});
