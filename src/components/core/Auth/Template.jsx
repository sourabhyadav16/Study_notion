import frameImage from "../../../assets/Images/frame.png"
import SignupForm from "../Auth/SignupForm"
import LoginForm from "../Auth/LoginForm"
import {FcGoogle} from "react-icons/fc"

const Template = ({title,description1,description2,image,formtype,setIsLoggedIn}) => {
    return (
        <div className='flex text-white justify-around w-11/12 max-w-[1150px] py-12 mx-auto gap-x-40  '>
            <div className='w-11/12 max-w-[450px] mt-4'>
                <h1 className="text-richblack-5 font-semibold text-[1.785rem] ">{title}</h1>
                <p className='leading-[1.625rem] mt-4 text-[1.175rem]'>
                    <span className='text-richblack-100'>{description1}</span><br></br>
                    <span className='text-blue-100'>{description2}</span>
                </p>
                {
                    formtype === "signup" ? (<SignupForm setIsLoggedIn={setIsLoggedIn}></SignupForm>) : (<LoginForm setIsLoggedIn={setIsLoggedIn}></LoginForm> )
                }
                <div className='flex my-4 gap-x-2 items-center'>
                    <div className='w-full h-[1px] bg-richblack-700'></div>
                    <p className=' text-richblack-700 font-medium leading-[1.375rem]'>Or</p>
                    <div className='w-full h-[1px] bg-richblack-700'></div>
                </div>
                <button className='w-full flex justify-center items-center rounded-[8px] font-medium text-richBlack-100
                border border-richblack-700 px-[12px] py-[8px] gap-x-2 mt-6 '>
                    <FcGoogle></FcGoogle>
                    <p>Sign Up With Google</p>
                </button>
            </div>
            <div className='relative w-11/12 max-w-[450px] mt-20'>
                <img src={frameImage} alt='frame image' loading='lazy'
                width={558}
                height={504}
                ></img>
                <img src={image} alt="Image missing"loading='lazy'
                width={558}
                height={504} className='absolute -top-4 right-4'></img>
            </div>
            
        </div>
    )
}

export default Template;