'use strict';

const { User } = require('./User.model');
const { Expense } = require('./Expense.model');

// User.hasMany(Expense, {
//   onDelete: 'CASCADE',
// });
// Expense.belongsTo(User);

module.exports = {
  models: {
    User,
    Expense,
  },
};
