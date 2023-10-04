import { RequestHandler } from 'express';
import { UserService } from './users.service';
import sendResponse from '../../../shared/response';
import { User } from '@prisma/client';
import httpStatus from 'http-status';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    const { ...user } = req.body;
    const result = await UserService.createdUser(user);

    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users created successfully !',
      data: result
    });
  } catch (err) {
    next(err);
  }
};

const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const result = await UserService.getUsers();
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users Retrieved successfully !',
      data: result
    });
  } catch (err) {
    next(err);
  }
};

const getSingleUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await UserService.getSingleUser(req.params.id);
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Retrieved successfully !',
      data: result
    });
  } catch (err) {
    next(err);
  }
};

const updateUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const result = await UserService.updateUser(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: {}
  });
};
const deleteUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const result = await UserService.deleteUser(id);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User delete successfully',
      data: {}
  });
};

export const UserController = {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser
};
