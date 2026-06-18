const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");

//create ratings :- see rating is respect to the course and is given by the user .now user will give the ratings and reviews.
exports.createRating = async(req,res) => {
    try{
        //get user id
        const userId = req.user.id;
        //fetch data
        const {rating,review,courseId} = req.body;
        //if user is registered
        const courseDetails = await Course.findOne({_id:courseId,studentsEnrolled:{
            $elemMatch:{$eq:userId}
        }})

        if(!courseDetails){
            return res.status(400).json({
                message:"User is not registered for this course , hence cannot provide ratings ",
                success:false,
            })
        }
        //if user has already provided the ratings 
        const alreadyReviewed = await findOne({user:userId,course:courseId});
        if(alreadyReviewed){
            return res.status(403).json({
                message:"The user has already reviewed",
                success:false,
            })
        }
        //now create the review
        const ratingReview = await RatingAndReview.create({
            rating,review,course:courseId,user:userId
        })
        //entry in coures . Update the course .
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},{
            $push:{ratingAndReviews:ratingReview._id}
        },{new:true})
        //return response 
        return res.status(200).json({
            success:true,
            message:"The entry has been created successfully for the rating and review provided by the user",
            ratingReview
        })
    }catch(error){
        console.log("There is ultimate error in the rating and review");
        console.log(error);
        return res.status(400).json({
            message:"There is ultimate error in the rating and review",
            success:false,
        })
    }
}


//get average ratings
exports.getAverageRating = async(req,res) => {
    try{
        //get course ratings 
        const courseId = req.body.courseId;
        //get average ratings 
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course : new mongoose.Types.ObjectId(courseId),
                }
            },
            {
                $group:{_id:null},
                averageRating:{$avg:"rating"}
            }
        ]);

        if(result.length() > 0){
            return res.status(200).json({
                success:true,
                message:"This is the average rating ",
                averageRating:result[0].averageRating,
            })
        }
        //return response
        return res.status(200).json({
            success:true,
            message:"There is no rating existing",
            averageRating:0,
        })
    }catch(error){
        console.log("error Ultimate in RatingAndReview");
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"error Ultimate in RatingAndReview",
        })
    }
}


//get all ratings
exports.getAllRating = async(req,res) => {
    try{
        const allReview = await RatingAndReview.find({})
        .sort({rating:"desc"})
        .populate({
            path:"user",
            select:"firstName  lastName email image"
        })
        .populate({
            path:"course",
            select:"courseName",
        })
        .exec();
        return res.status(200).json({
            success:true,
            message:"This handler provides all the ratings",
            allReview,
        })
    }catch(error){
        console.log("error Ultimate in getAllRatings");
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"error Ultimate in getAllRatings",
        })
    }
}