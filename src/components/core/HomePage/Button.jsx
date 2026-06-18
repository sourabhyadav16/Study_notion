import { Link } from "react-router-dom";

const CTAButton = ({children,active,linkto}) => {
    return (<div>
        <Link to={linkto}>
            <div className={`text-center text-[13px] px-6 py-3 rounded-lg font-bold ${active ? "( bg-yellow-50 text-black)" : "  bg-richblack-700"}
             transition-all hover:scale-95 duration-200
            `
        }>
                {children}
            </div>
        </Link>
    </div>)
}
export default CTAButton;