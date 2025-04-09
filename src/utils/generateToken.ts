import * as dotenv from 'dotenv';
dotenv.config(); // Make sure this is at the very top

import jwt from 'jsonwebtoken';
import { User } from '../db/data/types';

const SECRET_KEY = process.env.SECRET_KEY; // Provide a default

export function generateToken(user: User) {
    if (!SECRET_KEY) {
        return null; // Or throw an error, depending on your error handling strategy
    }
    return jwt.sign(
        {
            user_id: user.user_id,
            userName: user.userName,
            roleId: user.roleId,
            name: user.name,
        },
        SECRET_KEY,
        { expiresIn: '1h' }
    );
}
