const User = require("../models/User");
const Profile = require("../models/Profile");
const {uploadImageToCloudinary} = require("../utils/imageUploader")
exports.updateProfile = async(req,res) => {
    try{
        //get data
        const {dateOfBirth="",about="",contactNumber,gender} = req.body;
        //get user id
        const id = req.user.id;
        //validate
        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                message:"One of required fields is empty",
                success:false,
            })
        }
        //find profile
        const userDetails = await User.findById(id);
        //update profile
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        profileDetails.about = about;

        await profileDetails.save();
        //return response
        return res.status(200).json({
            success:true,
            message:"The profile has been updated successfully",
            profileDetails
        })
    }catch(error){
        console.log(error);
        return res.status(400).json({
            message:"Ultimate mistake in the updateProfile",
            success:false,
        })
    }
}

//delete account;
exports.deleteAccount = async(req,res) => {
    try{
        //fetch id of the account
        const id = req.user.id;
        //validation
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(400).json({
                message:"The user is not valid in the Profile.js",
                success:false,
            })
        }
        //first delete profile 
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        //Then delete user
        await User.findByIdAndDelete({_id:id});
        //return response
        return res.status(200).json({
            success:true,
            message:"The user has been deleted successfully"
        })
    }catch(error){
        console.log("Ultimate error in deleteAccount");
        console.log(error);
        return res.status(400).json({
            message:"Ultimate error in deleteAccount in profile.js",
            success:false,
        })
    }
}

//get all the users
exports.getAllUserDetails = async(req,res) => {
    try{
        const id = req.user.id;
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        return res.status(200).json({
            success:true,
            message:"The user data has been fetched successfully",
            userDetails
        })
    }catch(error){
        console.log("Ultimate error in getAllUserDetails");
        console.log(error);
        return res.status(400).json({
            message:"Ultimate error in getAllUserDetails in profile.js",
            success:false,
        })
    }
}

//upload image to cloudinary

exports.updateDisplayPicture = async (req, res) => {
    try {
      const {displayPicture} = req.files;
      const userId = req.user.id;
      console.log(userId);
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      const updatedProfile = await User.findByIdAndUpdate(
        userId,
        { image: image.secure_url },
        { new: true }
      )
      if(!updatedProfile){
        return res.status(400).json({
            success:false,
            message:"No user found"
        })
      }
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      console.log("Ultimate error in the updateDisplayPicture");
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
//