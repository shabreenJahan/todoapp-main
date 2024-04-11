// adminRoutes.js
import express from "express"
import{getUsersWithTasks,isAdmin,makeAdmin}  from'../controllers/adminController.js';
import requireAuth from '../middleware/requireAuth.js';





const router = express.Router();

router.get('/users-tasks', requireAuth, isAdmin, getUsersWithTasks);
router.post('/make-admin', requireAuth, isAdmin, async (req, res) => {
    const { email } = req.body;
    try {
      await makeAdmin(email);
      res.json({ message: `User with email ${email} has been made an admin.` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
// ... other admin routes

export default router; 




