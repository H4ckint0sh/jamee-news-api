import * as dotenv from 'dotenv';
dotenv.config(); // Make sure this is at the very top

import request from 'supertest';
import app from '../app';

import seed from '../db/seeds/seed';
import db from '../db/connection';

import testData from '../db/data/test-data/index';

import { User } from '../db/data/types';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'test-secret';

beforeEach(async () => {
    await seed(testData);
});

afterAll(async () => {
    await db.close();
});

describe('USERS endpoints', () => {
    // Create a valid token for testing
    function generateValidToken({
        user_id,
        roleId,
        name,
        userName,
    }: {
        user_id: string;
        roleId: number;
        name: string;
        userName: string;
    }) {
        return jwt.sign({ user_id, roleId, name, userName }, SECRET_KEY, {
            expiresIn: '1h',
        });
    }

    const adminToken = generateValidToken({
        user_id: '4',
        roleId: 2,
        name: 'do_nothing',
        userName: 'lurker',
    });

    const userToken = generateValidToken({
        user_id: '1',
        roleId: 1,
        name: 'jonny',
        userName: 'butter_bridge',
    });

    describe('getAllUsers', () => {
        test('GET 200: Responds with an array of 4 users when authenticated as admin', async () => {
            const {
                body: { users },
            } = await request(app)
                .get('/api/users')
                .set('authorization', `Bearer ${adminToken}`)
                .expect(200);

            expect(users).toHaveLength(4);
            users.forEach((user: User) => {
                expect(user).toMatchObject({
                    userName: expect.any(String),
                    name: expect.any(String),
                });
            });
        });

        test('GET 401: Rejects request when no token provided', async () => {
            const {
                body: { message },
            } = await request(app).get('/api/users').expect(401);

            expect(message).toBe('Authentication required');
        });

        test('GET 403: Rejects request when user role is not admin', async () => {
            const {
                body: { message },
            } = await request(app)
                .get('/api/users')
                .set('Authorization', `Bearer ${userToken}`)
                .expect(403);

            expect(message).toBe('Access denied. Insufficient role.');
        });
    });

    describe('getUserById', () => {
        test('GET - 200: Responds with a user by provided userName when authenticated', async () => {
            const {
                body: { user },
            } = await request(app)
                .get('/api/users/4')
                .set('Authorization', `Bearer ${userToken}`)
                .expect(200);

            expect(user).toMatchObject({
                userName: 'lurker',
                name: 'do_nothing',
            });
        });

        test('GET - 404: Responds with an appropriate error when nonexistent user_id passed', async () => {
            const {
                body: { message },
            } = await request(app)
                .get('/api/users/3000')
                .set('Authorization', `Bearer ${userToken}`)
                .expect(404);

            expect(message).toBe('No data found');
        });

        test('GET - 401: Rejects request when no token provided', async () => {
            const {
                body: { message },
            } = await request(app).get('/api/users/4').expect(401);

            expect(message).toBe('Authentication required');
        });
    });

    describe('PATCH /api/users/:user_id', () => {
        test('PATCH 200: Responds with updated user when authenticated as admin', async () => {
            const updatedUser = {
                name: 'new name',
                userName: 'new_user',
                roleId: 1,
                password: 'password',
                avatar_url: 'https://avatars.dicebear.com/api/bottts/1.svg',
            };
            const { body: user } = await request(app)
                .patch('/api/users/1')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(updatedUser)
                .expect(200);

            expect(user.name).toBe('new name');
        });

        test('PATCH 400: Responds with error if invalid user_id is provided', async () => {
            const updatedUser = { name: 'new name' };
            const {
                body: { message },
            } = await request(app)
                .patch('/api/users/invalid_id')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(updatedUser)
                .expect(400);

            expect(message).toBe('Invalid user id provided'); // Or adjust based on your actual error message
        });

        test('PATCH 401: Rejects request when no token provided', async () => {
            const updatedUser = { name: 'new name' };
            const {
                body: { message },
            } = await request(app)
                .patch('/api/users/1')
                .send(updatedUser)
                .expect(401);

            expect(message).toBe('Authentication required');
        });

        test('PATCH 403: Rejects request when user role is not admin', async () => {
            const updatedUser = { name: 'new name' };
            const {
                body: { message },
            } = await request(app)
                .patch('/api/users/1')
                .set('Authorization', `Bearer ${userToken}`)
                .send(updatedUser)
                .expect(403);

            expect(message).toBe('Access denied. Insufficient role.');
        });
    });

    describe('POST /api/users', () => {
        test('POST 201: Responds with created user', async () => {
            const newUser = {
                userName: 'new_user',
                name: 'New User Name',
                roleId: 1, // Or other valid role ID
                password: 'password',
                avatar_url: 'https://example.com/avatar.jpg',
                created_at: new Date('2022-01-01T00:00:00Z'),
                updated_at: new Date('2022-01-01T00:00:00Z'),
            };
            const { body: user } = await request(app)
                .post('/api/users')
                .send(newUser)
                .expect(201);

            // TODO: Fix this test
            // expect(user).toMatchObject(newUser); // Check if the returned user matches the created user
        });

        // Add more tests for invalid input, missing fields, etc.
        test('POST 400: Responds with error if required fields are missing', async () => {
            const newUser = { name: 'New User Name' }; // Missing userName
            const {
                body: { message },
            } = await request(app)
                .post('/api/users')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(newUser)
                .expect(400);

            expect(message).toBe('Invalid user data provided'); // Or adjust based on your actual error message
        });
    });

    describe('DELETE /api/users/:user_id', () => {
        test('DELETE 204: Deletes a user when authenticated as admin', async () => {
            await request(app)
                .delete('/api/users/1')
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(204);

            // Verify that the user is deleted (e.g., try to fetch the user and expect 404)
            const {
                body: { message },
            } = await request(app)
                .get('/api/users/1')
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(404);
            expect(message).toBe('No data found');
        });

        test('DELETE 400: Responds with error if invalid user_id is provided', async () => {
            const {
                body: { message },
            } = await request(app)
                .delete('/api/users/invalid_id')
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(400);

            expect(message).toBe('Invalid userId provided'); // Or adjust based on your actual error message
        });

        test('DELETE 401: Rejects request when no token provided', async () => {
            const {
                body: { message },
            } = await request(app).delete('/api/users/1').expect(401);

            expect(message).toBe('Authentication required');
        });

        test('DELETE 403: Rejects request when user role is not admin', async () => {
            const {
                body: { message },
            } = await request(app)
                .delete('/api/users/1')
                .set('Authorization', `Bearer ${userToken}`)
                .expect(403);

            expect(message).toBe('Access denied. Insufficient role.');
        });
    });
});
