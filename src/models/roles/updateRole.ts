import { Role } from '../../db/data/types';
import * as models from '../../db/models';
import { HttpError } from '../../middleware/error-handling';
import bcrypt from 'bcryptjs';

export const updateRole = async (
    roleId: number,
    updatedUserData: Role
): Promise<Role> => {
    const role = await models.Role.findOne({
        where: { role_id: roleId },
    });

    if (!role) {
        throw new HttpError(404, 'No data found');
    }

    role.name = updatedUserData.name ?? role.name;
    role.status = updatedUserData.status ?? role.status;

    await role.save();

    return role;
};
