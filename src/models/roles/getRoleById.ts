import * as models from '../../db/models';
import { Role } from '../../db/data/types';
import { HttpError } from '../../middleware/error-handling';

export const getRoleById = async (roleId: number): Promise<Role> => {
    const user = await models.Role.findOne({
        attributes: ['role_id', 'name', 'status'],
        where: { role_id: roleId },
    });

    if (!user) {
        throw new HttpError(404, 'No data found');
    }

    return user;
};
