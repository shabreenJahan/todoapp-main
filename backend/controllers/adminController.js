// adminController.js
import taskModel from "../models/taskModel.js";
import userModel from "../models/userModel.js";

const isAdmin = async (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
  }



//   const getUsersWithTasks = async (req, res) => {
//     try {
//         console.log('Fetching user tasks...');

//         const usersWithTasks = {};

//         const users = await userModel.find();
//         for (let user of users) {
//             const tasks = await taskModel.find({ userId: user._id });
//             usersWithTasks[user._id] = tasks;
//         }

//         res.json(usersWithTasks);
//     } catch (error) {
//         console.error('Error during fetching user tasks:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

const getUsersWithTasks = async (req, res) => {
    try {
        console.log('Fetching user tasks...');
    
      const users = await userModel.find();
      const usersWithTasks = await Promise.all(users.map(async (user) => {
        const tasks = await taskModel.find({ userId: user._id });
        return { ...user.toObject(), tasks };
      }));
      res.json(usersWithTasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

};

const makeAdmin = async (email) => {
    try {
      const updatedUser = await userModel.findOneAndUpdate(
        { email },
        { role: 'admin' },
        { new: true } // Return the updated document
      );
      return updatedUser;
    } catch (error) {
      throw error;
    }
  };
  // Usage
  makeAdmin('shabreen.jahan220390@gmail.com');

// module.exports = AdminController;
export {getUsersWithTasks,isAdmin,makeAdmin}  ;