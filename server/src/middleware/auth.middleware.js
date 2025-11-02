import jwt from 'jsonwebtoken';
import Member from '../models/member.model.js'; 

const protect = async (req, res, next) => {
    let token;
    // 1. Check if the Authorization header exists and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await Member.findById(decoded.userId).select('-password');

            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found.' });
            }

            next();
        } catch (error) {
            console.error('Authentication Error:', error.message);
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Not authorized, token failed.' });
            }
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Not authorized, token expired.' });
            }
            return res.status(500).json({ message: 'Server error during authentication.' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token.' });
    }
};

export { protect };