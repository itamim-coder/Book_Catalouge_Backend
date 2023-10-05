import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';

import sendResponse from '../../../shared/response';
import { BookService } from './book.service';
import pick from '../../../shared/pick';
import { bookFilterableFields } from './book.constants';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.createBook(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created successfully',
    data: result
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const options = pick(req.query, ['size', 'page', 'sortBy', 'sortOrder']);
  const result = await BookService.getAllBooks(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books fetched successfully',
    meta: result.meta,
    data: result.data
  });
});
const getBooksByCategory = catchAsync(async (req: Request, res: Response) => {
  // const filters = pick(req.query, bookFilterableFields);
  console.log(req.query);
  const options = pick(req.query, ['size', 'page', 'sortBy', 'sortOrder']);
  const result = await BookService.getAllBooks(req.params, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books with associated category data fetched successfully',
    meta: result.meta,
    data: result.data
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.getSingleBook(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book fetched successfully',
    data: result
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.updateBook(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully',
    data: result
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.deleteBook(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully',
    data: result
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getBooksByCategory,
  getSingleBook,
  updateBook,
  deleteBook
};
