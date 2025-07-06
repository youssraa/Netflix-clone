import bcryptjs from "bcrypt";
import {User} from "../models/user.model.js";
import { generateTokenAndSetCookies } from "../utils/generateToken.js";
export async function signup(req,res){
   try {
    const {username ,password , email}=req.body
    if(!email || !username || !password){
        return res.status(400).json({success :false ,message : "All fields are required"})
    }
    	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailRegex.test(email)) {
			return res.status(400).json({ success: false, message: "Invalid email" });
		}
    if(password.length < 6 ){
        return res.status(400).json({success : false ,message :"Password should be at least 6 character" })
    }
    const existingUserByEmail = await User.findOne({email : email})
    if(existingUserByEmail){
        return res.status(400).json({success : false , message : "Email already used "})
    }
    const existingUsername = await User.findOne({username : username})
    if(existingUsername){
        return res.status(400).json({success : false , message : "username is already exist"})
    }
    const PROFILE_PICS = ["/avatar1.png" , "/avatar2.png" , "/avatar3.png"]

    const salt = await bcryptjs.genSalt(10) ;
    const hashedPassword = await bcryptjs.hash(password,salt) ;
    const image = PROFILE_PICS[Math.floor(Math.random()*PROFILE_PICS.length)]
    const newUser =  new User({
        username ,
        password : hashedPassword ,
        email ,
        image
    })
    
     generateTokenAndSetCookies(newUser._id,res)
    await newUser.save()
    res.status(201).send({success: true , user : {...newUser._doc , password : ""}})
   } catch (error) { 
    console.log("Error in signup controller", error.message);
	res.status(500).json({ success: false, message: "Internal server error" });
   }
} 
export async function login(req,res){
    const {email , password}=req.body
try {
    const user = await User.findOne({email:email})
    if(!email || !password){
        return res.status(400).json({success: false , message : "this fiels required !!"})
    }
    if(!user){
        return res.status(404).json({sucess: false , message : "bad criedantials"})
    }
    const isPasswordValid =await  bcryptjs.compare(password ,user.password )
    if(!isPasswordValid){
        return res.status(400).json({sucess : false , message : "Bad cridentials"})
    }
    generateTokenAndSetCookies(user._id,res)
    res.status(200).json({sucess : true ,user : {...user._doc ,password :""}})
    
} catch (error) {
        console.log("Error in login controller", error.message);
	res.status(500).json({ success: false, message: "Internal server error" });
}
}
export async function logout(req,res) {
    try {
        res.clearCookie("jwt-netflix")
        res.status(200).json({sucess : true , message : "logg out successfully"})
    } catch (error) {
           console.log("Error in signup controller", error.message);
	res.status(500).json({ success: false, message: "Internal server error" });
    }
    
}
export async function authCheck(req, res) {
	try {
	
		res.status(200).json({ success: true, user: req.user });
        console.log("AUTH CHECK - req.user:", req.user);
	} catch (error) {
		console.log("Error in authCheck controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}