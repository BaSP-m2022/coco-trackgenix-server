/* eslint-disable no-underscore-dangle */
import req from 'supertest';
import app from '../app';
import seeds from '../seeds/admins-seeds';
import models from '../models/Admins';

beforeAll(async () => {
  await models.collection.insertMany(seeds);
});

const empPut = '62891bfc9f301fea90d2771d';

describe('GET ALL /admins', () => {
  test.skip('Shold return a 200 status', async () => {
    const response = await req(app).get('/admins').send();
    expect(response.status).toBe(200);
  });

  test.skip('Shold return a false error', async () => {
    const response = await req(app).get('/admins').send();
    expect(response.error).toBe(false);
  });

  test.skip('response should return the admins', async () => {
    const response = await req(app).get('/admins').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

describe('GET ONE /:id', () => {
  test.skip('should return one admin', async () => {
    const response = await req(app).get(`/admins/${empPut}`).send();
    const admin = {
      name: 'Fernando',
      lastName: 'Gonzalez',
      email: 'fer@gmail.com',
      password: 'fer12',
    };
    expect(response.body.data).toMatchObject(admin);
  });
});

describe('POST /admins', () => {
  test.skip('Should create an admin', async () => {
    const response = await req(app).post('/admins').send({
      name: 'Esteban',
      lastName: 'Perez',
      email: 'esteban@gmail.com',
      password: 'estt12',
    });
    expect(response.status).toBe(201);
  });
});

describe('DELETE /admins/:id', () => {
  test.skip('Shold delete an admin', async () => {
    const response = await req(app).get(`/admins/${empPut}`).send();
    expect(response.status).toBe(200);
  });
});

describe('PUT /admins/:id', () => {
  test.skip('Shold put an admin', async () => {
    const response = await req(app).put(`/admins/${empPut}`).send({
      name: 'Esteban',
      lastName: 'Gmez',
      email: 'Est@gmail.com',
      password: 'estee12',
    });
    expect(response.status).toBe(200);
  });
});
