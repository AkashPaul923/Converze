import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { fullname, username, password, confirmPassword, gender } =
            req.body;

        if (
            !fullname ||
            !username ||
            !password ||
            !confirmPassword ||
            !gender
        ) {
            return res.status(400).json({ message: "All field are required!" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password deesnot match!" });
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({
                message: "username already exist. Please try different!",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const maleProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        await User.create({
            fullname,
            username,
            password: hashedPassword,
            profilePhoto: gender === "male" ? maleProfile : femaleProfile,
            gender,
        });

        return res.status(201).json({
            message: "Account created successfully!",
            success: true,
        });
    } catch (error) {}
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "All field are required!" });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                message: "invalid username or password!",
                success: false,
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "invalid username or password!",
                success: false,
            });
        }
        const tokenData = {
            userId: user._id,
        };
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d",
        });
        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "strict",
            })
            .json({
                _id: user._id,
                username: user.username,
                fullname: user.fullname,
                profilePhoto: user.profilePhoto,
            });
    } catch (error) {
        console.log(error);
    }
};

export const logout = (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "logout successfully.",
        });
    } catch (error) {
        console.log(error);
    }
};

export const otherUser = async (req, res) => {
    try {
        const loggedUserId = req.id;
        const otherUser = await User.find({
            _id: { $ne: loggedUserId },
        }).select("-password");
        return res.status(200).json(otherUser);
    } catch (error) {
        console.log(error);
    }
};
