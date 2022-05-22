// import request from 'supertest';
// import app from '../app';
// import Employees from '../models/Employees';
// import employeesSeed from '../seeds/employees-seeds';

// beforeAll(async () => {
//   await Employees.collection.insertMany(employeesSeed);
// });

// let employeeId;
// let employeeId2;

// describe('GET /employees', () => {
//   test('response should return a 200 status', async () => {
//     const response = await request(app).get('/employees').send();
//     expect(response.status).toBe(200);
//   });

//   test('response should return a false error', async () => {
//     const response = await request(app).get('/employees').send();
//     expect(response.error).toBeFalsy();
//   });
// });

// describe('POST /employees', () => {
//   test('Creation of employee', async () => {
//     const response = await request(app).post('/employees').send({
//       firstName: 'ezequiel',
//       lastName: 'rocco',
//       phone: '2481726',
//       email: 'ezequiel@gmail.com',
//       password: 'ezequiel123',
//       active: false,
//     });
//     expect(response.status).toBe(201);
//     employeeId = response.body.data._id;
//   });

//   test('if status msg is equal a status 201', async () => {
//     const response = await request(app).post('/employees').send({
//       firstName: 'Coco',
//       lastName: 'Lobos',
//       phone: '2461726',
//       email: 'coco@gmail.com',
//       password: 'coco123',
//       active: false,
//     });
//     expect(response.body.msg).toEqual('Status 201');
//     employeeId2 = response.body.data._id;
//   });

//   test('should not create employee', async () => {
//     const response = await request(app).post('/employees').send();
//     expect(response.status).toBe(400);
//   });
// });

// describe('PUT /employees/:id', () => {
//   test('status 200 if the employee was modified', async () => {
//     const response = await request(app).put(`/employees/${employeeId}`).send({
//       email: 'ezequielrocco@gmail.com',
//     });
//     expect(response.status).toEqual(200);
//     employeeId = response.body.data._id;
//   });

//   test('show the corresponding msg if an element already exists', async () => {
//     const response = await request(app).put(`/employees/${employeeId}`).send({
//       email: 'ezequielrocco@gmail.com',
//     });
//     expect(response.body.msg).toEqual('Email already exist');
//   });
// });

// describe('DELETE /employees/:id', () => {
//   test('the employee was successfully deleted', async () => {
//     const response = await request(app).delete(`/employees/${employeeId}`).send();
//     expect(response.status).toEqual(200);
//   });

//   test('response should return a false error', async () => {
//     const response = await request(app).delete(`/employees/${employeeId2}`).send();
//     expect(response.error).toBeFalsy();
//   });

//   test('status 404 if the employee does not exist', async () => {
//     const response = await request(app).delete('/employees/').send();
//     expect(response.status).toEqual(404);
//   });
// });
