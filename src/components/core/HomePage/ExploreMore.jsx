import { useState } from "react";
import {HomePageExplore} from "../../../data/homepage-explore"
import HighlightText from "./HighlightText";
import { current } from "@reduxjs/toolkit";
import CourseCard from "./CourseCard";
const tabsName =["Free", "New to coding" , "Most popular" , "Skills paths" , "Career paths"]
const ExploreMore = () => {
    const [currentTab,setCurrentTab] = useState(tabsName[0]);
    const [courses,setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course)=>{return course.tag === value})
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

    return (
        <div className="relative flex flex-col justify-center items-center ">
            <div className="text-4xl font-semibold text-center ">
                Unlock the <HighlightText text={"Power of Code"}></HighlightText>
            </div>
            <p className="text-center text-richblack-300 font-semibold mt-3 text-base text-[16px] ">Learn to build anything you can imagine</p>
            <div className="flex flex-row rounded-full bg-richblack-800 mb-5 mt-5 border-richblack-100 px-1 py-1 ">
                {
                    tabsName.map((Element,index) => {
                        return (
                            <div key={index}
                            className={`text-[16px] flex flex-row items-center gap-2
                                ${currentTab === Element ? ("bg-richblack-900 text-richblack-5 font-medium") : ("p-1 text-richblack-200 ")} rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900
                                hover:text-richblack-50 py-2 px-7
                                `}
                            onClick={()=>setMyCards(Element)}
                            >
                                {Element}
                            </div>
                        )
                    })  
                }
            </div>
            <div className="lg:h-[200px] sm:h-[20px]"></div>
            {/* Course Card ka group */}
            <div className=" flex gap-8 justify-between absolute top-60">
                {
                    courses.map((course,index)=>{
                        return <CourseCard course={course} key={index} currentCard={currentCard} setCurrentCard={setCurrentCard}></CourseCard>
                    })
                }
                
            </div>
        </div>
    )
}
export default ExploreMore ;