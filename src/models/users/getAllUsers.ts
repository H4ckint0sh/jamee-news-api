import { Model } from 'sequelize';
import { UserQuery } from '../../api/controllers/types';
import { User } from '../../db/data/types';
import * as models from '../../db/models';
import { HttpError } from '../../middleware/error-handling';

export const getAllUsers = async (queries: UserQuery): Promise<User[]> => {
    let { sort_by, order, limit, p } = queries;

    // Validation
    sort_by = sort_by === 'null' ? undefined : sort_by;
    order = order === 'null' ? undefined : order;

    // sort_by = sort_by || "created_at";
    order = order || 'desc';
    limit = limit || 10;
    p = p || 1;

    const acceptedQueries = ['asc', 'desc'];
    const acceptedSortQueries = ['user_id', 'name', 'roleId', 'userName'];

    if (
        (sort_by && !acceptedSortQueries.includes(sort_by)) ||
        (order && !acceptedQueries.includes(order))
    ) {
        throw new HttpError(400, 'Bad query value!');
    }

    const offset = +limit * +p - limit;

    const findOptions: any = {
        attributes: ['user_id', 'name', 'userName', 'roleId'],
        // group: ["users.roleId", "user.roleId"],
        subQuery: false,
    };

    if (sort_by && order) {
        findOptions.order = [[sort_by, order]];
    }

    if (limit) {
        findOptions.limit = limit;
        findOptions.offset = offset;
    }

    const users = await models.User.findAll(findOptions);

    return users as unknown as User[];
};
