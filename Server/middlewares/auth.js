const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");
//auth

exports.auth = async(req,res,next) => {
    try{
        //extract the token
        const token = req.cookies.token || req.body.token ||req.header("Authorisation").replace("bearer","");
        
        //if token is missing , then return the response.
        if(!token){
            return res.status(400).json({
                success:false,
                message:"token is missing in the authorisation middleware",
            })
        }

        // verify the token 
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;

        }catch(error){
            console.log("Error in verifying the token");
            console.log(error);
            return res.status(401).json({
                message:"Not able to verify the token in authorisation",
                success:false,
            })
        }
        next();
    }catch(error){
        console.log("Ultimate error in the middleware auth");
        console.log(error);
        return res.status(400).json({
            message:"Ultimte error in the auth middleware",
            success:false,
        })
    }
}

//student
exports.isStudent = async(req,res,next) => {
    try{
        if(req.user.accountType !== "Student"){
            return res.status(400).json({
                success:false,
                message:"This is a protected route and you are not authorized to move in this route",
            })
        }
        next();
    }catch(error){
        return res.status(400).json({
            success:false,
            message:"Ultimate error in user role in isStudent",
        })
    }
}


//instructor

exports.isInstructor = async(req,res,next) => {
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(400).json({
                success:false,
                message:"This is a protected route for instructors and you are not authorized to move in this route",
            })
        }
        next();
    }catch(error){
        return res.status(400).json({
            success:false,
            message:"Ultimate error in user role in isInstructor",
        })
    }
}


//admin
exports.isAdmin = async(req,res,next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(400).json({
                success:false,
                message:"This is a protected route for admin and you are not authorized to move in this route",
            })
        }
        next();
    }catch(error){
        return res.status(400).json({
            success:false,
            message:"Ultimate error in user role in isAdmin",
        })
    }
}
