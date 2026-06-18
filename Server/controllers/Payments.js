const {instance} = require("../config/razorpay");
const User = require("../models/User");
const Course = require("../models/Course");
const mailSender = require("../utils/mailSender");
const courseEnrollmentEmail = require("../mails/templates/courseEnrollmentEmail");
require("dotenv").config();
//capture the payment
exports.capturePayment = async(req,res) => {
    //get course id and user id 
    const {courseId} = req.body;
    const userId = req.user.id;
    //validation :- valid course id , student id , user has not already bought the course
    if(!courseId){
        return res.status(400).json({
            message:"Please provide valid course id",
            success:false,
        })
    }
    let course ;
    try{
        course = await Course.findById(courseId);
        if(!course){
            return res.status(400).json({
                success:false,
                message:"No course in respect to the course id you have provided in payment capture . js",
            })
        }
        //user has already bought the course
        const uid = new mongoose.Types.ObjectId(userId);

        if(course.studentsEnrolled.includes(uid)){
            return res.status(400).json({
                success:false,
                message:"Student is already Enrolled"
            })
        }
    }catch(error){
        console.log("Error in getting course data in the capture payment");
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Error in getting course data in the capture payment",
        })
    }
    //create order
    const amount = course.price;
    const currency = "INR";

    const options = {
        amount:amount * 100,
        currency,
        receipt : Math.random(Date.now()).toString(),
        notes:{
            courseId:courseId,
            userId,
        }
    }
    try{
        //initiate the payment user razorpay 
        const paymentResponse = await instance.orders.create(options);
    }
    catch(error){
        console.log("Could not initiate the order");
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Could not initiate the order"
        })
    }
    return res.status(200).json({
        success:true,
        courseName:course.courseName,
        courseDescription:course.courseDescription,
        thumbnail:course.thumbnail,
        orderId: paymentResponse._id,
        currency:paymentResponse.currency,
        amount:paymentResponse.amount,
    })
    //return response
}

//verigy siganture of razorpay and server
exports.verifySignature = async(req,res) => {
    const webhookSecret = "12345678";
    const signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256",webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const diagest = shasum.digest("hex");

    if(secret === diagest){
        //payment is authorized
        const {courseId , userId} = req.body.payload.payment.entity.notes ;

        try{
            //fulfill the action
            const enrolledCourse = await Course.findOneAndUpdate({_id:courseId},
                {
                    $push:{studentsEnrolled:userId}
                },{new:true}
            )
            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:"No enrolledCourse in the verify-signature"
                })
            }
            const enrolledStudent = await User.findOneAndUpdate({
                _id:userId
            },{
                $push:{courses:courseId}
            },{new:true})
            //payment confirmation response
            const emailResponse = await mailSender(enrolledStudent.email,"Congratulations , You are onboarded on new course","Email from codehelp regarding your joining of new course");
            return res.status(200).json({
                success:true,
                message:"User has successfully bought the course , Jai Hind"
            })
        }catch(error){
            console.log("Ultimate error in the verify-signature in payment.js");
            console.log(error);
            res.status(400).json({
                success:false,
                message:"Ultimate error in the verify-signature in payment.js",
            })
        }
    }
    else{
        return res.status(400).json({
            success:false,
            message:"The call for verify-signature has not been created by the authorized payment gateway provider"
        })
    }
}
