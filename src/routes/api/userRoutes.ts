import { Router } from 'express';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} from '../../controllers/userController.js';

const router = Router();

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:id
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

export { router as userRouter };