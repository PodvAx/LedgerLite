'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');
// const { User } = require('./User.model.js');

const Expense = sequelize.define(
  // your code goes here
  'expense',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spentAt: {
      // type: DataTypes.DATE,
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Date is required',
        },
        // isDate: {
        //   msg: 'Date is invalid',
        // },
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Title is required',
        },
        len: {
          args: [3, 30],
          msg: 'Title should be between 3 and 30 characters',
        },
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Amount is required',
        },
        isInt: {
          msg: 'Amount should be an integer',
        },
        min: {
          args: [1],
          msg: 'Amount should be greater than 0',
        },
      },
    },
    category: {
      type: DataTypes.STRING,
      // allowNull: false,
      // validate: {
      //   notNull: {
      //     msg: 'Category is required',
      //   },
      //   len: {
      //     args: [3, 30],
      //     msg: 'Category should be between 3 and 30 characters',
      //   },
      // },
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [0, 100],
          msg: 'Note should be less than 100 characters',
        },
      },
    },
  },
  {
    timestamps: false,
  },
);

// Expense.belongsTo(User);

module.exports = {
  Expense,
};
