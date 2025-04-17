/* eslint-disable no-console */
'use strict';

const { expensesService } = require('../services/expenses.service');
const {
  NOTHING_TO_UPDATE_CODE,
  NOT_FOUND_CODE,
  VALIDATION_ERROR_CODE,
  WRONG_ID_CODE,
} = require('../utils/errors');

const getAllExpenses = async (req, res) => {
  console.log(req.query);

  const userId = Array.isArray(req.query.userId)
    ? req.query.userId.at(-1)
    : req.query.userId;
  const from = Array.isArray(req.query.from)
    ? req.query.from.at(-1)
    : req.query.from;
  const to = Array.isArray(req.query.to) ? req.query.to.at(-1) : req.query.to;
  const categories = req.query.categories
    ? Array.isArray(req.query.categories)
      ? req.query.categories
      : [req.query.categories]
    : null;

  try {
    const expenses = await expensesService.getAllExpenses({
      from,
      to,
      categories,
      userId,
    });

    res.status(200).json(expenses);
  } catch (err) {
    if (err.code === VALIDATION_ERROR_CODE) {
      res.status(400).send(err.message);

      return;
    }
    console.error('Something went wrong in getAllExpenses', err.message);
    res.status(500).send('Internal server error');
  }
};

const getExpenseById = async (req, res) => {
  const { id } = req.params;

  try {
    if (isNaN(id)) {
      res.status(400).send('Invalid id');

      return;
    }

    const expense = await expensesService.getExpenseById(id);

    if (!expense) {
      res.status(404).send('Expense not found');

      return;
    }
    res.status(200).json(expense);
  } catch (err) {
    console.error('Something went wrong in getExpenseById', err.message);
    res.status(500).send('Internal server error');
  }
};

const createExpense = async (req, res) => {
  try {
    const expense = await expensesService.createExpense(req.body);

    res.status(201).json(expense);
  } catch (err) {
    if (err.code === NOT_FOUND_CODE) {
      res.status(404).send(err.message);

      return;
    }

    if (err.code === VALIDATION_ERROR_CODE) {
      res.status(400).send(err.message);

      return;
    }

    if (err.code === WRONG_ID_CODE) {
      res.status(400).send(err.message);

      return;
    }
    console.error('Something went wrong in createExpense', err.message);
    res.status(500).send('Internal server error');
  }
};

const updateExpense = async (req, res) => {
  const { id } = req.params;

  try {
    if (isNaN(id)) {
      res.status(400).send('Invalid id');

      return;
    }

    const updatedExpense = await expensesService.updateExpense(id, req.body);

    res.status(200).json(updatedExpense);
  } catch (err) {
    if (err.code === NOT_FOUND_CODE) {
      res.status(404).send(err.message);

      return;
    }

    if (err.code === VALIDATION_ERROR_CODE) {
      res.status(400).send(err.message);

      return;
    }

    if (err.code === WRONG_ID_CODE) {
      res.status(400).send(err.message);

      return;
    }

    if (err.code === NOTHING_TO_UPDATE_CODE) {
      res.status(400).send(err.message);

      return;
    }

    console.error('Something went wrong in updateExpense', err.message);
    res.status(500).send('Internal server error');
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    if (isNaN(id)) {
      res.status(400).send('Invalid id');

      return;
    }

    await expensesService.deleteExpense(id);

    res.status(204).send();
  } catch (err) {
    if (err.code === NOT_FOUND_CODE) {
      res.status(404).send(err.message);

      return;
    }

    console.error('Something went wrong in deleteExpense', err.message);
    res.status(500).send('Internal server error');
  }
};

const expensesController = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};

module.exports = {
  expensesController,
};
