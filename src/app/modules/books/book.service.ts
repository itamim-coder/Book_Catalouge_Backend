import { Book, Prisma, PrismaClient } from '@prisma/client';
import config from '../../../config';
import { IBookFilters } from './books.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { bookSearchableFields } from './book.constants';
import { equal } from 'assert';

const prisma = new PrismaClient();

const createBook = async (data: Book) => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true
    }
  });

  return result;
};

const getAllBooks = async (
  filters: IBookFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, minPrice, maxPrice, ...filterData } = filters;
  // Convert minPrice and maxPrice from strings to numbers
  const convertedMinPrice = minPrice ? parseFloat(minPrice) : undefined;
  const convertedMaxPrice = maxPrice ? parseFloat(maxPrice) : undefined;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: bookSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive'
        }
      }))
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key]
        }
      }))
    });
  }

  if (convertedMinPrice !== undefined) {
    andConditions.push({
      price: {
        gte: convertedMinPrice
      }
    });
  }

  if (convertedMaxPrice !== undefined) {
    andConditions.push({
      price: {
        lte: convertedMaxPrice
      }
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            title: 'desc'
          }
  });

  const total = await prisma.book.count({
    where: whereConditions
  });

  const totalPage = Math.ceil(total / size);

  return {
    meta: {
      page,
      size,
      total,
      totalPage
    },
    data: result
  };
};

const getBooksByCategory = async (
  categoryId: string,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);

  const whereConditions: Prisma.BookWhereInput = {
    categoryId: categoryId // Filter by categoryId
  };

  const result = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: size,
    orderBy: {
      title: 'desc' // Adjust the sorting order as needed
    }
  });

  const total = await prisma.book.count({
    where: whereConditions
  });

  const totalPage = Math.ceil(total / size);

  return {
    meta: {
      page,
      size,
      total,
      totalPage
    },
    data: result
  };
};

const getSingleBook = async (id: string) => {
  const result = await prisma.book.findUnique({
    where: {
      id
    }
  });
  return result;
};

const updateBook = async (id: string, payload: Partial<Book>): Promise<Book> => {
  const result = await prisma.book.update({
    where: {
      id
    },
    data: payload
  });
  return result;
};

const deleteBook = async (id: string): Promise<Book> => {
  console.log(id);
  const result = await prisma.book.delete({
    where: {
      id
    }
  });
  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  getBooksByCategory,
  getSingleBook,
  updateBook,
  deleteBook
};
