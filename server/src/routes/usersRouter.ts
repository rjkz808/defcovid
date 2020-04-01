import express from 'express';
import * as usersController from '../controllers/usersController';

const router = express.Router();

router.get('/:id', usersController.getUserById);
router.post('/', usersController.createUser);
router.put('/points/:id', usersController.updatePoints);

export default router;
