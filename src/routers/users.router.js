'use strict';

const { Router } = require('express');
const { usersController } = require('../controllers/users.controller');

const { getAllUsers, getUserById, createUser, updateUser, deleteUser } =
  usersController;

const usersRouter = Router();

usersRouter.get('/', getAllUsers);
usersRouter.get('/:id', getUserById);
usersRouter.post('/', createUser);
usersRouter.patch('/:id', updateUser);
usersRouter.delete('/:id', deleteUser);

module.exports = {
  usersRouter,
};
