const dotenv = require("dotenv");
dotenv.config();
module.exports = { database: process.env.MBA_SEARCH_DB_CONNECT };
