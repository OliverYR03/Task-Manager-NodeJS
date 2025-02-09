import User from "../models/user.js"
import bcrypt from 'bcryptjs'
import { createAccessToken } from "../libs/jwt.js"
import  jwt  from "jsonwebtoken"
import { TOKEN_SECRET } from "../config.js"
import dotenv from 'dotenv';
dotenv.config();
export const register = async(req, res) => {
    const {firstname, lastname, username, email, password} = req.body
   
   try {
    const userFound = await User.findOne({email})
    if (userFound) return res.status(400).json(["The email already exists"])
    
    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new User ({
        firstname,
        lastname,
        username,
        email,
        password: passwordHash,
   });

   const userSaved = await newUser.save();
   const token = await createAccessToken({id: userSaved.id})
   res.cookie("token", token)
    res.json({
     id: userSaved.id,
     firstname: userSaved.firstname,
     lastname: userSaved.lastname,
     username: userSaved.username,
     email: userSaved.email,
     createdAt: userSaved.createdAt,
     updatedAt: userSaved.updatedAt,
    })
   } catch (e) {
       console.log(e)
   }
}

export const login = async(req, res) => {
    const { email, password,} = req.body

   try {

    const userFound = await User.findOne({email})

    if (!userFound) return res.status(400).json({ message: "User not found"});

    const isMatch = await bcrypt.compare(password, userFound.password)
    if (!isMatch) return res.status(400).json({ message: "Incorrect password"})

    const token = await createAccessToken({id: userFound.id})



    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Solo usa Secure en producción
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // "none" para producción, "lax" para local
    });
    
      
    res.json({
        id: userFound.id,
        firstname: userFound.firstname,
        lastname: userFound.lastname,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    })
   } catch (e) {
       console.log(e)
   }
}

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
    
}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)

    if( !userFound) return res.status(400).json({ message: "User not found"})

    return res.json({
        id: userFound._id,
        firstname: userFound.firstname,
        lastname: userFound.lastname,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    })
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.send(false);
  
    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
      if (error) return res.sendStatus(401);
  
      const userFound = await User.findById(user.id);
      if (!userFound) return res.sendStatus(401);
  
      return res.json({
        id: userFound._id,
        firstname: userFound.firstname,
        lastname: userFound.lastname,
        username: userFound.username,
        img: userFound.img,
        email: userFound.email,
      });
    });
  };
  export const updateUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ message: "User not found" });
    res.json(user);
  };