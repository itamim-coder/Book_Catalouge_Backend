import express from 'express';

import { OrderController } from './order.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/create-order', OrderController.createOrder);
router.get('', OrderController.getOrders);

router.get('/:id', OrderController.getSingleCustomerOrder);
// router.patch('/:id', OrderController.updateOrder);
// router.delete('/:id', OrderController.deleteOrder);

export const OrderRoutes = router;
