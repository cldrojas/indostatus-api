const config = {};

config.host = process.env.DATABASE_HOST;
config.user = process.env.DATABASE_USER;
config.password = process.env.DATABASE_PASSWORD;
config.database = process.env.DATABASE_NAME;

module.exports = config;
