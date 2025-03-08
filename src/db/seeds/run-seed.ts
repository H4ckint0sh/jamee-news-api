import db from "../connection";
import seed from "./seed";

import testData from "../data/test-data";
import devData from "../data/development-data";

const ENV = process.env.NODE_ENV || "development";

const runDevSeed = () => {
  return seed(devData).then(() => db.close());
};
const runTestSeed = () => {
  return seed(testData).then(() => db.close());
};

if (ENV === "test") {
  runTestSeed();
} else {
  runDevSeed();
}
