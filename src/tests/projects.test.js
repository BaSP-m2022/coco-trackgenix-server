/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../app';
import projectsSeed from '../seeds/projects-seeds';
import Projects from '../models/Projects';

beforeAll(async () => {
  await Projects.collection.insertMany(projectsSeed);
});

let projectId;
let projectId2;

describe('POST /projects endpoints', () => {
  test.skip('should create new project', async () => {
    const response = await request(app).post('/projects/').send({
      name: 'Alfonso',
      description: 'this is the description',
      startDate: '2022',
      clientName: 'coco',
      active: true,
      members: [
        '62829f2c70298d2e5168f1e2',
      ],
      pm: '62829f2c70298d2e5168f1e2',
    });
    expect(response.status).toBe(201);
    projectId = response.body.data._id;
  });
  test.skip('msg is equal to status success', async () => {
    const response = await request(app).post('/projects/').send({
      name: 'Ezequiel',
      description: 'this is the description',
      startDate: '2022',
      clientName: 'Alfonso',
      active: true,
      members: [
        '628d6db998a9749e0a37c9bf',
      ],
      pm: '628d6db998a9749e0a37c9bf',
    });
    expect(response.body.msg).toEqual('success');
    projectId2 = response.body.data._id;
  });
  test.skip('msg is an error has ocurred', async () => {
    const response = await request(app).post('/projects/').send();
    expect(response.status).toBe(400);
  });
});

describe('GET /projects', () => {
  test.skip('Response should return a 200 status', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.status).toBe(200);
  });

  test.skip('Response should return error:false', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.error).toBe(false);
  });

  test.skip('Should load data', async () => {
    const data = await request(app).get('/projects').send();
    expect(data).toBeDefined();
  });

  test.skip('Response should not be empty', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

describe('GET /projects/:id', () => {
  test.skip('Response should return a 200 status', async () => {
    const response = await request(app).get(`/projects/${projectId}`).send();
    expect(response.status).toBe(200);
  });
  test.skip('Response should return data undefined if ID is not provided', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.data).toBeUndefined();
  });
  test.skip('Response should return status 500', async () => {
    const response = await request(app).get('/projects/10.;l').send();
    expect(response.status).toBe(500);
  });
});

describe('PUT /projects/:id', () => {
  test.skip('Project was successfully modified', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      active: false,
    });
    expect(response.status).toBe(200);
  });

  test.skip('status should be 400 because the name field must contain letters only', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      name: '@@@@@@@@',
    });
    expect(response.status).toBe(400);
  });
});

describe('DELETE /projects/:id', () => {
  test.skip('The project was deleted', async () => {
    const response = await request(app).delete(`/projects/${projectId}`).send();
    expect(response.status).toBe(200);
  });
  test.skip('Response should return 404 status error, because the id parameter is missing', async () => {
    const response = await request(app).delete('/projects/').send();
    expect(response.status).toEqual(404);
  });
  test.skip('Should return error: false, because projectId2 is missing', async () => {
    const response = await request(app).delete(`/projects/${projectId2}`).send();
    expect(response.error).toBeFalsy();
  });
});
