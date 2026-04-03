const { app, initializeDatabase } = require("../backend/server");

let dbInitialized = false;

module.exports = async (req, res) => {
  if (!dbInitialized) {
    await initializeDatabase();
    dbInitialized = true;
  }
  app(req, res);
};
