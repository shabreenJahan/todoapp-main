import express from 'express';
import { loginUser, registerUser,getUser, updateUser, deleteUser, getAllUsers, isAdmin } from '../controllers/userController.js';
import requireAuth from '../middleware/requireAuth.js';
const router = express.Router();

router.post("/login",loginUser);
router.post("/register",registerUser);
router.get("/getuser", requireAuth, getUser)
router.put("/updateuser", requireAuth, updateUser);
router.delete("/deleteuser", requireAuth, deleteUser);
router.get("/allusers", requireAuth, isAdmin, getAllUsers);

export default router;