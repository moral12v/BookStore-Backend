import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import UserModel from "./userModel";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "./userTypes";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  // Validations created
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    const error = createHttpError(404, "All fields are required");
    return next(error);
  }

  // Check if user already exists in the database
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      const error = createHttpError(400, "User already exists");
      return next(error);
    }
  } catch (err) {
    return next(createHttpError(500, "Error"));
  }

  let newUser: User;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (err) {
    return next(createHttpError(500, "ERROR"));
  }

  try {
    const token = sign({ subs: newUser._id }, config.jwtSecret as string, {
      expiresIn: "7d",
    });
    res.json({ accessToken: token });
  } catch (err) {
    return next(createHttpError(500, "Something went wrong"));
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  // Validate if email and password are provided
  if (!email || !password) {
    const error = createHttpError(400, "Email and password are required");
    return next(error);
  }

  try {
    // Find user by email
    const user = await UserModel.findOne({ email: email });

    // If user doesn't exist, return error
    if (!user) {
      const error = createHttpError(404, "User not found");
      return next(error);
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match, return error
    if (!isPasswordMatch) {
      const error = createHttpError(401, "Invalid password");
      return next(error);
    }
    

    // If passwords match, create JWT token
    const token = sign({ subs: user._id }, config.jwtSecret as string, {
      expiresIn: "7d",
    });

    // Return token
    res.json({ accessToken: token });
  } catch (err) {
    return next(createHttpError(500, "Something went wrong"));
  }
};

export { createUser, loginUser };
