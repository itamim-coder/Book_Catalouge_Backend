import express from 'express';

import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { BookController } from './book.controller';


const router = express.Router();

router.get('/', BookController.getAllBooks);
router.get('/:categoryId/category', BookController.getBooksByCategory);


router.get('/:id', BookController.getSingleBook);

router.post('/create-Book', auth(ENUM_USER_ROLE.ADMIN), BookController.createBook);

router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.updateBook);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.deleteBook);

export const BookRoutes = router;
