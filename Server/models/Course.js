const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
    },
    courseDescription:{
        type:String,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    whatYouWillLearn:{
        type:String,
    },
    courseContent:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Section",
        }
    ],
    tag:[{
        type:String,
    }],
    ratingAndReviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview"
        }
    ],
    price:{
        type:Number
    },
    thumbnail:{
        type:String
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    studentsEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        }
    ],
    status:{
        type:String,
        enum:["Draft","Published"],
    },
    instructions:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    }
})

module.exports = mongoose.model("Course",courseSchema);