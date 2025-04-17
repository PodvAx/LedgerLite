'use strict';
'use strict';

const { Op } = require('sequelize');
const { errors } = require('../utils/errors');
const { User } = require('../models/User.model');

const { Expense } = require('../models/models').models;

const getAllExpenses = async ({ from, to, categories, userId }) => {
  const validationErrors = {};

  if (from && isNaN(Date.parse(from))) {
    validationErrors.from = 'parametr must to be a date string';
  }

  if (to && isNaN(Date.parse(to))) {
    validationErrors.to = 'parametr must to be a date string';
  }

  if (userId && isNaN(userId)) {
    validationErrors.userId = 'parametr must be a number';
  }

  if (Object.keys(validationErrors).length) {
    const message =
      'Here some validation errors in parametrs' +
      Object.entries(validationErrors).reduce((acc, [key, value]) => {
        const result = acc + '\n –' + `${key} - ${value}`;

        return result;
      }, '');

    throw errors.validation(message);
  }

  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.category = categories;
  }

  if (from || to) {
    where.spentAt = {};

    if (from) {
      where.spentAt[Op.gte] = from;
    }

    if (to) {
      where.spentAt[Op.lte] = to;
    }
  }

  const expenses = await Expense.findAll({ where });

  return expenses;
};

const getExpenseById = async (id) => {
  const expense = await Expense.findByPk(id);

  return expense;
};

const createExpense = async ({
  userId,
  title,
  amount,
  spentAt,
  note,
  category,
}) => {
  if (!userId || isNaN(userId)) {
    throw errors.wrongId('User Id should not be empty and have to be number');
  }

  if (!(await User.findByPk(userId))) {
    throw errors.notFound(
      `User not found. Can't find user with this ID: ${userId}`,
    );
  }

  const validationErrors = {};

  if (!title || title.trim() === '') {
    validationErrors.title = "Title is required and mustn't to be empty";
  }

  if (!spentAt || isNaN(Date.parse(spentAt))) {
    validationErrors.spentAt = 'SpentAt is required and must to be date string';
  }

  // if (!category || category.trim() === '') {
  //   validationErrors.category =
  // "Category is required and mustn't to be empty";
  // }

  if (!amount || isNaN(amount)) {
    validationErrors.amount = 'Amount is required and must to be a number';
  }

  if (Object.keys(validationErrors).length) {
    const message =
      'Here some validation errors' +
      Object.entries(validationErrors).reduce((acc, [key, value]) => {
        const result = acc + '\n –' + value;

        return result;
      }, '');

    throw errors.validation(message);
  }

  const expense = await Expense.create({
    userId,
    title,
    amount,
    category,
    spentAt,
    note: note || null,
  });

  return expense;
};

const updateExpense = async (
  id,
  { userId, title, amount, category, spentAt, note },
) => {
  const expense = await Expense.findByPk(id);

  if (!expense) {
    throw errors.notFound('Expense not found');
  }

  if (
    !userId &&
    !title &&
    !amount &&
    !category &&
    category !== null &&
    !spentAt &&
    !note &&
    note !== null
  ) {
    throw errors.nothingToUpdate(
      'Trying to update expense without required fields',
    );
  }

  if (userId && expense.userId !== userId) {
    if (isNaN(userId)) {
      throw errors.wrongId(
        `userId must to be a number. Trying to update expense with userId: ${userId}`,
      );
    }

    if (!(await User.findByPk(userId))) {
      throw errors.notFound(
        `User not found. Trying to update expense's userId with ${userId}. But there's no such user.`,
      );
    }
  }

  const validationErrors = {};

  // console.log(title.trim());

  if (title && title.trim() === '') {
    validationErrors.title = "Title mustn't be empty";
  }

  if (spentAt && isNaN(Date.parse(spentAt))) {
    validationErrors.spentAt = 'SpentAt must to be date string';
  }

  // if (category && category.trim() === '') {
  //   validationErrors.category = "Category mustn't be empty";
  // }

  if (amount && isNaN(amount)) {
    validationErrors.amount = 'Amount must to be a number';
  }

  if (Object.keys(validationErrors).length) {
    const message =
      'Here some validation errors while trying to update Expense:' +
      Object.entries(validationErrors).reduce((acc, [key, value]) => {
        const result = acc + '\n –' + value;

        return result;
      }, '');

    throw errors.validation(message);
  }

  const newTitle = title || expense.title;
  const newAmount = amount || expense.amount;
  const newCategory = category || expense.category;
  const newSpentAt = spentAt || expense.spentAt;
  const newNote = note || expense.note;
  const newUserId = userId || expense.userId;

  if (
    expense.title === newTitle &&
    expense.amount === newAmount &&
    expense.category === newCategory &&
    expense.note === newNote &&
    expense.spentAt === newSpentAt &&
    expense.userId === newUserId
  ) {
    throw errors.nothingToUpdate(
      'Trying to update expense. All fields are the same',
    );
  }

  await Expense.update(
    {
      userId: newUserId,
      title: newTitle,
      amount: newAmount,
      spentAt: newSpentAt,
      note: newNote,
      category: newCategory,
    },
    {
      where: {
        id: id,
      },
    },
  );

  return Expense.findByPk(id);
};

const deleteExpense = async (id) => {
  const expense = await Expense.findByPk(id);

  if (!expense) {
    throw errors.notFound('Expense not found');
  }

  await expense.destroy();

  return expense;
};

const expensesService = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};

module.exports = {
  expensesService,
};
