import * as models from '../../db/models';
import { HttpError } from '../../middleware/error-handling';

export const deleteRole = async (modetId: number) => {
    const rowCount = await models.Role.destroy({
        where: { article_id: modetId },
    });
    if (!rowCount) {
        throw new HttpError(404, 'No data found');
    }
};
