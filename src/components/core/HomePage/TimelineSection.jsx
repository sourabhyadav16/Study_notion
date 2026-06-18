
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timeLineImage from "../../../assets/Images/TimelineImage.png"
const timeline = [
    {
        logo: Logo1,
        heading: "Leadership",
        Description:"Fully commited to the success of company"
    },
    {
        logo: Logo2,
        heading: "Leadership",
        Description:"Fully commited to the success of company"
    },
    {
        logo: Logo3,
        heading: "Leadership",
        Description:"Fully commited to the success of company"
    },
    {
        logo: Logo4,
        heading: "Leadership",
        Description:"Fully commited to the success of company"
    },
]

const TimelineSection = () => {
    return (<div>
        <div className="flex flex-row gap-15 items-center ">
            <div className="w-[45%] flex flex-col gap-5">
                {
                    timeline.map((element,index) => {
                        return (
                            <div className="flex flex-col ">
                                <div className="flex flex-row gap-6 " key={index}>
                                    <div className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center">
                                        <img src={element.logo}></img>
                                    </div>
                                    <div className="flex flex-col ">
                                        <h2 className="font-semibold text-[18px] ">{element.heading}</h2>
                                        <div className="text-base ">{element.Description}</div>
                                    </div>
                                </div>
                                <div className="h-[40px] bg-richblack-100 w-[3px] rounded-3xl ml-6 mt-2"></div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="relative shadow-blue-200 h-fit ">
                <img src={timeLineImage} alt="Timeline image"></img>

                <div className="absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-8 px-7 left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <div className="flex flex-row gap-5 items-center border-caribbeangreen-200 p-2">
                        <h2 className="text-3xl font-bold ">10</h2>
                        <p className="p-1 text-caribbeangreen-25">Years of Experience</p>
                    </div>
                    <div className="flex gap-5 items-center px-7">
                        <h2 className="text-3xl font-bold ">250</h2>
                        <p className="p-1 text-caribbeangreen-25">Type of Courses</p>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}
export default TimelineSection;