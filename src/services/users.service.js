'use strict';

const { errors } = require('../utils/errors');

const { User } = require('../models/models').models;

const getAllUsers = async () => {
  const users = await User.findAll();

  return users;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);

  return user;
};

const createUser = async (userData) => {
  const user = await User.create(userData);

  return user;
};

const updateUser = async ({ id, name }) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw errors.notFound('User not found');
  }

  if (name === user.name) {
    throw errors.nothingToUpdate(
      `Nothing to update. Trying to update user.name: ${user.name} to name: ${name}`,
    );
  }

  user.name = name;
  await user.save();

  return user;
};

const deleteUser = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw errors.notFound('User not found');
  }

  await user.destroy();

  return user;
};

const usersService = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

module.exports = {
  usersService,
};
