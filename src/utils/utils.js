'use strict';

/* eslint-disable no-console */
const { sequelize } = require('../db');

async function checkForConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

async function synchronizTables() {
  try {
    await sequelize.sync();
    console.log('The table for the User model just (re)created');
  } catch (err) {
    console.log('Error syncing User model:', err);
  }
}

module.exports = {
  checkForConnection,
  synchronizTables,
};
