import { OrderRoutes } from './../modules/order/order.route';
import { UserRoutes } from './../modules/users/users.route';
import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { BookRoutes } from '../modules/books/book.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes
  },
  {
    path: '/users',
    route: UserRoutes
  },
  {
    path: '/categories',
    route: CategoryRoutes
  },
  {
    path: '/books',
    route: BookRoutes
  },
  {
    path: '/orders',
    route: OrderRoutes
  }
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
