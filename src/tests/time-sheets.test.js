/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../app';
import Timesheet from '../models/Time-sheets';
import timesheetsSeed from '../seeds/time-sheets-seeds';
import Employee from '../models/Employees';
import employeesSeed from '../seeds/employees-seeds';
import Project from '../models/Projects';
import projectsSeed from '../seeds/projects-seeds';
import Task from '../models/Tasks';
import tasksSeed from '../seeds/tasks-seeds';

beforeAll(async () => {
  await Timesheet.collection.insertMany(timesheetsSeed);
  await Employee.collection.insertMany(employeesSeed);
  await Project.collection.insertMany(projectsSeed);
  await Task.collection.insertMany(tasksSeed);
});

let idCatcher;

describe('POST /timesheets', () => {
  test.skip('Successful timesheet creation', async () => {
    const response = await request(app).post('/timesheeTimesheetts').send(
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

  test.skip('Project already assigned to that employee', async () => {
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

  test.skip('Project id not in database', async () => {
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

  test.skip('employee id not in database', async () => {
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

  test.skip('Invalid task id', async () => {
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

  test.skip('Invalid employee id', async () => {
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

  test.skip('Invalid project id', async () => {
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

  test.skip('Start date before current time', async () => {
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

  test.skip('Invalid start date', async () => {
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

  test.skip('End date before start date', async () => {
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

  test.skip('Invalid end date', async () => {
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
  test.skip('No project included', async () => {
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

  test.skip('No employee included', async () => {
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
    // eslint-disable-next-line no-useless-escape
    expect(response.body.msg).toBe('Code 400: \"employeeId\" is required');
  });

  test.skip('No end date included', async () => {
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

describe('PUT /timesheets/:id', () => {
  test.skip('Successful timesheet update', async () => {
    const response = await request(app).put(`/timesheets/${idCatcher}`).send(
      {
        startDate: '2022-08-05T00:00:00.000+00:00',
        endDate: '2023-07-07T00:00:00.000+00:00',
      },
    );

    expect(response.body.msg).toBe('Code 201: Task successfully updated');
  });

  test.skip('timesheet id not found', async () => {
    const response = await request(app).put('/timesheets/6283b662e53ed4c648db8a46').send(
      {
        projectId: '6283b662e53ed4c648db8b45',
      },
    );

    expect(response.body.msg).toBe('Code 404: Timesheet not found');
  });

  test.skip('timesheet for that employee of that project already exists', async () => {
    const response = await request(app).put(`/timesheets/${idCatcher}`).send(
      {
        employeeId: '628d1eedb91ea97970b7a798',
        projectId: '6283b662e53ed4c648db8a45',
      },
    );

    expect(response.body.msg).toBe('Code 400: Timesheet already assigned to the employee');
  });

  test.skip('Project id not in database', async () => {
    const response = await request(app).put(`/timesheets/${idCatcher}`).send(
      {
        projectId: '6283b662e53ed4c648db8b40',
      },
    );

    expect(response.body.msg).toMatch('Code 400: No project with the id');
  });

  test.skip('Employee id not in database', async () => {
    const response = await request(app).put(`/timesheets/${idCatcher}`).send(
      {
        employeeId: '62894106842279ad30cd964c',
      },
    );

    expect(response.body.msg).toMatch('Code 400: No employee with the id');
  });

  // INVALID DATA

  test.skip('Invalid task id', async () => {
    const response = await request(app).put(`/timesheets/${idCatcher}`).send(
      { tasks: ['this is an invalid ID'] },
    );

    expect(response.status).toBe(400);
  });

  test.skip('Invalid employee id', async () => {
    const response = await request(app).put(`/timesheets/${idCatcher}`).send(
      { employeeId: 'Invalid id' },
    );

    expect(response.status).toBe(400);
  });

  test.skip('Invalid project id', async () => {
    const response = await request(app).put(`/timesheets/${idCatcher}`).send(
      { projectId: 'Invalid ID' },
    );

    expect(response.status).toBe(400);
  });

  test.skip('Start date before current time', async () => {
    const response = await request(app).put(`/timesheets/${idCatcher}`).send(
      { startDate: '2021-12-05T00:00:00.000+00:00' },
    );

    expect(response.status).toBe(400);
  });

  test.skip('Invalid start date', async () => {
    const response = await request(app).post('/timesheets').send(
      { startDate: '202' },
    );

    expect(response.status).toBe(400);
  });

  test.skip('End date before start date', async () => {
    const response = await request(app).post('/timesheets').send(
      {
        startDate: '2022-12-05T00:00:00.000+00:00',
        endDate: '2021-07-07T00:00:00.000+00:00',
      },
    );

    expect(response.status).toBe(400);
  });

  test.skip('Invalid end date', async () => {
    const response = await request(app).post('/timesheets').send(
      { endDate: '205102' },
    );

    expect(response.status).toBe(400);
    expect(response.status).toBe(400);
  });
});
describe('GET /timesheets', () => {
  test.skip('Response should return a 200 status', async () => {
    const response = await request(app).get('/timesheets').send();
    await expect(response.status).toBe(200);
  });

  test.skip('Response should return a 200 status', async () => {
    const response = await request(app).get('/timesheets').send();
    await expect(response.body.data.length).toBeGreaterThan(0);
  });
  test.skip('The path is wrong', async () => {
    const response = await request(app).get('/time/sheets').send();
    await expect(response.status).toBe(404);
  });
  test.skip('Should load data', async () => {
    const response = await request(app).get('/timesheets').send();
    expect(response).toBeDefined();
  });
  test.skip('The path is wrong', async () => {
    const response = await request(app).get('/api').send();
    await expect(response.error).toBeTruthy();
  });
});
describe('GetById /timesheets/_id', () => {
  test.skip('get by Id', async () => {
    const response = await request(app).get(`/timesheets/${idCatcher}`).send();
    expect(response.status).toBe(200);
  });
  test.skip('get by Id', async () => {
    const response = await request(app).get(`/timesheets/${idCatcher}`).send();
    expect(response.body.error).toBeFalsy();
  });
  test.skip('get incorret id', async () => {
    const response = await request(app).get('/timesheets/628d84082c6e84a4e44b4cad').send();
    expect(response.status).toBe(404);
  });
  test.skip('get incorret id', async () => {
    const response = await request(app).get('/timesheets/628d84082c6e84a4e44b4cad').send();
    expect(response.body.message).toBe('TimeSheets with id 628d84082c6e84a4e44b4cad not found');
  });
  test.skip('get incorret id format', async () => {
    const response = await request(app).get('/timesheets/628').send();
    expect(response.status).toBe(500);
  });
  test.skip('get incorret id format', async () => {
    const response = await request(app).get('/timesheets/628').send();
    expect(response.body.error).toBeTruthy();
  });
});
describe('DELETE /timesheets', () => {
  test.skip('Should delete a timesheet', async () => {
    const response = await request(app).delete(`/timesheets/${idCatcher}`).send();
    expect(response.status).toEqual(204);
  });
  test.skip('Should not delete a proyect ', async () => {
    const response = await request(app).delete('/timesheets/6274613d5f1b9c4131f527e4').send();
    expect(response.status).toEqual(404);
  });
});
