/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../app';
import Timesheet from '../models/Time-sheets';
import timesheetSeed from '../seeds/time-sheets-seeds';
import Employee from '../models/Employees';
import employeeSeed from '../seeds/employees-seeds';
import Project from '../models/Projects';
import projectsSeeds from '../seeds/projects-seeds';
import Task from '../models/Tasks';
import tasksSeed from '../seeds/tasks-seeds';

beforeAll(async () => {
  Timesheet.collection.insertMany(timesheetSeed);
  Employee.collection.insertMany(employeeSeed);
  Project.collection.insertMany(projectsSeeds);
  Task.collection.insertMany(tasksSeed);
});
let idCatcher;

describe('POST /timesheets', () => {
  test('Successful timesheet creation', async () => {
    const response = await request(app).post('/timesheets').send(
      {
        tasks: [
          '62891835d4e286802a02756e',
          '62891835d4e286802a02756f',
          '628d69a4f1cb7f8f98b9b1f2',
        ],
        employeeId: '628d1eedb91ea97970b7a798',
        projectId: '6283b662e53ed4c648db8a45',
        startDate: '2022-06-05T00:00:00.000+00:00',
        endDate: '2022-07-07T00:00:00.000+00:00',
      },
    );
    idCatcher = response.body.data._id;

    expect(response.status).toBe(201);
  });

  test('Project already assigned to that employee', async () => {
    const response = await request(app).post('/timesheets').send(
      {
        tasks: [
          '62891835d4e286802a02756e',
          '62891835d4e286802a02756f',
          '62891835d4e286802a02756g',
        ],
        employeeId: '628d1eedb91ea97970b7a798',
        projectId: '6283b662e53ed4c648db8a45',
        startDate: '2022-06-05T00:00:00.000+00:00',
        endDate: '2022-07-07T00:00:00.000+00:00',
      },
    );

    expect(response.body.msg).toBe('Code 400: Timesheet already exists');
  });

  // PATH'S OBJECT ID NOT FOUND IN THE CORRESPONDING COLLECTION

  test('Project id not in database', async () => {
    const response = await request(app).post('/timesheets').send(
      {
        tasks: [
          '62891835d4e286802a02756e',
          '62891835d4e286802a02756f',
          '62891835d4e286802a02756g',
        ],
        employeeId: '628d1eedb91ea97970b7a798',
        projectId: '6283b662f53ed4c648db8a45',
        startDate: '2022-06-05T00:00:00.000+00:00',
        endDate: '2022-07-07T00:00:00.000+00:00',
      },
    );

    expect(response.body.msg).toMatch('Code 400: No project with the id');
  });

  test('employee id not in database', async () => {
    const response = await request(app).post('/timesheets').send(
      {
        tasks: [
          '62891835d4e286802a02756e',
          '62891835d4e286802a02756f',
          '62891835d4e286802a02756g',
        ],
        employeeId: '628d1eedb91ea97970b7a79a',
        projectId: '6283b662e53ed4c648db8a45',
        startDate: '2022-06-05T00:00:00.000+00:00',
        endDate: '2022-07-07T00:00:00.000+00:00',
      },
    );

    expect(response.body.msg).toMatch('Code 400: No employee with the id');
  });

  // INVALID DATA

  test('Ivalid task id', async () => {
    const response = await request(app).post('/timesheets').send(
      {
        tasks: [
          'this is an invalid ID',
          '62891835d4e286802a02756f',
          '62891835d4e286802a02756g',
        ],
        employeeId: '62895106842279ad30cd964c',
        projectId: '6283b662e53ed4c648db8a45',
        startDate: '2022-06-05T00:00:00.000+00:00',
        endDate: '2022-07-07T00:00:00.000+00:00',
      },
    );

    expect(response.status).toBe(400);
  });

  test('Ivalid employee id', async () => {
    const response = await request(app).post('/timesheets').send(
      {
        tasks: [
          '62891835d4e286802a02756a',
          '62891835d4e286802a02756f',
          '62891835d4e286802a02756g',
        ],
        employeeId: 'Invalid id',
        projectId: '6283b662e53ed4c648db8a45',
        startDate: '2022-06-05T00:00:00.000+00:00',
        endDate: '2022-07-07T00:00:00.000+00:00',
      },
    );

    expect(response.status).toBe(400);
  });

  test('Ivalid project id', async () => {
    const response = await request(app).post('/timesheets').send(
      {
        tasks: [
          '62891835d4e286802a02756a',
          '62891835d4e286802a02756f',
          '62891835d4e286802a02756g',
        ],
        employeeId: '62895106842279ad30cd964c',
        projectId: 'Invalid ID',
        startDate: '2022-06-05T00:00:00.000+00:00',
        endDate: '2022-07-07T00:00:00.000+00:00',
      },
    );

    expect(response.status).toBe(400);
  });

  test('Start date before current time', async () => {
    const response = await request(app).post('/timesheets').send(
      {
        tasks: [
          '62891835d4e286802a02756a',
          '62891835d4e286802a02756f',
          '62891835d4e286802a02756g',
        ],
        employeeId: '62895106842279ad30cd964c',
        projectId: '6283b662e53ed4c648db8a45',
        startDate: '2021-12-05T00:00:00.000+00:00',
        endDate: '2022-07-07T00:00:00.000+00:00',
      },
    );

    expect(response.status).toBe(400);
  });

  test('Invalid start date', async () => {
    const response = await request(app).post('/timesheets').send(
      {
        tasks: [
          '62891835d4e286802a02756a',
          '62891835d4e286802a02756f',
          '62891835d4e286802a02756g',
        ],
        employeeId: '62895106842279ad30cd964c',
        projectId: '6283b662e53ed4c648db8a45',
        startDate: '202',
        endDate: '2022-07-07T00:00:00.000+00:00',
      },
    );

    expect(response.status).toBe(400);
  });

  test('End date before start date', async () => {
    const response = await request(app).post('/timesheets').send(
      {
        tasks: [
          '62891835d4e286802a02756a',
          '62891835d4e286802a02756f',
          '62891835d4e286802a02756g',
        ],
        employeeId: '62895106842279ad30cd964c',
        projectId: '6283b662e53ed4c648db8a45',
        startDate: '2022-12-05T00:00:00.000+00:00',
        endDate: '2021-07-07T00:00:00.000+00:00',
      },
    );

    expect(response.status).toBe(400);
  });

  test('Ivalid end date', async () => {
    const response = await request(app).post('/timesheets').send(
      {
        tasks: [
          '62891835d4e286802a02756a',
          '62891835d4e286802a02756f',
          '62891835d4e286802a02756g',
        ],
        employeeId: '62895106842279ad30cd964c',
        projectId: '6283b662e53ed4c648db8a45',
        startDate: '2022-12-05T00:00:00.000+00:00',
        endDate: '205102',
      },
    );

    expect(response.status).toBe(400);
  });

  // OMMIT REQUIRED FIELDS
  test('No project included', async () => {
    const response = await request(app).post('/timesheets').send(
      {
        tasks: [
          '62891835d4e286802a02756e',
          '62891835d4e286802a02756f',
          '62891835d4e286802a02756g',
        ],
        employeeId: '62895106842279ad30cd964c',
        startDate: '2022-06-05T00:00:00.000+00:00',
        endDate: '2022-07-07T00:00:00.000+00:00',
      },
    );

    expect(response.status).toBe(400);
  });

  test('No employee included', async () => {
    // eslint-disable-next-line no-unused-vars
    const response = await request(app).post('/timesheets').send(
      {
        tasks: [
          '62891835d4e286802a02756e',
          '62891835d4e286802a02756f',
          '62891835d4e286802a02756g',
        ],
        projectId: '6283b662e53ed4c648db8a45',
        startDate: '2022-06-05T00:00:00.000+00:00',
        endDate: '2022-07-07T00:00:00.000+00:00',
      },
    );
    // expect(response.body.msg).toBe('Code 400: Timesheet already exists');
  });

  test('No end date included', async () => {
    const response = await request(app).post('/timesheets').send(
      {
        tasks: [
          '62891835d4e286802a02756e',
          '62891835d4e286802a02756f',
          '62891835d4e286802a02756g',
        ],
        employeeId: '62895106842279ad30cd964c',
        projectId: '6283b662e53ed4c648db8a45',
        startDate: '2022-12-05T00:00:00.000+00:00',
      },
    );

    expect(response.status).toBe(400);
  });
});
describe('GET /timesheets', () => {
  test('Response should return a 200 status', async () => {
    const response = await request(app).get('/timesheets').send();
    await expect(response.status).toBe(200);
  });

  test('Response should return a 200 status', async () => {
    const response = await request(app).get('/timesheets').send();
    await expect(response.body.data.length).toBeGreaterThan(0);
  });
  test('The path is wrong', async () => {
    const response = await request(app).get('/time/sheets').send();
    await expect(response.status).toBe(404);
  });
  test('The path is wrong', async () => {
    const response = await request(app).get('/time-sheets').send();
    await expect(response.status).toBe(404);
  });
  test('The path is wrong', async () => {
    const response = await request(app).get('/api').send();
    await expect(response.status).toBe(404);
  });
});

describe('GetById /timesheets/_id', () => {
  test('get by Id', async () => {
    const response = await request(app).get(`/timesheets/${idCatcher}`).send();
    expect(response.status).toBe(200);
  });
  test('get by Id', async () => {
    const response = await request(app).get(`/timesheets/${idCatcher}`).send();
    expect(response.body.error).toBeFalsy();
  });
  test('get incorret id', async () => {
    const response = await request(app).get('/timesheets/628d84082c6e84a4e44b4cad').send();
    expect(response.status).toBe(404);
  });
  test('get incorret id', async () => {
    const response = await request(app).get('/timesheets/628d84082c6e84a4e44b4cad').send();
    expect(response.body.message).toBe('TimeSheets with id 628d84082c6e84a4e44b4cad not found');
  });
  test('get incorret id format', async () => {
    const response = await request(app).get('/timesheets/628').send();
    expect(response.status).toBe(500);
  });
  test('get incorret id format', async () => {
    const response = await request(app).get('/timesheets/628').send();
    expect(response.body.error).toBeTruthy();
  });
});

describe('DELETE /timesheets', () => {
  test('Should delete a timesheet', async () => {
    const response = await request(app).delete(`/timesheets/${idCatcher}`).send();
    expect(response.status).toEqual(204);
  });
  test('Should not delete a proyect ', async () => {
    const response = await request(app).delete('/timesheets/6274613d5f1b9c4131f527e4').send();
    expect(response.status).toEqual(404);
  });
});

// expect(response.body.msg).toBe('There is no timesheet with this Id 6274613d5f1b9c4131f527e4');
