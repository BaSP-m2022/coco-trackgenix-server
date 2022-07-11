import req from 'supertest';
import app from '../app';
import seeds from '../seeds/members-seeds';
import models from '../models/Members';

beforeAll(async () => {
  await models.collection.insertMany(seeds);
});

describe('GET ALL /members', () => {
  test.skip('Shold return a 200 status', async () => {
    const response = await req(app).get('/members').send();
    expect(response.status).toBe(200);
  });
  test.skip('Shold return a false error', async () => {
    const response = await req(app).get('/members').send();
    expect(response.error).toBe(false);
  });
});
