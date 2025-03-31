"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
function checkRole(requiredRoleId) {
    return (req, res, next) => {
        if (!req.user || Number(req.user.roleId) !== Number(requiredRoleId)) {
            res.status(403).json({ message: 'Access denied. Insufficient role.' });
            return;
        }
        next();
    };
}
exports.checkRole = checkRole;
