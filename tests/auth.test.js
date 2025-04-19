
const request = require('supertest');
const app = require('../server');

describe('Auth Endpoints', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ email: 'foo@example.com', password: 'secret123' });
        expect(res.statusCode).toBe(201);
        expect(res.body.token).toBeDefined();
    });

    it('should login existing user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'foo@example.com', password: 'secret123' });
        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
    });
});
