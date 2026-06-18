const Category = require("../models/Category");

exports.createCategory = async(req,res) => {
    try{
        //data from the body of request
        const {name,description} = req.body;
        //validation kar lete hai
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"Either name or description or both are empty"
            })
        }
        //creating an entry in DB
        const CategoryDetails = await Category.create({
            name:name,
            description:description,
        })

        return res.status(200).json({
            success:true,
            message:"Category created successfully",
            CategoryDetails,
        })

    }catch(error){
        console.log("Ultimate Error in createCategory Tag");
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"The Category is not created"
        })
    }
}

// Get all tags :- This will help us to filter
exports.showAllCategories = async(req,res) => {
    try{

        const allTags = await Category.find({},{name:true,description:true});

        res.status(200).json({
            success:true,
            message:"All the tags have been returned successfully",
            allTags,
        })


    }catch(error){
        console.log("Error in showAll tags");
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Ultimate error in showAllTags in Tag.js in controllers"
        })
    }
}

exports.categoryPageDetails = async(req,res) => {
    try{
        //get CategoryId
        const {categoryId} = req.body;
        //find all the courses regarding to that id 
        const selectedCategory = await Category.findById(categoryId).populate({
            path:"courses",
        }).exec();
        //validation .
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"There is no course available for this category"
            })
        }
        //if there is no course available for that category , then just bring courses from different category .(Just as suggestions).
        const differentCategory = await Category.find({
            _id:{
                $ne:categoryId
            }
        }).populate("courses").exec();

        //get top selling courses. :- Do it
        //return res
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory:selectedCategory,
                differentCategory:differentCategory,
            }
        })

    }
    catch(error){
        console.log("error Ultimate in categoryPageDetails");
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"error Ultimate in categoryPageDetails",
        })
    }
}


