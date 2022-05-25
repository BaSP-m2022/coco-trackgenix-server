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

describe('projects endpoints', () => {
  test('should create new project', async () => {
    const response = await request(app).post('/projects/').send({
      name: 'Alfonso',
      description: 'this is the description',
      starDate: '2022',
      clientName: 'coco',
      active: true,
      admins: 'Ricardo',
      employees: [
        {
          name: '62829f2c70298d2e5168f1e2',
        },
      ],
    });
    expect(response.status).toBe(201);
    projectId = response.body.data._id;
  });
  test('msg is equal to status success', async () => {
    const response = await request(app).post('/projects/').send({
      name: 'Ezequiel',
      description: 'this is the description',
      starDate: '2022',
      clientName: 'Alfonso',
      active: true,
      admins: 'Day',
      employees: [
        {
          name: '628d6db998a9749e0a37c9bf',
        },
      ],
    });
    expect(response.body.msg).toEqual('success');
    projectId2 = response.body.data._id;
  });
  test('msg is equal to status success', async () => {
    const response = await request(app).post('/projects/').send();
    expect(response.status).toBe(400);
  });
});

describe('PUT /projects/:id', () => {
  test('Project was successfully modified', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      active: false,
    });
    expect(response.status).toBe(200);
  });

  test('status should be 400', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      name: '@@@@@@@@',
    });
    expect(response.status).toBe(400);
  });
});

describe('DELETE /projects/:id', () => {
  test('The project was deleted', async () => {
    const response = await request(app).delete(`/projects/${projectId}`).send();
    expect(response.status).toBe(200);
  });
  test('Response should return 404 status error', async () => {
    const response = await request(app).delete('/projects/').send();
    expect(response.status).toEqual(404);
  });
  test('Should return error: false', async () => {
    const response = await request(app).delete(`/projects/${projectId2}`).send();
    expect(response.error).toBeFalsy();
  });
});
