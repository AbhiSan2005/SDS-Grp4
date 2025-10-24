import Member from '../models/member.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Please provide email and password." });
    }

    try {
        const user = await Member.findOne({ email: email.toLowerCase() }).select(
            "+password"
        );

        if (!user || (user.role !== "Admin" && user.role !== "Faculty Advisor")) {
            return res
                .status(401)
                .json({ message: "Invalid credentials or unauthorized role." });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const payload = {
            userId: user._id,
            role: user.role,
            name: user.name,
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error during login." });
    }
};