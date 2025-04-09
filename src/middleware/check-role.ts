import { Request, Response, NextFunction } from 'express';
import { User } from '../db/data/types';

interface AuthenticatedRequest extends Request {
    user?: User;
}

export function checkRole(requiredRoleId: number) {
    return (
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ): void => {
        if (
            !req.user ||
            Number(req.user.roleId) !== Number(requiredRoleId) ||
            req?.user?.user_id === Number(req?.params?.user_id)
        ) {
            res.status(403).json({
                message: 'Access denied. Insufficient role.',
            });
            return;
        }
        next();
    };
}
