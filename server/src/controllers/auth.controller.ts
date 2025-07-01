import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JET_SECRET!;

export const signup = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email } = req.body;
    const passwordClient = req.body.password;

    if (!name || !email || !passwordClient) {
      return res.status(404).json({
        message: "Fill all details",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(401).json({
        message: "E-mail already taken",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(passwordClient, 12);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Removing password before sending to frontend
    const userObj = user.toObject();
    const { password, ...userWithoutPassword } = userObj;

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" }); // Token for 7 days
    return res.status(201).json({
      message: "Account created successfully",
      success: true,
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Some unexpected error occuered",
      success: false,
    });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email } = req.body;
    const passwordClient = req.body.password;

    if (!email || !passwordClient) {
      return res.status(404).json({
        message: "Fill all details",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(passwordClient, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    // Removing password before sending to frontend
    const userObj = user.toObject();
    const { password, ...userWithoutPassword } = userObj;

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" }); // token for 7 days
    return res.status(200).json({
      message: `Welcome back ${user.name}!`,
      success: true,
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Login failed, try again later",
      success: false,
    });
  }
};
