import { PrismaClient, Order } from '@prisma/client';
import config from '../../../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
const prisma = new PrismaClient();

const createOrder = async (data: Order, token: string) => {
  try {
    const decodedToken: JwtPayload | string = jwt.verify(token, config.jwt.secret);
    console.log(decodedToken);

    if (typeof decodedToken === 'string') {
      // Handle the case where decodedToken is a string (e.g., an error occurred during token verification)
      throw new Error('Invalid token');
    }

    // Assuming the token contains user information like userId and role
    const userId = decodedToken.userId;
    const userRole = decodedToken.role;

    if (userRole !== 'customer') {
      throw new Error('Only customers are allowed to create orders.');
    }
    const orderedBooks = data.orderedBooks as { bookId: string; quantity: number }[];
    const order = await prisma.order.create({
      data: {
        userId,
        orderedBooks: orderedBooks?.map((book) => ({
          bookId: book.bookId,
          quantity: book.quantity
        }))
      }
    });
    // console.log(order.orderedBooks);

    return order;
  } catch (err) {}
};

const getOrders = async (token: string) => {
  const decodedToken: JwtPayload | string = jwt.verify(token, config.jwt.secret);
  console.log(decodedToken);

  if (typeof decodedToken === 'string') {
    // Handle the case where decodedToken is a string (e.g., an error occurred during token verification)
    throw new Error('Invalid token');
  }

  // Assuming the token contains user information like userId and role
  const userId = decodedToken.userId;
  const userRole = decodedToken.role;

  if (userRole == 'customer') {
    const result = await prisma.order.findMany({
      where: {
        userId: userId
      }
    });
    console.log('customer');
    return result;
  }

  if (userRole == 'admin') {
    const result = await prisma.order.findMany({});
    console.log('admin');
    return result;
  }
};

const getSingleOrder = async (id: string, token: string) => {
  const decodedToken: JwtPayload | string = jwt.verify(token, config.jwt.secret);

  if (typeof decodedToken === 'string') {
    // Handle the case where decodedToken is a string (e.g., an error occurred during token verification)
    throw new Error('Invalid token');
  }

  // Assuming the token contains user information like userId and role
  const userId = decodedToken.userId;
  const userRole = decodedToken.role;
  const result = await prisma.order.findUnique({
    where: {
      id
    }
  });
  console.log(result);
  if (result?.userId == userId) {
    return result;
  } else if (userRole == 'admin') {
    return result;
  } else {
    return 'This not your order';
  }
};

// const updateOrder = async (id: string, payload: Partial<Order>): Promise<Order> => {
//   const result = await prisma.Order.update({
//     where: {
//       id
//     },
//     data: payload
//   });
//   return result;
// };

// const deleteOrder = async (id: string): Promise<Order> => {
//   console.log(id);
//   const result = await prisma.Order.delete({
//     where: {
//       id
//     }
//   });
//   return result;
// };

export const OrderService = {
  createOrder,
  getOrders,
  getSingleOrder
  //   updateOrder,
  //   deleteOrder
};
