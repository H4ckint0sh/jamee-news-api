import db from '../connection.ts';
import * as models from '../models/index.ts';

import { convertTimestampToDate, createRef, formatComments } from './utils';

const seed = async ({
    topicData,
    userData,
    articleData,
    commentData,
    roleData,
}) => {
    try {
        await db.sync({ force: true });

        // Create topics
        await models.Topic.bulkCreate(topicData);

        //Create roles
        await models.Role.bulkCreate(roleData);

        // Create users
        await models.User.bulkCreate(userData);

        // Create articles
        const formattedArticleData = articleData.map(convertTimestampToDate);
        const createdArticles = await models.Article.bulkCreate(
            formattedArticleData,
            {
                returning: true,
            }
        );

        // Create comments
        const articleIdLookup = createRef(
            createdArticles,
            'title',
            'article_id'
        );
        const formattedCommentData = formatComments(
            commentData,
            articleIdLookup
        );
        await models.Comment.bulkCreate(formattedCommentData);

        console.log('Database seeding completed.');
    } catch (error) {
        console.error('Error seeding database:', error);
        throw error;
    }
};

export default seed;
