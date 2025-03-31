import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../db/data/types';
import { HttpError } from './error-handling';

//TODO: Get rid of your_secret_key
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

interface AuthenticatedRequest extends Request {
	user?: User;
}

export function verifyToken(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
	const token = req.headers['authorization'];
	if (!token) {
		throw new HttpError(403, 'No token provided.');
	}

	const tokenParts = token.split(' ');
	if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
		throw new HttpError(403, 'Invalid token format.');
	}

	jwt.verify(tokenParts[1], SECRET_KEY, (err, decoded) => {
		if (err || !decoded) {
			res.status(500).json({ message: 'Failed to authenticate token.' });
			return;
		}

		req.user = decoded as User;
		next();
	});
}
