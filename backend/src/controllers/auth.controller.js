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

export const Login = (req, res) => {
    res.send("login route");
  }

export const Logout = (req, res) => {
    res.send("logout route");
  }