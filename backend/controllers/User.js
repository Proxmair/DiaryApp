import { User } from "../model/User.js";
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 600000),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged In Successfully",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged Out Successfully",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "This mail is already in use",
      });
    }
    user = await User.create(
      {
        name,
        email,
        password
      }
    );
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    return res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 600000),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "You are Successfully Registered",
        user
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
export const myProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message:"Your Diary is loaded",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const getUser=async(req,res)=>{
  try {
    const user = await User.findById(jwt.verify(req.cookies.token, process.env.JWT_SECRET)._id);
    res.status(200).json({
      success: true,
      subjects:user.Subjects,
      email:user.email,
      name:user.name,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
export const updateDiary=async(req,res)=>{
  try {
    const {email,Subjects}=req.body;
    const user = await User.findOne( {email} );
    user.Subjects=Subjects;
    user.save();
    res.status(200).json({
      success: true,
      message:"Diary Updated"
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}