import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;

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
            return res.status(400).json({ message: "username already exist. Please try different!" });
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
            status: true 
        })
    } catch (error) {

    }
};
