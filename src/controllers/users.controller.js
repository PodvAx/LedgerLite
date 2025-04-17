/* eslint-disable no-console */
'use strict';

const { usersService } = require('../services/users.service');
const { NOTHING_TO_UPDATE_CODE, NOT_FOUND_CODE } = require('../utils/errors');

const getAllUsers = async (req, res) => {
  try {
    const users = await usersService.getAllUsers();

    res.status(200).json(users);
  } catch (err) {
    console.error('Something went wrong in getAllUsers', err.message);
    res.status(500).send('Internal server error');
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    if (isNaN(id)) {
      res.status(400).send('Invalid id');

      return;
    }

    const user = await usersService.getUserById(id);

    if (!user) {
      res.status(404).send('User not found');

      return;
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('Something went wrong in getUserById', err.message);
    res.status(500).send('Internal server error');
  }
};

const createUser = async (req, res) => {
  const { name } = req.body;

  try {
    if (!name || name.trim() === '') {
      res.status(400).send('Name is requiered');

      return;
    }

    const user = await usersService.createUser({ name });

    res.status(201).json(user);
  } catch (err) {
    console.error('Something went wrong in createUser', err.message);
    res.status(500).send('Internal server error');
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    if (isNaN(id)) {
      res.status(400).send('Invalid id');

      return;
    }

    if (!name || name.trim() === '') {
      res.status(400).send('Name is requiered');

      return;
    }

    const updatedUser = await usersService.updateUser({ id, name });

    res.status(200).json(updatedUser);
  } catch (err) {
    if (err.code === NOT_FOUND_CODE) {
      res.status(404).send(err.message);

      return;
    }

    if (err.code === NOTHING_TO_UPDATE_CODE) {
      res.status(400).send(err.message);

      return;
    }

    console.error('Something went wrong in updateUser', err.message);
    res.status(500).send('Internal server error');
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    if (isNaN(id)) {
      res.status(400).send('Invalid id');

      return;
    }

    await usersService.deleteUser(id);

    res.status(204).send();
  } catch (err) {
    if (err.code === NOT_FOUND_CODE) {
      res.status(404).send(err.message);

      return;
    }

    console.error('Something went wrong in deleteUser', err.message);
    res.status(500).send('Internal server error');
  }
};

const usersController = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

module.exports = {
  usersController,
};
