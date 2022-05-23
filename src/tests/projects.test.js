import request from 'supertest';
import app from '../app';
import projectsSeed from '../seeds/projects-seeds';
import Projects from '../models/Projects';

beforeAll(async () => {
  await Projects.collection.insertMany(projectsSeed);
});

// let projectId;

describe('GET /projects', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.status).toBe(200);
  });

  test('response should return error:false', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.error).toBe(false);
  });

  test('should load data', async () => {
    const data = await request(app).get('/projects').send();
    expect(data).toBeDefined();
  });

  test('response should not be empty', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

// describe('DELETE /projects/:id', () => {
//     test('The project was deleted', async () => {
//         const response = await request(app).get(`/projects/${projectId}`).send();
//         expect(response.status).toEqual(200);
//     });
// });

// describe('GET /projects/:id', () => {
//     test('response should return a 200 status', async () => {
//         const response = await request(app).get(`/projects/${project.projectId}`).send();
//         expect(response.status).toBe(200);
//       });
// });

// describe('POST /projects/createProject', () => {
//     test('should create a new project', async () => {
//         const response = await request(app).post('/projects/createProject').send({
//             name: 'Rihanna',
//             description: 'this is another description',
//             starDate: 2022,
//             clientName: 'rose',
//             active: true,
//             employees: [{
//                 object1: {
//                     role: 'QA',
//                     rate: '42',
//                     _id: '1'
//                 },
//                 object2: {
//                     role: 'QA',
//                     rate: '101',
//                     _id: '2'
//                 },
//                 object3: {
//                     role: 'QA',
//                     rate: '164',
//                     _id: '3'
//                 }
//             }],
//             admins: 'Lucas',
//             createdAt: 2022,
//             updatedAt: 2022,
//         });
//         expect(response.status).toBe(201);
//     });

// test('should not be empty', async () => {
//     const response = await request(app).post('/projects/createProject').send({
//         name: 'Lionel Messi',
//         description: 'this is the description',
//         starDate: 2022 - 05 - 16,
//         clientName: 'rose',
//         active: true,
//         employees: [{
//             object: {
//                 role: 'PM',
//                 rate: '42',
//                 _id: '6283b662e53ed4c648db8a46'
//             },
//             object: {
//                 role: 'TL',
//                 rate: '101',
//                 _id: '6283b662e53ed4c648db8a47'
//             },
//             object: {
//                 role: 'TL',
//                 rate: '164',
//                 _id: '6283b662e53ed4c648db8a48'
//             }
//         }],
//         admins: 'Coco Lobos',
//         createdAt: 2022 - 05 - 17,
//         updatedAt: 2022 - 05 - 17,
//     });
//     expect(response.body).toHaveLength(response.length);
// });
// });
