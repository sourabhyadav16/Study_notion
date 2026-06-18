import {FaArrowRight} from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText"
import CTAButton from "../components/core/HomePage/Button"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection"
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/HomePage/ExploreMore";
const Home = () => {
    return (<div>
        {/* section 1 */}
        <div className="relative flex flex-col mx-auto w-11/12 items-center text-white justify-between max-w-[65%]">
            <Link to={"/signup"}>
                <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit">
                    <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900">
                        <p>Become an Instructor</p>
                        <FaArrowRight></FaArrowRight>
                    </div>
                </div>
            </Link>
            <div className="text-center font-semibold text-4xl mt-6">
                Empower Your Future with
                <HighlightText text={" Coding Skills"}></HighlightText> 
            </div>
            <div className="p-1 w-[70%] text-center text-lg font-bold text-richblack-600 mt-4">
                With our online coding courses , you can learn at your own pace , from anywhere around the world and get access to a wealth of resources including hands on projects , quizzes and personalized feedback from instructors
            </div>

            <div className="flex flex-row gap-7 mt-8 
            ">
                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>
                <CTAButton active={false} linkto={"/login"}>
                    Book a Demo
                </CTAButton>
            </div>
            <div className=" shadow-blue-200 mx-3 my-12">
                <video muted loop autoPlay>
                    <source src={Banner} type="video/mp4"></source>
                </video>
            </div>

            {/* Code Section 1 */}
            <div>
                <CodeBlocks position={"lg:flex-row"}
                    heading={<div className="p-1 text-4xl font-semibold ">
                        Unlock Your <HighlightText text={"coding potential"}></HighlightText> with our Online Couses.
                    </div>}
                    subheading = {"Our courses are taught by industry level experts who have years of experience in coding and are passionate about sharing their knowledge with you"}
                    ctabtn1={
                        {
                            btnText:"Try it yourself",
                            linkto:"/signup",
                            active:true
                        }
                    }
                    ctabtn2={
                        {
                            btnText:"Learn More",
                            linkto:"/login",
                            active:false
                        }
                    }

                    codeblock={`<<!DOCTYPE html>
                                <html>
                                head><title>Example</
                                title><linkrel-stylesheet"href="styles.css">
                                /head>
                                <body>
                                <h1><a href="/"></a>
                                </h1>
                                <nav><a href="one"/> <a href="two"/>
                                <a href="three"/>
                                </nav>`}  
                    codeColor = {"text-yellow-25"}
                    ></CodeBlocks>

            </div>

            {/* Code Section 2 */}
            <div>
                <CodeBlocks position={"flex-row-reverse"}
                    heading={<div className="p-1 text-4xl font-semibold ">
                        Start <HighlightText text={"coding"}></HighlightText> in Seconds.
                    </div>}
                    subheading = {"Go ahead, give it a try. Our hands-on learning environment means you will be writing real code from your very first lesson"}
                    ctabtn1={
                        {
                            btnText:"Continue Lesson",
                            linkto:"/signup",
                            active:true
                        }
                    }
                    ctabtn2={
                        {
                            btnText:"Learn More",
                            linkto:"/login",
                            active:false
                        }
                    }

                    codeblock={`<<!DOCTYPE html>
                                <html>
                                head><title>Example</
                                title><linkrel-stylesheet"href="styles.css">
                                /head>
                                <body>
                                <h1><a href="/"></a>
                                </h1>
                                <nav><a href="one"/> <a href="two"/>
                                <a href="three"/>
                                </nav>`}  
                    codeColor = {"text-yellow-25"}
                    ></CodeBlocks>

            </div>
            
            <ExploreMore></ExploreMore>
        </div>

        {/* section 2 */}
        <div className=" bg-pure-greys-5 text-richblack-700">
            <div className="homepage_bg h-[310px] mt-6">
                
                <div className="w-11/12 flex max-w-maxContent items-center gap-5 mx-auto flex-col">
                    <div className="h-[150px]"></div>
                    <div className="flex-row flex gap-7 text-white">
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className="flex items-center gap-2">Explore Full Catalog
                                <FaArrowRight></FaArrowRight>
                            </div>
                        </CTAButton>
                        <CTAButton active={false} linkto={"/signup"}>
                            <div>Learn More
                            </div>
                        </CTAButton>
                    </div>

                </div>
            </div>
            <div className=" mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
                <div className="flex flex-row gap-5 mb-10 mt-[95px]">
                    <div className="text-4xl font-semibold  w-[45%]">
                            Get the skills you need for a <HighlightText text={"Job that is in Demand"}></HighlightText>
                    </div>
                    <div className="flex flex-col w-[40%] items-start gap-3">
                        <div className="text-[16px]">
                            The modern StudyNotion has fantastic courses . Today to be a competitive specialist requires more than professional skills.
                        </div>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div>
                                Learn More
                            </div>
                        </CTAButton>
                    </div> 
                </div> 
                <TimelineSection></TimelineSection>

                <LearningLanguageSection></LearningLanguageSection>
            </div>
        </div>

        {/* section 3 */}
        <div className="mx-auto flex flex-col items-center w-11/12 max-w-maxContent justify-between gap-8 bg-richblack-900 text-white">
            <InstructorSection></InstructorSection>
            <h2 className="text-center mx-auto font-semibold mt-10">Reviews from Other learners</h2>
            {/* Review Slider here  */}
        </div>

        {/* Footer */}
        <Footer></Footer>
    </div>)
}

export default Home;