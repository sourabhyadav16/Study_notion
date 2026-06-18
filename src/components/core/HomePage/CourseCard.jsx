import { TbBinaryTree2 } from "react-icons/tb";
import { MdPeopleAlt } from "react-icons/md";
const CourseCard = ({course,index, currentCard , setCurrentCard}) => {
    return (<div className={`w-[350px] h-[280px] flex justify-between flex-col
    ${currentCard === course.heading ? ("p-1 bg-white border-r-yellow-50 border-r-8 border-b-[8px] border-b-yellow-50") : (" bg-richblack-300")}
    px-4 py-6
    `}
    onClick={()=>{setCurrentCard(course.heading)}}
    >
        <div className={`font-semibold text-2xl  ${currentCard === course.heading ? (" text-richblack-900") : (" text-white")}`}>{course.heading}</div>
        <div className={`${currentCard === course.heading ? (" text-richblack-700") : (" text-white")}`}>{course.description}</div>
        <div className={`flex flex-row items-end ${currentCard === course.heading ? (" text-richblue-300") : (" text-white")} `}>
            <div className="flex flex-row gap-2 items-center">
                <MdPeopleAlt></MdPeopleAlt>
                {course.level}
            </div>
            <div className="flex flex-row gap-2 items-center">
                <TbBinaryTree2></TbBinaryTree2>
                <p> {course.lessionNumber} Lessons</p>  
            </div>

        </div>
    </div>)
}
export default CourseCard;