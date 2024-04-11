import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";// Adjust the path to where your userModel is

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const token = authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find the user by their ID included in the JWT token
        const user = await userModel.findById(decoded.id); // Ensure your JWT token includes the user's ID as `id`
        
        if (!user) {
            throw new Error('User not found');
        }

        // Check if the user's role is 'admin'
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export default requireAuth;
