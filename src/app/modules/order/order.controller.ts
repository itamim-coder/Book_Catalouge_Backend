import { RequestHandler } from 'express';

import sendResponse from '../../../shared/response';
import { Order } from '@prisma/client';
import httpStatus from 'http-status';
import { OrderService } from './order.service';

const createOrder: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Token is required for this operation'
      });
    }

    const { ...Order } = req.body;
    const result = await OrderService.createOrder(Order, token);

    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Orders created successfully !',
      data: result
    });
  } catch (err) {
    next(err);
  }
};

const getOrders: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Token is required for this operation'
      });
    }
    const result = await OrderService.getOrders(token);
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Orders Retrieved successfully !',
      data: result
    });
  } catch (err) {
    next(err);
  }
};

const getSingleCustomerOrder: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Token is required for this operation'
      });
    }
    const result = await OrderService.getSingleOrder(id, token);
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Customer Order Retrieved successfully !',
      data: result
    });
  } catch (err) {
    next(err);
  }
};

// const updateOrder: RequestHandler = async (req, res, next) => {
//   const { id } = req.params;
//   const result = await OrderService.updateOrder(id, req.body);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Order updated successfully',
//     data: {}
//   });
// };
// const deleteOrder: RequestHandler = async (req, res, next) => {
//   const { id } = req.params;
//   const result = await OrderService.deleteOrder(id);
//   sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Order delete successfully',
//       data: {}
//   });
// };

export const OrderController = {
  createOrder,
  getOrders,
  getSingleCustomerOrder
  //   getSingleOrder,
  //   updateOrder,
  //   deleteOrder
};
