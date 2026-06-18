import { FaArrowRight } from "react-icons/fa";
import Instructor from "../../../assets/Images/Instructor.png"
import CTAButton from "./Button";
import HighlightText from "./HighlightText";
const InstructorSection = () => {
    return(<div className="mt-16">
        <div className="flex flex-row gap-20 items-center">
            <div className="w-[50%] ">
                <img src={Instructor}
                alt="Instructor image"></img>
            </div>
            <div className="w-[50%] flex flex-col ">
                <div className="text-4xl font-semibold w-[50%] mb-20">Become an <HighlightText text={"Instructor"}></HighlightText></div>
                <p className="font-medium text-[16px] w-[80%] text-richblack-300">Instructors from around the world teach millions of students on studyNotion . We provide the tools and skills to teach what you love.</p>
                <div className="w-fit mt-20">
                    <CTAButton active={true} linkto={"/signup"}>
                        <div className="flex flex-row gap-2 items-center ">
                            Start Teaching Today
                            <FaArrowRight></FaArrowRight>
                        </div>
                    </CTAButton>
                </div>
            </div>
        </div>
    </div>)
}
export default InstructorSection;