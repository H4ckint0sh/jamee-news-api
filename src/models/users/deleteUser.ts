import * as models from '../../db/models';
import { HttpError } from '../../middleware/error-handling';

export const deleteUser = async (userId: number): Promise<void> => {
    const user = await models.User.findOne({
        where: { user_id: userId },
    });

    if (!user) {
        throw new HttpError(404, 'No data found');
    }

    await models.Comment.destroy({
        where: { author: user.userName }, //  Use the userName from the found user.
    });

    //     await models.Comment.update({ userName: null }, {
    //       where: { author: user.userName },
    //     });

    const rowCount = await models.User.destroy({
        where: { user_id: userId },
    });

    if (rowCount === 0) {
        throw new HttpError(
            500,
            'Failed to delete user after handling foreign key constraints.'
        );
    }
};
