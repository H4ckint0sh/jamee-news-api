import { Role } from '../../db/data/types';
import * as models from '../../db/models';
import { HttpError } from '../../middleware/error-handling';

export const getAllRoles = async (): Promise<Role[]> => {
    const roles = await models.Role.findAll();

    if (!roles) {
        // TODO: Check if 500 is the right status code
        throw new HttpError(400, 'No roles found');
    }

    return roles;
};
