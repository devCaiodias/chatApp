import cloudinary from "../lib/cloudinary.js";
import { genereteToken } from "../lib/utils.js";
import User from "../models/users.model.js";
import bcrypt from "bcryptjs";

export const Signup = async (req, res) => {
    const {email, fullName, password} = req.body;
    try {

      if (!fullName || !email || !password) {
        return res.status(400).json({menssage: "Preencha todos os campos"});  
      }

      if (password.length < 6) {
        return res.status(400).json({menssage: "A senha deve ter pelo menos 6 caracteres"});
      }

      const user = await User.findOne({email})

      if (user) {
        return res.status(400).json({menssage: "Email já existes"});
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt)

      const newUser = new User({
        fullName,
        email,
        password: hashedPassword
      })

      if(newUser){
        //  Generate token and set cookie
        genereteToken(newUser._id, res)
        await newUser.save()

        res.status(201).json({
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          profilePic: newUser.profilePic
        })
      }else {
        return res.status(400).joson({message: "User Invalido"});
      }
    } catch (error) {
      console.log("Error in signup controller", error.menssage)
      res.status(500).json({menssage: "Internal server error"});
    }
  }

export const Login = async (req, res) => {
    const {email, password} = req.body;
    try {
      const user = await User.findOne({email})
      if (!user) {
        return res.status(400).json({menssage: "Credenciais invalidas"});
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password)
      if(!isPasswordCorrect) {
        return res.status(400).json({menssage: "Credenciais invalidas"});
      }

      genereteToken(user._id, res)

      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      })
    } catch (error) {
      console.log("Error no controller de login", error.menssage)
      res.status(500).json({menssage: "Internal server error"});
    }
  }

export const Logout = (req, res) => {
    try {
      res.cookie("jwt", "", {maxAge:0})
      res.status(200).json({menssage: "Logout com sucesso"});
    } catch (error) {
      console.log("Error no controller de logout", error.menssage)
      res.status(500).json({menssage: "Internal server error"});
    }
  }

  export const updateProfile = async (req, res) => {
    try {
      const { profilePic } = req.body;
      const userId = req.user._id;
  
      if (!profilePic) {
        return res.status(400).json({ message: "Profile pic is required" });
      }
  
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: uploadResponse.secure_url },
        { new: true }
      );
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.log("error in update profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user)
  } catch (error) {
    console.log("Error in checkAuth controller", error.menssage)
    res.status(500).json({menssage: "Internal server error"});
  }
}