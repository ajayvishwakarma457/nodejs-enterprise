import request from 'supertest';
import app from '../index';

describe('GET /users', () => {
  it('should return users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
