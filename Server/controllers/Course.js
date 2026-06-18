const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const mongoose = require("mongoose");
const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const CourseProgress = require("../models/CourseProgess");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
require("dotenv").config();
//create course handler

exports.createCourse = async(req,res) => {
    try{    
        
        //Get the data
        const {courseName,courseDescription,whatYouWillLearn , price ,tag} = req.body;
        const category = req.body.category;

        //thumbnail
        const thumbnail = req.files.thumbnailImage ;

        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !category){
            return res.status(400).json({
                success:false,
                message:"All the fields are mandatory"
            })
        }
        console.log(category);

        //2nd level validation :- if usesr is instructor or not ?

        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        
        if(!instructorDetails){
            return res.status(400).json({
                success:false,
                message:"Instructor not found"
            })
        }
        //check given tag is valid or not?
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(400).json({
                success:false,
                message:"Tags not found , in course.js"
            })
        }
 
        //upload image to cloudinary
        const thumbnailImage = uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

        //create entry of new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn,
            price,
            category:categoryDetails._id,
            //thumbnail:(await thumbnailImage).secure_url,
        })

        //add the new user to the user schema
        await User.findByIdAndUpdate({_id:instructorDetails._id},{
            $push:{
                courses:newCourse._id,
            }
        },
        {new:true})

        //update the tag schema


        //
        return res.status(200).json({
            success:true,
            message:"Course created successfully",
            data:newCourse
        })
    }catch(error){
        console.log("Ultimate error in the Course.js in the createCourse");
        console.log(error);
        return res.status(400).json({
            successs:false,
            message:"Ultimate error in the Course.js in the createCourse"
        })
    }
}


exports.showAllCourses = async(req,res) => {
    try{

        const allCourses = await Tag.find({},{courseNam:true,
            price:true,
            instructor:true,
            thumbnail:true,
            studentsEnrolled:true,
            ratingAndReviews:true
        }).populate("instructor").exec();


        return res.status(200).json({
            success:true,
            message:"The data for all the courses has been found successfully"
        })

    }catch(error){
        console.log("Error in showAllCourses");
        console.log(error);
        return res.status(400).json({
            message:"The data is not found in all courses",
            success:false
        })
    }
}

//getCourse Details

exports.getCourseDetails = async(req,res) => {
    try{
        //course id fetch karo
        const {courseId} = req.body;
        //many fields have been added as by reference , so we have to populate them .
        const courseDetails = await Course.find(
            { _id : courseId}).populate({
                path:"instructor",
                populate:{
                    path:"additionalDetails"
                }
            }).populate
            ("category")
            .populate({
                path:"courseContent",
                populate:{
                    path:"subSection"
                }}).exec();
        //validation 
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"Could not find the course in Course.js in the getCourseDetails handler"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Course details fetched successfully",
            courseDetails
        })

    }catch(error){
        console.log("Ultimate error in getCourseDetails");
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Ultimate error in getCourseDetails",
        })
    }
}

//edit course
exports.editCourse = async(req,res) => {
    try{        
        //get all the data related to that course.
        const {courseId} = req.body;
        const {courseName="",courseDescription="",whatYouWillLearn="",price=""} = req.body;
        //get the new image and upload it too cloudinary
        if(req.files && req.files.thumbnailImage){
            const thumbnailNew = req.files.thumbnailImage;
            try{
                const thumbnailUpload = await uploadImageToCloudinary(thumbnailNew,process.env.FOLDER_NAME);
                course.thumbnail = thumbnailUpload.secure_url;
            }catch(error){
                console.log("Error in uploading new image to cloudinary in editCourse.js");
                console.log(error);
                return res.status(400).json({
                    message:"Thumbnail cannot be updated in editCourse.js",
                    success:false,
                })
            }
            
        }
        //find the course
        const course = await Course.findById(courseId);
        //edit the course
        if(courseName === ""){
            courseName = course.courseName;
        }
        if(courseDescription === ""){
            courseDescription = course.courseDescription;
        }
        if(whatYouWillLearn === ""){
            whatYouWillLearn = course.whatYouWillLearn;
        }
        if(price === ""){
            price = course.price;
        }

        course.courseName = courseName;
        course.courseDescription = courseDescription;
        course.whatYouWillLearn = whatYouWillLearn;
        course.price = price;

        await course.save();
        
        const updatedCourse = await Course.findById(courseId).
        populate({
            path:"instructor",
            populate:{
                path:"additionalDetails",
            }
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        }).exec();
        //return response
        return res.status(200).json({
            success:true,
            message:"The coures has been edited successfully",
            data:updatedCourse,
        })


    }catch(error){
        console.log("Ultimate erro in coures has not been edited successfully");
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Ultimate erro in coures has not been edited successfully",
        })
    }
}


//get full course details
exports.getFullCourseDetails = async(req,res) => {
    try{
        //get course id 
        const {courseId} = req.body;
        const userId = req.user.id;
        //get all the details of the course 
        const courseDetails = await Course.findById(courseId)
        .populate({
            path:"instructor",
            populate:{
                path:"additionalDetails",
            }
        })
        .populate("category")
        .populate("ratingAndReview")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();
        //do it's validation
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"No details found for the specific course in Course.js in getFullCourse.js"
            })
        }
        //get course progess of that user 
        const courseProgressCount = await CourseProgress.find({userId:userId,courseId:courseId});

        if(!courseProgressCount){
            return res.status(400).json({
                success:false,
                message:"No course progess has been founded",
            })
        }

        let totalDurationInSeconds = 0;
        courseDetails.courseContent.forEach((section) =>{
            section.forEach((subsection)=>{
                const timeDurationInSeconds = parseInt(subsection.timeDuration);
                totalDurationInSeconds += timeDurationInSeconds;
            })
        })
        return res.status(200).json({
            success:true,
            message:"The course Details have been fetched perfectly for this course",
            data:{
                courseDetails,
                totalDuration,
                completedVideos: courseProgressCount?courseProgressCount.completedVideos
                : [],
            }
        })

    }catch(error){
        console.log("Ultimate error in course");
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Ultimate error in The course has not been found"
        })
    }
}


//get instructor's course 
exports.getInstructorCourses = async(req,res) => {
    try{
        const instructorId = req.user.id;

        const instructorCourse = await User.findOne({_id:instructorId})
        .sort({createdAt:-1})
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();

        return res.status(200).json({
            success:true,
            message:"The details for a instructor has been fetched "
        })
    }catch(error){
        return res.status(400).json({
            success:false,
            message:"The details for a instructor has been fetched "
        })
    }
}


//delete a course
exports.deleteCourse = async(req,res) => {  
    try{
        const {courseId} = req.body;
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(400).json({
                success:false,
                message:"No course w.r.t to this course id"
            })
        }
        //delete the course from all the students
        const studentsEnrolled = course.studentsEnrolled
        for(const studentId of studentsEnrolled){
            await User.findByIdAndUpdate(studentId,{
                $pull:{
                    courses:courseId
                }
            })
        }
        //delete all the videos w.r.t that course
        const courseContent = course.courseContent;
        for(const oneSection in courseContent){
            for(const oneSubSection in oneSection){
                await SubSection.findByIdAndDelete(oneSubSection);
            }
            await Section.findByIdAndDelete(oneSection);
        };
        await Course.findByIdAndDelete(courseId);

        return res.status(200).json({
            success:true,
            message:"Course has been deleted successfully"
        })

        }catch(error){
            console.log("Ultimate error in deleteCourse.js");
            return res.status(400).json({
                success:true,
                message:"Course cannot be deleted successfully"
            })
    }
}
