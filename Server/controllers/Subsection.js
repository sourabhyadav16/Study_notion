const { findByIdAndUpdate } = require("../models/Course");
const Section = require("../models/Section");
const Category = require("../models/Category");
const Subsection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

//create Subsection 
exports.createSubSection = async(req,res) => {
    try{    
        //fetch the data from the request body
        const {title,timeDuration,description,sectionId} = req.body;
        //fetch the video from the file
        const video = req.files.video;
        //validation
        if(!sectionId || !title || !timeDuration || !description){
            return res.status(400).json({
                success:false,
                message:"Some details are missing in the createSubSection in subsection.js"
            })
        }
        //Upload the video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        //You get the secure response
        //create subsection
        const subSectionDetails = await Subsection.create({title:title,                 
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url});
        //Create it's entry in section 
        const updatedSection = await Section.findByIdAndUpdate(sectionId,{
            $push:{subSection:subSectionDetails._id}
        },{new:true}).populate("subSection");
        //return response .
        return res.status(200).json({
            success:true,
            message:"sub section has been created successfully ",
            updatedSection,
        })
    }catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Sub section has not been created successfully"
        })
    }
}

// Hw :- update Subsection and delete Sub section
exports.updateSubSection = async(req,res) => {
    try{   
        const {subSectionId,title,description,timeDuration} = req.body;
        const video = req.files.videoFile;
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        await Subsection.findByIdAndUpdate({_id:subSectionId},{
            title:title,description:description,timeDuration:timeDuration,videoUrl:uploadDetails.secure_url
        },{new:true});
        return res.status(200).json({
            success:true,
            message:"The subsection has been updated successfully"
        })
    }catch(error){
        console.log("ultimate error in the updateSubsection in the controllers");
        console.log(error);
        return res.status(400).json({
            message:"ultimate error in the updateSubsection in the controllers",
            success:false,
        })
    }
}

//HW :- Delete Subsection
exports.deleteSubSection = async(req,res) => {
    try{
        const {subSectionId} = req.body;
        await Subsection.findByIdAndDelete(subsectionId);
        return res.status(200).json({
            message:"The sub Section has been deleted successfully",
            success:false,
        })
    }catch(error){
        console.log("ultimate error in the deleteSubsection in the controllers");
        console.log(error);
        return res.status(400).json({
            message:"ultimate error in the deleteSubsection in the controllers",
            success:false,
        })
    }
}