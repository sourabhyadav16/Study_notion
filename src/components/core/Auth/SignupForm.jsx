import { useState } from "react";
import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";

const SignupForm = ({setIsLoggedIn}) => {
    const [showPassword,setShowPassword] = useState(false);
    const [accountType , setAccountType] = useState("student");
    const [showPassword2,setShowPassword2] = useState(false);
    const [formData,setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
    })

    function changeHandler(event){
        setFormData((prevData) => {
            return (
                {
                    ...prevData,
                    [event.target.name] : event.target.value
                }
            )
        })
    }
    const navigate = useNavigate();
    function submitHandler(event){
        event.preventDefault();
        if(formData.password !== formData.confirmPassword){
            toast.error("Password's Do not Match");
            return ;
        }
        else{
            toast.success("Successful Sign In");
            setIsLoggedIn(true);
            navigate("/dashboard");
            const finalData = {
                ...formData,
                accountType
            }
            const accountData = {
                ...formData
            }
        }
    }
    return (
        <div>
            <p className="flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max ">
                <button className= {`${accountType === "student" ? " bg-richblack-900 text-richblack-5 px-4 py-1 rounded-full" : "px-4 py-1"}`} onClick={() => {
                    setAccountType("student");
                }}>Student</button>
                <button className= {`${accountType === "instructor" ? " bg-richblack-900 text-richblack-5 px-4 py-1 rounded-full" : "px-4 py-1"}`}
                onClick={() => {
                    setAccountType("instructor");
                }}>Instructor</button>
            </p>
           <form onSubmit={submitHandler}>
                {/* {firstName and lastName} */}
                <div className="flex justify-between">
                    <label className="text-[0.875rem] text-richblack-5 mb-5 leading-[1.375rem] ">
                        <p>First Name<sup className=" text-red-500">*</sup></p>
                        <input className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
                        type="text"
                        name="firstName"
                        onChange={changeHandler}
                        placeholder="Enter First Name"
                        value={FormData.firstName}></input>
                    </label>
                    <br></br>
                    <label className="text-[0.875rem] text-richblack-5 mb-5 leading-[1.375rem]">
                        <p>Last Name<sup className=" text-red-500">*</sup></p>
                        <input className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
                        type="text"
                        name="lastName"
                        onChange={changeHandler}
                        placeholder="Enter Last Name"
                        value={FormData.lastName}></input>
                    </label>
                    <br></br>
                </div>

                {/* email Address */}

                <label className="text-[0.875rem] text-richblack-5 mb-5 leading-[1.375rem]">
                    <p>Email Address<sub>*</sub></p>
                    <input type="text"
                    required
                    placeholder="Enter Your Email"
                    name="email"
                    value={formData.email}
                    onChange={changeHandler}
                    id="email" className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"></input>
                </label>
                <br></br>
                <div className="flex justify-between mt-4">
                    <label className=" text-[0.875rem] text-richblack-5 mb-5 leading-[1.375rem] relative">
                        <p>Create Password<sup>*</sup></p>
                        <input required className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
                        type = {showPassword ? "text" : "password"}
                        name="password"
                        onChange={changeHandler}
                        placeholder="Create New Password"
                        value={FormData.password}></input>
                        <span className=" p-10 absolute -right-8 -top-[5px] cursor-pointer" onClick={() => {
                            setShowPassword((prev)=> !prev);
                        }}>
                        {
                            showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill="AFB2BF"></AiOutlineEyeInvisible>) : (<AiOutlineEye fontSize={24} fill="AFB2BF"></AiOutlineEye> )
                        }
                        </span>
                    </label>
                    <br></br>
                    <label className="text-[0.875rem] text-richblack-5 mb-5 leading-[1.375rem] relative">
                        <p>Confirm Password<sup>*</sup></p>
                        <input required className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
                        type= {showPassword2 ? "text" : "password"}
                        name="confirmPassword"
                        onChange={changeHandler}
                        placeholder="Confirm Password"
                        value={FormData.confirmPassword}></input>
                        <span className="absolute right-3 top-[35px] cursor-pointer" onClick={() => {
                            setShowPassword2((prev)=> !prev);
                        }}>
                        {
                            showPassword2 ? (<AiOutlineEyeInvisible fontSize={24} fill="AFB2BF"></AiOutlineEyeInvisible>) : (<AiOutlineEye fontSize={24} fill="AFB2BF"></AiOutlineEye> )
                        }
                        </span>
                    </label>
                </div>
                <br></br>

                <button className="bg-yellow-50 rounded-[8px] font-medium w-full text-richblack-900 px-[12px] py-[8px] my-7">
                    Create Account
                </button>
           </form>
           
        </div>
    )
}

export default SignupForm;