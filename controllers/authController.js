import JWT from "jsonwebtoken";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

// Registration Controller
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address,answer } = req.body;

        // Validation checks
        if (!name || !email || !password || !phone || !address||!answer) {
            return res.status(400).send({
                success: false,
                message: 'All fields are required',
            });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: 'User already exists',
            });
        }

        // Hash password and save user
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            answer
        }).save();

        // Send success response (without sending sensitive data)
        res.status(201).send({
            success: true,
            message: 'User Register Success',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: 'Error in registration',
        });
    }
};

// Login Controller
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation checks
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Email and password are required',
            });
        }

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
            });
        }

        // Check if password matches
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(400).send({
                success: false,
                message: 'Incorrect password',
            });
        }

        // Create token
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        // Send success response
        res.status(200).send({
            success: true,
            message: 'Login Success',
            user: {
              _id:user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                address: user.address,
                role:user.role
            },
            token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: 'Error in login',
        });
    }
};


export const forgotPasswordController = async (req, res) => {
    try {
      const { email, answer, newPassword } = req.body;
  
      // Check if email is provided
      if (!email) {
        return res.status(400).send({ message: "Email is required" });
      }
  
      // Check if answer is provided
      if (!answer) {
        return res.status(400).send({ message: "Answer is required" });
      }
  
      // Check if newPassword is provided
      if (!newPassword) {
        return res.status(400).send({ message: "New Password is required" });
      }
  
      // Check if user exists
      const user = await userModel.findOne({ email, answer });
  
      // If user is not found, send a 404 response
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Wrong Email Or Answer",
        });
      }
  
      // Hash the new password and update it in the database
      const hashed = await hashPassword(newPassword);
      await userModel.findByIdAndUpdate(user._id, { password: hashed });
  
      // Send success response
      return res.status(200).send({
        success: true,
        message: "Password Reset Successfully",
      });
    } catch (error) {
      // Catch any errors and send an error response
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  };
  

// Protected route for testing
export const testController = (req, res) => {
    try {
      res.send("Protected Routes");
    } catch (error) {
      console.log(error);
      res.send({ error });
    }
  };