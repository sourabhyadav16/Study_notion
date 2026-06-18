const express = require("express");
const router = express.Router();

const {
    createCourse,
    deleteCourse,
    getInstructorCourses,
    getFullCourseDetails,
    editCourse,
    getCourseDetails,
    showAllCourses,
    } = require("../controllers/Course");

const {createCategory,
    categoryPageDetails,
    showAllCategories} = require("../controllers/Category");

const {createSection,
    updateSection,
    deleteSection} = require("../controllers/Section");

const {createSubSection,
    updateSubSection,
    deleteSubSection} = require("../controllers/Subsection");

const {
    createRating,
    getAllRating,
    getAverageRating} = require("../controllers/RatingAndReview");

const {
    auth,
    isStudent,
    isInstructor,
    isAdmin} = require("../middlewares/auth");


router.post("/createcourse",auth,isInstructor,createCourse);

router.post("/deletecourse",auth,isInstructor,deleteCourse);

router.post("/getInstructorCourses",auth,isInstructor,getInstructorCourses);

router.post("/getFullCourseDetails",getFullCourseDetails);

router.post("/editCourse",auth,isInstructor,editCourse);

router.post("/getCourseDetails",getCourseDetails);

router.post("/showAllCourses",showAllCourses);

router.post("/addSection",auth,isInstructor,createSection);
router.post("/updateSection",auth,isInstructor,updateSection);
router.delete("/deleteSection",auth,isInstructor,deleteSection);


router.post("/addSubSection",auth,isInstructor,createSubSection);
router.post("/updateSubSection",auth,isInstructor,updateSubSection);
router.delete("/deleteSubSection",auth,isInstructor,deleteSubSection);


router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)

router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

module.exports = router;



