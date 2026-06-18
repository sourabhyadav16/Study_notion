import Template from "../components/core/Auth/Template";
import LoginForm from "../components/core/Auth/LoginForm";
import loginImage from "../assets/Images/login.webp"
const Login = ({setIsLoggedIn}) => {
    const description1 = "Build Skills for today , tommorow and beyond";
    const description2 = "Education to future proof your career";
    const title ="Welcome Back";
    return (<div className=" flex justify-around w-[100vw] bg-richblack-900">
        <Template description1={description1} description2={description2} title={title}
        setIsLoggedIn={setIsLoggedIn} image={loginImage} formtype={LoginForm}></Template>
    </div>)
}
export default Login;