import HighlightText from "./HighlightText";
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from "./Button"

const LearningLanguageSection = () => {
    return (<div className="mt-[150px] w-11/12 mb-32">
        <div className="flex flex-col gap-5 ">
            <div className="text-4xl font-semibold text-center ">
                <h1>Your Swiss Knife for
                    <HighlightText text={" learning any language"}></HighlightText>
                </h1>
            </div>
            <div className="text-center text-richblack-600 mx-auto text-base mt-3 w-[70%]">
                Using spin making learning multiple languages easy with 20+ languages realistic voice-over , progress tracking ,custom schedule and more.
            </div>
            <div className="flex flex-row items-center relative mt-5">
                <img src={know_your_progress} className="-mr-32"></img>
                <img src={compare_with_others}></img>
                <img src={plan_your_lesson} className="-ml-32"></img>
            </div>
            <div className="w-fit mx-auto">
                <CTAButton active={true} linkto={"/signup"}>
                    <div>Learn More</div>
                </CTAButton>
            </div>
        </div>
    </div>)
}
export default LearningLanguageSection;