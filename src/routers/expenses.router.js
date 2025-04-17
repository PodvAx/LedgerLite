'use strict';

const { Router } = require('express');
const { expensesController } = require('../controllers/expenses.controller');
const {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
} = expensesController;

const expensesRouter = Router();

expensesRouter.get('/', getAllExpenses);
expensesRouter.get('/:id', getExpenseById);
expensesRouter.post('/', createExpense);
expensesRouter.patch('/:id', updateExpense);
expensesRouter.delete('/:id', deleteExpense);

module.exports = {
  expensesRouter,
};
