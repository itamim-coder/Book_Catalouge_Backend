import { PrismaClient, User } from '@prisma/client';
import config from '../../../config';

const prisma = new PrismaClient();

const createdUser = async (data: User) => {
  if (!data.password) {
    data.password = config.default_user_pass as string;
  }

  const result = await prisma.user.create({
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true
    }
  });

  return result;
};

const getUsers = async () => {
  const result = await prisma.user.findMany({
    select: {
      email: true,
      name: true
    }
  });

  return result;
};

const getSingleUser = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true
    }
  });
  return result;
};

const updateUser = async (id: string, payload: Partial<User>): Promise<User> => {
  const result = await prisma.user.update({
    where: {
      id
    },
    data: payload
  });
  return result;
};

const deleteUser = async (id: string) => {
  try {
    await prisma.$transaction(async (transaction) => {
      // Delete orders associated with the user
      await transaction.order.deleteMany({
        where: {
          userId: id
        }
      });

      // Then delete the user
      await transaction.user.delete({
        where: {
          id
        }
      });
    });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export const UserService = {
  createdUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser
};
