/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../app';
import Tasks from '../models/Tasks';
import tasksSeeds from '../seeds/tasks-seeds';

const taskId = '62891835d4e286802a02756e';

beforeAll(async () => {
  await Tasks.collection.insertMany(tasksSeeds);
});

describe('GET /tasks', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.status).toBe(200);
  });

  test('response should return a false error', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.error).toBe(false);
  });

  test('response should return at least one task', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

describe('GET /:id', () => {
  test('should return an specific task', async () => {
    const response = await request(app).get(`/tasks/${taskId}`).send();
    const Task = {
      description: 'task description',
      workedHours: 20,
    };
    expect(response.body.data).toMatchObject(Task);
  });
});
