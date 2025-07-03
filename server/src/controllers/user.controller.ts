import { Request, Response } from "express";
import User from "../models/user.model.js";

export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userId = req.id!;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Cannot get your profile data",
    });
  }
};
