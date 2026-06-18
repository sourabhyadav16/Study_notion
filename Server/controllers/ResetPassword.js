const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
//reset password token

//This function only generates a link and sends it to the user through the email .

exports.resetPasswordToken = async(req,res) => {
        try{
            //get email from request ki body.
        const email = req.body.email;
        console.log(email);
        //check user for this email, email validation
        const user = await User.findOne({email});
        
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Email is not registered (reset password)"
            })
        }
        //generate token and expiration date 
        const token = crypto.randomUUID();
        //Update token and expiration date for the token
        const updatedDetails = await User.findOneAndUpdate({email:email},{
            token : token,
            resetPasswordExpires:Date.now() + 5 * 60 * 1000,
        },{new:true})
        //generate the link.
        const Url = `http://localhost:3000/update-password/${token}`
        //send email
        await mailSender(email,"Password Reset Link from Study Notion",
            `Password Reset Link : ${Url}`
        )
        //return the response.
        return res.status(200).json({
            success:true,
            message:"Email Sent successfully . Please check the email and reset password"
        })
    }catch(error){
        console.log("Ultimate error in Reset Password");
        console.log(error);
        return res.status(400).json({
            message:"Something went wrong while reset the password",
            success:false,
        })
    }
}

//This controller will update the new password in the data base.
exports.resetPassword = async(req,res) => {
    try{
        //data fetch
        const {password , confirmPassword , token} = req.body ;
        //validation
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password dont match in the reset password entered by the user"
            })
        }
        //get user details from db using token
        const user = await User.findOne({token:token});
        //if no entry - invalid token
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Token is invalid as we got no user in respect to that user"
            })
        }
        //token ka time toh expire nhi ho gya hai ?
        if(user.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                success:false,
                message:"The token has expired in reset password",
            })
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password,10);
        //update the password
         await User.findOneAndUpdate({token:token},{
            password:hashedPassword
        },{new:true})
        //return response
        return res.status(200).json({
            success:true,
            message:"Password Reset is Successfull",
            user,
        })
    }catch(error){
        console.log("Ultimate error in the Reset Password");
        console.lof(error);
        return res.status(400).json({
            success:false,
            message:"Ultimate error in the Reset Password"
        })
    }
}