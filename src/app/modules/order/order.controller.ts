import { Request, RequestHandler, Response } from 'express';

import sendResponse from '../../../shared/response';
import { Order } from '@prisma/client';
import httpStatus from 'http-status';
import { OrderService } from './order.service';
import catchAsync from '../../../shared/catchAsync';

const createOrder = catchAsync(async (req: Request, res: Response) => {
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
  } catch (err) {}
});

const getOrders = catchAsync(async (req: Request, res: Response) => {
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
  } catch (err) {}
});

const getSingleCustomerOrder = catchAsync(async (req: Request, res: Response) => {
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
  } catch (err) {}
});

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
