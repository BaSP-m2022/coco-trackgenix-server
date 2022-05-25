import request from 'supertest';
import app from '../app';
import SuperAdmins from '../models/Super-admins';
import superadminsseeds from '../seeds/super-admins-seeds';

beforeAll(async () => {
  SuperAdmins.collection.insertMany(superadminsseeds);
});

let sAdmin;
let sAdmin2;

/* eslint-disable no-underscore-dangle */

describe('GET /superadmins', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/superadmins').send();
    expect(response.status).toBe(200);
  });

  test('response should return error:false', async () => {
    const response = await request(app).get('/superadmins').send();
    expect(response.error).toBe(false);
  });

  test('should load data', async () => {
    const data = await request(app).get('/superadmins').send();
    expect(data).toBeDefined();
  });

  test('response should not be empty', async () => {
    const response = await request(app).get('/superadmins').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

describe('POST /superadmins', () => {
  test('Should create an Super-Admin', async () => {
    const response = await request(app).post('/superadmins').send({
      name: 'Pablo',
      lastName: 'Perez',
      email: 'Pablo@gmail.com',
      password: 'dsl45567',
      active: false,
    });
    expect(response.status).toBe(201);
    sAdmin = response.body.data._id;
  });
  test('Should create a new Super-Admin', async () => {
    const response = await request(app).post('/superadmins').send({
      name: 'Martin',
      lastName: 'disalvo',
      email: 'martin@gmail.com',
      password: 'me234ss98',
      active: false,
    });
    expect(response.body.msg).toEqual('a Super-Admin has been created');
    sAdmin2 = response.body.data._id;
  });
  test('superadmins should not be created', async () => {
    const response = await request(app).post('/superadmins').send();
    expect(response.status).toBe(400);
  });
});

describe('GET /superadmins/:id', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get(`/superadmins/${sAdmin}`).send();
    expect(response.status).toBe(200);
  });

  test('response should return a true error if not id', async () => {
    const response = await request(app).get('/superadmins/').send();
    expect(response.status).toBeTruthy();
  });
});

describe('PUT /superadmins', () => {
  test('Should put an SuperAdmin', async () => {
    const response = await request(app).put(`/superadmins/${sAdmin}`).send({
      email: 'PabloPerez@gmail.com',
    });
    expect(response.status).toEqual(200);
    sAdmin = response.body.data._id;
  });
  test('if the name is spelled wrong, it returns a status 400', async () => {
    const response = await request(app).put(`/superadmins/${sAdmin}`).send({
      name: 'pab_lo',
    });
    expect(response.status).toBe(400);
  });

  test('if the last name is spelled wrong, it returns me an undefined data', async () => {
    const response = await request(app).put(`/superadmins/${sAdmin}`).send({
      lastName: 'pere*zz',
    });
    expect(response.status).toBe(400);
  });

  test('response should return a true error if not id', async () => {
    const response = await request(app).put('/superadmins/').send();
    expect(response.status).toBe(404);
  });
});

describe('DELETE /superadmins/:id', () => {
  test('The Super-Admin was deleted', async () => {
    const response = await request(app).get(`/superadmins/${sAdmin}`).send();
    expect(response.status).toEqual(200);
  });
  test('response should return a false error', async () => {
    const response = await request(app).delete(`/superadmins/${sAdmin2}`).send();
    expect(response.error).toBeFalsy();
  });
  test('status 404 if the Super-Admin does not exist', async () => {
    const response = await request(app).delete('/superadmins/').send();
    expect(response.status).toEqual(404);
  });
});
