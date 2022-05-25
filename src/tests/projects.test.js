/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../app';
import projectsSeed from '../seeds/projects-seeds';
import Projects from '../models/Projects';

beforeAll(async () => {
  await Projects.collection.insertMany(projectsSeed);
});

const projectId = '628c12b5f4494d60c0cffd4a';

describe('GET /projects', () => {
  test('Response should return a 200 status', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.status).toBe(200);
  });

  test('Response should return error:false', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.error).toBe(false);
  });

  test('Should load data', async () => {
    const data = await request(app).get('/projects').send();
    expect(data).toBeDefined();
  });

  test('Response should not be empty', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

describe('GET /projects/:id', () => {
  test('Response should return a 200 status', async () => {
    const response = await request(app).get(`/projects/${projectId}`).send();
    expect(response.status).toBe(200);
  });
  test('Response should return error if ID is not provided', async () => {
    const response = await request(app).get('/projects/').send();
    expect(response.error).toBeFalsy();
  });
});
