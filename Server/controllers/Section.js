const Section = require("../models/Section");
const Course = require("../models/Course");
const mongoose = require("mongoose");
exports.createSection = async(req,res) => {
    try{
        //data fetch
        const {sectionName,courseId} = req.body;
        //validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"SectionName or CourseId is not filled successfully"
            })
        }
        //create Section
        const newSection = await Section.create({
            sectionName,
        })
        //update section in course. :- HERE WE HAVE LEFT HOW TO USE POPULATE TO REPLACE SUBSECTION AND SECTION BOTH IN THE UPDATED COURSE DETAILS
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,{
            $push:{courseContent:newSection._id}
        },{new:true})
        //return response successfull.
        return res.status(200).json({
            success:true,
            message:"Course Section has been created successfully",
            updatedCourseDetails,
        })
    }catch(error){
        console.log("Section has not been created successfully");
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"The section has not been created",
            error
        })
    }
}


exports.updateSection = async(req,res) => {
    try{
        //data input
        const {sectionName,sectionId} = req.body;
        
        //data validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"sectionName or sectionId is not filled successfully"
            })
        }
        //update data 
        const section = await Section.findByIdAndUpdate(sectionId,{
            sectionName
        },{new:true});
        //return response
        return res.status(200).json({
            success:true,
            message:"Section has been updated successfully"
        })

    }catch(error){
        console.log("Update has not been successfully");
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"The update has some mistake in updateSection"
        })
    }
}


exports.deleteSection = async(req,res) => {
    try{
        //fetch id only as we have to delete , so we need to have id only , assuming we send id in params
        const {sectionId} = req.body;
        //delete that object
        await Section.findByIdAndDelete(sectionId);
        //Do we need to delete the entry from the course Schema ?
        //return response.
        return res.status(200).json({
            success:true,
            message:"The section has been deleted successfully"
        })
    }catch(error){
        console.log("Ultimate mistkae in DeleteSectin has not been successfully");
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"The DeleteSection has some mistake in updateSection"
        })
    }
}