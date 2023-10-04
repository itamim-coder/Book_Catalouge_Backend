import express from 'express';

import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { CategoryController } from './category.controller';

const router = express.Router();

router.get('/', CategoryController.getCategories);
router.get('/:id', CategoryController.getSingleCategory);

router.post('/create-category', auth(ENUM_USER_ROLE.ADMIN), CategoryController.createCategory);

router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), CategoryController.updateCategory);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), CategoryController.deleteCategory);

export const CategoryRoutes = router;
