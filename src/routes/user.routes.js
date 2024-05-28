import { Router } from 'express';
import { getUsers, getUser, getCurrentUser, updateUser, deleteUser } from '../controllers/user.controller.js';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;