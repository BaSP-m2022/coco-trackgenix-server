import request from 'supertest';
import app from '../app';
import Tasks from '../models/Tasks';
import tasksSeeds from '../seeds/tasks-seeds';

beforeAll(async () => {
  await Tasks.collection.insertMany(tasksSeeds);
});

describe('GET /tasks', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.error).toBe(false);
  });
});
