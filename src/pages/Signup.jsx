import Template from "../components/core/Auth/Template";
import signUpImage from "../assets/Images/signup.webp";

const Signup = (props) => {
    const setIsLoggedIn = props.setIsLoggedIn;
    const title = "Join the millions learning to code with studyNotion for free";
    const description1 = "Build skills for today , tommorow and beyond";
    const description2 = "Education to future proof your career";

    return (<div className="flex bg-richblack-900 justify-center ">
        <Template title={title} description1={description1} description2={description2}
        image={signUpImage} setIsLoggedIn={setIsLoggedIn} formtype="signup"></Template>
    </div>)
}
export default Signup;