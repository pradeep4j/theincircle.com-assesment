import express from "express";
import { protectRoute } from '../utils/authMiddleware.js';
import User from '../models/User.js';
import { login, logout, createUsers, usersProfileById, updateUsersProfileById, deleteUsers } from '../controllers/Posts.js';
const router = express.Router();

router.route('/login').post(login);
router.route('/logout').get(logout);
router.post('/add-user', createUsers);
router.route('/user-profile/:id').get(protectRoute, usersProfileById);
router.route('/update-user-profile/:id').put(protectRoute, updateUsersProfileById);
router.route('/delete/:id').delete(protectRoute, deleteUsers);

export default router;
