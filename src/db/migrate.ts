import { sequelize } from "./sequelize.js";
import "../models/index.js";

try {
  await sequelize.sync();
  console.log("Sequelize migrations applied");
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await sequelize.close();
}
