import db from '../connection';
import seed from './seed';

import testData from '../data/test-data';
import devData from '../data/development-data';

const ENV = process.env.NODE_ENV || 'development';

const runDevSeed = async () => {
    await seed(devData);
    return db.close();
};
const runTestSeed = async () => {
    await seed(testData);
    return db.close();
};

if (ENV === 'test') {
    runTestSeed();
} else {
    runDevSeed();
}
