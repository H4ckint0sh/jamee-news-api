import * as dotenv from 'dotenv';
dotenv.config(); // Make sure this is at the very top

import request from 'supertest';
import app from '../app';

import seed from '../db/seeds/seed';
import db from '../db/connection';

import testData from '../db/data/test-data/index';

import { Topic } from '../db/data/types';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'test-secret';

beforeEach(async () => {
    await seed(testData);
});

afterAll(async () => {
    await db.close();
});

describe('TOPICS endpoints', () => {
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

    test('200 - GET: Responds with an array of 3 topics', async () => {
        const {
            body: { topics },
        } = await request(app)
            .get('/api/topics')
            .set('Authorization', `Bearer ${userToken}`)
            .expect(200);
        expect(topics).toHaveLength(3);
        topics.forEach((topic: Topic) => {
            expect(topic).toHaveProperty('slug');
            expect(topic).toHaveProperty('description');
        });
    });

    test('201 - POST: Responds with a newly created topic', async () => {
        const newTopicBody = {
            slug: 'tigers',
            description: "tiger's life in the forest",
        };
        const {
            body: { newTopic },
        } = await request(app)
            .post('/api/topics')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(newTopicBody)
            .expect(201);
        expect(newTopic).toMatchObject({
            slug: 'tigers',
            description: "tiger's life in the forest",
        });
    });

    test('201 - POST: Responds with a newly created topic when no description passed', async () => {
        const newTopicBody = {
            slug: 'tigers',
        };
        const {
            body: { newTopic },
        } = await request(app)
            .post('/api/topics')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(newTopicBody)
            .expect(201);
        expect(newTopic).toMatchObject({
            slug: 'tigers',
            description: expect.any(String),
        });
    });

    test('400 - POST: Responds with an appropriate error message whe missing slug key', async () => {
        const newTopic = {
            description: "tiger's life in the forest",
        };
        const {
            body: { message },
        } = await request(app)
            .post('/api/topics')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(newTopic)
            .expect(400);
        expect(message).toBe('Bad request');
    });
});
