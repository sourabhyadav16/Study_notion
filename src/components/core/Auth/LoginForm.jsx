import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {toast} from "react-hot-toast"
import { useDispatch } from "react-redux";
const LoginForm = ({setIsLoggedIn}) => {
    const [formData,setFormData] = useState({
        email : "",
        password : ""
    })
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword,setShowPassword] = useState(false);
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

    const {email,password} = formData;

    function submitHandler(event){
        event.preventDefault();
        dispatch(login(email,password,navigate));
    }

    return (<div className="flex flex-col w-full gap-y-4 mt-6">
        <form onSubmit={submitHandler}>
            <label htmlFor="email" className="text-[0.875rem] text-richblack-5 mb-5 leading-[1.375rem]">Email Address<sup className=" text-red-500">*</sup></label>
            <br></br>
            <input type="text"
            required
            placeholder="Enter Your Email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            id="email"
            className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"></input>
            <br></br>
            
            <label htmlFor="password" className=" relative text-[0.875rem] text-richblack-5 mb-5 leading-[1.375rem]">Enter Password<sup className=" text-red-500">*</sup>
            <br></br>
            
                <input type =  {showPassword ? "text" : "password"}
                required
                placeholder="Enter Your Password"
                name="password"
                value={formData.password}
                id="password"
                onChange={changeHandler}
                className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"></input>
                
                <span onClick={() => {
                    setShowPassword((prev)=> !prev);
                }} className=" p-10 absolute right-2 top-[0px] cursor-pointer">
                    {
                        showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill="AFB2BF"></AiOutlineEyeInvisible >) : (<AiOutlineEye fontSize={24} fill="AFB2BF"></AiOutlineEye> )
                    }
                </span></label>
            
            <div className="text-xs  text-blue-100  w-full flex flex-row-reverse">
                <Link to="#" className="mr-0">Forget password</Link>
                
            </div>
            <button className="bg-yellow-50 rounded-[8px] font-medium w-full text-richblack-900 px-[12px] py-[8px] my-5">Sign In</button>
            
        </form>
    </div>)
}
export default LoginForm ;