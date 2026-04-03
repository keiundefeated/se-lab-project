const path = require("path");
const fs = require("fs");

const { app, initializeDatabase } = require("../backend/server");

let dbInitialized = false;

module.exports = async (req, res) => {
  if (!dbInitialized) {
    await initializeDatabase();
    dbInitialized = true;
  }

  const originalEnd = res.end;
  res.end = function (...args) {
    if (res.statusCode === 404 && !req.url.startsWith("/api")) {
      return;
    }
    originalEnd.apply(res, args);
  };

  app(req, res);
};
