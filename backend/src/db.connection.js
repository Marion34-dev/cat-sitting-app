const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.development' }); // Load environment variables from .env.development

const connectionString = `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const sequelize = new Sequelize(connectionString, {
  logging: false // Disable SQL query logging to the console
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
