'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');
// const { Expense } = require('./Expense.model.js');

const User = sequelize.define(
  // your code goes here
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name is required',
        },
        notEmpty: {
          msg: 'Name is required',
        },
        len: {
          args: [3, 30],
          msg: 'Name should be between 3 and 30 characters',
        },
      },
    },
  },
  {
    timestamps: false,
  },
);

// User.hasMany(Expense);

module.exports = {
  User,
};
