const request = require('supertest');
const app = require('../server');
const db = require('../config/dbConfig');

let jwt;

beforeAll(async () => {
    // register & login to get token
    await request(app).post('/api/auth/register')
        .send({ email: 'bar@example.com', password: 'pwd12345' });
    const res = await request(app).post('/api/auth/login')
        .send({ email: 'bar@example.com', password: 'pwd12345' });
    jwt = res.body.token;
});

describe('Tasks CRUD', () => {
    let taskId;

    it('creates a task', async () => {
        const res = await request(app)
            .post('/api/tasks')
            .set('Authorization', `Bearer ${jwt}`)
            .send({
                title: 'Test task',
                dueDate: '2025-06-01'
            });
        expect(res.statusCode).toBe(201);
        taskId = res.body.id;
    });

    // Testing the get endpoint 

    it('fetches all tasks', async () => {
        const res = await request(app)
            .get('/api/tasks')
            .set('Authorization', `Bearer ${jwt}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.tasks)).toBe(true);
    });

    // Testing the update endpoint

    it('updates a task', async () => {
        const res = await request(app)
            .put(`/api/tasks/${taskId}`)
            .set('Authorization', `Bearer ${jwt}`)
            .send({ status: 'completed' });
        expect(res.statusCode).toBe(200);
    });

    // Testing the delete endpoint

    it('deletes a task', async () => {
        const res = await request(app)
            .delete(`/api/tasks/${taskId}`)
            .set('Authorization', `Bearer ${jwt}`);
        expect(res.statusCode).toBe(204);
    });
});

// Closing the db connection
afterAll(async () => {
    await db.end();
});