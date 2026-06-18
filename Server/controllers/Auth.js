const User = require("../models/User");
const OTP = require("../models/OTP");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
require("dotenv").config();
//sendOtp
exports.sendOtp = async(req,res) => {
    try{
        //fetch email from the request body
        const {email} = req.body;
        //Check if user already exists 
        const checkUserPresent = await User.findOne({email});
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"The user is already registered",
            })
        }
        //Generate OTP
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        })

        //make sure OTP generated is unique, so check in the otp collection whether the otp is unique or not .
        const result = await OTP.findOne({otp:otp});

        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            })
            result = await OTP.findOne({otp:otp});

        }
        

        //let's create an OTP object
        const otpPayload = {email , otp};

        //Create an entry in the Database.
        const otpBody = await OTP.create(otpPayload);


        //return response
        res.status(200).json({
            success:true,
            message:"OTP sent successfully",
            otp
        })


    }catch(error){
        console.log("Error in the Auth.js in sendOtp ");
        console.log(error);
        return res.status(400).status({
            success:false,
            message:"Ultimate error in Auth.js in the sendOTP "
        })
    }

}
   

//signup
exports.signUp = async(req,res) => {
    try{
        //data fetch from the request body
        const {firstName,lastName,email,password,confirmPassword,accountType,contactNumber,otp} = req.body;
        //data validate karo
        if(!firstName || !lastName || !email || !password || !confirmPassword  || !otp){
            return res.status(403).json({
                success:false,
                message:"one of the necessary details missing from the signup account ."
            })
        }

        //Match the password 
        if(password !== confirmPassword){
            return res.status(400).response({
                success:false,
                message:"Password and confirmPassword value does not match"
            })
        }
        //Check whether the user exists or not /
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User is already registered , please log in"
            })
        }
        //find the most recent OTP

        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        //validate OTP.
        if(recentOtp.length == 0){
            return res.status(400).json({
                success:false,
                message:"OTP not found"
            })
        }
        else if(otp !== recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP entered by the user"
            })
        }
        //hash the password
        const hashedPassword = await bcrypt.hash(password,10);

        //Creating an additionalDetails object.
        const ProfileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        });
        //create an entry in db
        const user = await User.create({
            firstName,lastName,email,password:hashedPassword,contactNumber,accountType,additionalDetails:ProfileDetails._id,image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
        })
        //return response
        return res.status(200).json({
            success:true,
            message:"User is registered successfully",
            user,
        })

    }catch(error){
        console.log("Error in signUp in the auth.js in the controllers");
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"User registeration failed :- ultimate error"
        })
    }
}


//login
exports.login = async(req,res) => {
    try{
        //fetch the data
        const {email,password} = req.body;
        //validation
        if(!email || !password){
            return res.status(403).json({
                message:"Email or password is empty in login",
                success:false,
            })
        }
        //get the user
        const user = await User.findOne({email}).populate("additionalDetails");
        //check if user is registered or not 
        if(!user){
            return res.status(400).json({
                message:"User is not registered",
                success:false
            })
        }
        //create a token only after matching the password
        if(await bcrypt.compare(password,user.password)){
            const payload = {
                email:user.email,
                accountType:user.accountType,
                id:user._id
            }
            const options = {
                expiresIn : "2h",
            }
            const token =  jwt.sign(payload,process.env.JWT_SECRET,options);
            user.toObject();
            user.token = token;
            user.password = undefined;
            const options1 = {
                expires:new Date(Date.now()  +  3 * 24 * 60 * 60 * 1000),
                httpOnly:true
            }
            //create a cookie
            res.cookie("token",token,options1).status(200).json({
                success:true,
                message:"Successfully logged in",
                user,
                token,
            })

        }
        else{
            return res.status(400).json({
                success:false,
                message:"Password's don't match"
            })
        }
    }catch(error){
        console.log("Ultimate Error in the login controllers");
        console.log(error);
        return res.status(400).json({
            message:"The login controller has an ultimate error",
            success:false,
        })
    }
}


// change password
exports.changePassword = async(req,res) => {
    try{
        // get the data from the body of the request.
        //here we have three data old password , new password , confirm new password
        //apply validation
        //update password in data base
        //Send the email
        //return response
    }catch(error){

    }
}
