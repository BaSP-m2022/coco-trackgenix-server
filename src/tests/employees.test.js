// import request from 'supertest';
// import app from '../app';
// import Employees from '../models/Employees';
// import employeesSeed from '../seeds/employees-seeds';

// beforeAll(async () => {
//   await Employees.collection.insertMany(employeesSeed);
// });

// let employeeId;

// describe('GET /employees', () => {
//   test('response should return a 200 status', async () => {
//     const response = await request(app).get('/employees').send();
//     expect(response.status).toBe(200);
//   });

//   test('response should return a false error', async () => {
//     const response = await request(app).get('/employees').send();
//     expect(response.error).toBeFalsy;
//   });
// });

// describe('POST /employees', () => {
//   test('Creation of employee', async () => {
//     const response = await request(app).post('/employees').send({
//       firstName: 'bruno',
//       lastName: 'ramirez',
//       phone: '2981726',
//       email: 'esteban@gmail.com',
//       password: 'esteban123',
//       active: false,
//     });
//     expect(response.status).toBe(201);
//     employeeId = response.body.data._id;
//   });

//   test('response should return a false error if employee is created', async () => {
//     const response = await request(app).post('/employees').send({
//       firstName: 'bruno',
//       lastName: 'ramirez',
//       phone: '2981726',
//       email: 'esteban@gmail.com',
//       password: 'esteban123',
//       active: false,
//     });
//     expect(response.status).toBeFalsy;
//   });
//   test('should not create employee', async () => {
//     const response = await request(app).post('/employees').send();
//     expect(response.status).toBe(400);
//   });
// });

// describe('DELETE /employees/:id', () => {
//   test('the employee was successfully deleted', async () => {
//     const response = await request(app).delete(`/employees/${employeeId}`).send();
//     expect(response.status).toEqual(200);
//   });
// });
