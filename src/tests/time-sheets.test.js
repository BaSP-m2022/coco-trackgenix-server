// import app from '../app';
// import timesheets from '../models/Time-sheets';
// import timesheetseeds from '../seeds/time-sheets-seeds';

// beforeAll(async () => {
//   await timesheets.collection.insertMany(timesheetseeds);
// });
// describe('GET /api/time-sheets', () => {
//   test('Response should return a 200 status', async () => {
//     const response = await request(app).get('/api/time-sheets').send();
//     await expect(response.status).toBe(200);
//   });
//   test('response should return false error', async () => {
//     const response = await request(app).get('/api/time/sheets').send();
//     await expect(response.status).toBe(404);
//   });
//   test('response should return false error', async () => {
//     const response = await request(app).get('/api/timesheets').send();
//     await expect(response.status).toBe(404);
//   });
//   test('response should return false error', async () => {
//     const response = await request(app).get('/api').send();
//     await expect(response.status).toBe(404);
//   });
// });
// npm
