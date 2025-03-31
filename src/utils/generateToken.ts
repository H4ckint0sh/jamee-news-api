require('dotenv').config();
import jwt from 'jsonwebtoken';
import { User } from "../db/data/types";
const SECRET_KEY = process?.env?.SECRET_KEY;

export function generateToken(user: User) {
	if (SECRET_KEY) {
		return jwt.sign({ user_id: user.user_id, userName: user.userName, roleId: user.roleId, name: user.name }, SECRET_KEY, { expiresIn: '1h' });
	}
}
