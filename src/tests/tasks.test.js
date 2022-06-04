/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../app';
import Tasks from '../models/Tasks';
import tasksSeeds from '../seeds/tasks-seeds';

const taskId = '62891835d4e286802a02756e';
let newTask;

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
      _id: '62891835d4e286802a02756e',
      decription: 'task 1',
      workedHours: 10,
      date: '2021-11-05T00:00:00.000Z',
    };
    expect(response.body.data).toMatchObject(Task);
  });
});

describe('POST /', () => {
  test('should create a new task', async () => {
    const response = await request(app).post('/tasks/').send(
      {
        description: 'Trying to figure test out',
        workedHours: '10',
      },
    );
    expect(response.status).toBe(201);
    newTask = response.body.data._id;
  });
  test('should indicate that the task already exists', async () => {
    const response = await request(app).post('/tasks/').send(
      {
        description: 'Trying to figure test out',
        workedHours: '10',
      },
    );
    expect(response.body.msg).toEqual('Code 400: This task already exists');
  });
  test('should indicate the task creation', async () => {
    const response = await request(app).post('/tasks/').send(
      {
        description: 'This is a new task',
        workedHours: '10',
      },
    );
    expect(response.body.msg).toEqual('Code 201: Task successfully created');
  });
  test('workedHours missing, should not create a task', async () => {
    const response = await request(app).post('/tasks/').send(
      {
        description: 'This is a new task',
      },
    );
    expect(response.status).toBe(400);
  });
  test('description missing, should not create a task', async () => {
    const response = await request(app).post('/tasks/').send(
      {
        workedHours: '10',
      },
    );
    expect(response.status).toBe(400);
  });
  test('workedHours must be integer numbers, should not create a task', async () => {
    const response = await request(app).post('/tasks/').send(
      {
        description: 'Nice to meet you',
        workedHours: '0.5',
      },
    );
    expect(response.status).toBe(400);
  });
  test('workedHours must be positive numbers, should not create a task', async () => {
    const response = await request(app).post('/tasks/').send(
      {
        description: 'Nice to meet you',
        workedHours: '-1',
      },
    );
    expect(response.status).toBe(400);
  });
  test('description must contain at least 1 character, should not create a task', async () => {
    const response = await request(app).post('/tasks/').send(
      {
        description: '',
        workedHours: '10',
      },
    );
    expect(response.status).toBe(400);
  });
  test('description should not contain symbols, should not create a task', async () => {
    const response = await request(app).post('/tasks/').send(
      {
        description: 'Hi! How r u?',
        workedHours: '10',
      },
    );
    expect(response.status).toBe(400);
  });
});

const fakeId = '62891835d4e286802a756f';

describe('DELETE, /:id', () => {
  test('should delete a task', async () => {
    const response = await request(app).delete(`/tasks/${newTask}`).send();
    expect(response.status).toBe(204);
  });
  test('should not find the task id', async () => {
    const response = await request(app).delete(`/tasks/${fakeId}`).send();
    expect(response.status).toBe(404);
  });
  test('should indicate the task was not find', async () => {
    const response = await request(app).delete(`/tasks/${fakeId}`).send();
    expect(response.body.msg).toEqual(`Code 404: Task with id ${fakeId} not found`);
  });
  test('should return undefined because of 204 status', async () => {
    const response = await request(app).delete(`/tasks/${newTask}`).send();
    expect(response.body.msg).toBeUndefined();
  });
});

describe('PUT, /:id', () => {
  test('should return a 200 status', async () => {
    const response = await request(app).put(`/tasks/${taskId}`).send(
      {
        description: 'This is the modified task',
        workedHours: '15',
      },
    );
    expect(response.status).toBe(201);
  });
  test('should indicate that the task does not exist - because it was deleted', async () => {
    const response = await request(app).put(`/tasks/${newTask}`).send(
      {
        description: 'Trying to figure test out',
        workedHours: '10',
      },
    );
    expect(response.body.msg).toEqual('Code 400: This task do not exist');
  });
});
test.todo('complete test');
