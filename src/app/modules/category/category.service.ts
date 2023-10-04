import { Category, PrismaClient } from '@prisma/client';
import config from '../../../config';

const prisma = new PrismaClient();

const createCategory = async (data: Category) => {
  const result = await prisma.category.create({
    data
  });

  return result;
};

const getCategories = async () => {
  const result = await prisma.category.findMany({});

  return result;
};

const getSingleCategory = async (id: string) => {
  const result = await prisma.category.findUnique({
    where: {
      id
    }
  });
  return result;
};

const updateCategory = async (id: string, payload: Partial<Category>): Promise<Category> => {
  const result = await prisma.category.update({
    where: {
      id
    },
    data: payload
  });
  return result;
};

const deleteCategory = async (id: string): Promise<Category> => {
  console.log(id);
  const result = await prisma.category.delete({
    where: {
      id
    }
  });
  return result;
};

export const CategoryService = {
  createCategory,
  getCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory
};
