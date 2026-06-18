import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, NavLink } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import {AiOutlineShoppingCart} from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown"
import { useEffect, useState } from "react";
import { apiconnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import {IoIosArrowDropdownCircle} from "react-icons/io";

const Navbar = () => {

    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=> state.profile);
    const {totalItems} = useSelector((state) => state.cart);

    const [subLinks , setSubLinks] = useState([]);
    const fetchSubLinks = async()=>{
        try{
            const result =await  apiconnector("GET",categories.CATEGORIES_API);
            console.log(result);
            setSubLinks(result.data.data);
        }catch(error){
            console.log("Could not fetch the cataegory list");
            console.log(error);
        }
    }
    useEffect(() => {
        fetchSubLinks();
    },[]);

    return (<div className="flex flex-col items-center justify-center h-14 border-b-[1px] border-b-richblack-700">
        <div className="flex w-11/12 max-w-maxContent justify-between items-center ">
            {/* Image Add toh ho gyi */}
            <Link to="/">
                <img src={Logo} width={160} height={32}></img>
            </Link>

            <nav>
                <ul className="flex gap-x-6 text-richblack-25">
                    {
                        NavbarLinks.map((navBar,index) => {
                            return <li>
                                {
                                    navBar.title === "Catalog" ? (<div className=" relative flex gap-1 items-center group">
                                        <p>{navBar.title}</p>
                                        <IoIosArrowDropdownCircle></IoIosArrowDropdownCircle>
                                        <div className=" invisible absolute left-[50%] top-[50%] flex flex-col rounded-md opacity-0 bg-richblack-5 text-richblack-900  
                                        transition-all duration-200
                                         lg:w-[300px] p-4 translate-x-[-50%] translate-y-[30%] group-hover:visible group-hover:opacity-100">
                                        <div className=" absolute left-[50%] top-0 h-6 w-6 rotate-45 rounded translate-y-[-45%] bg-richblack-5 ">
                                        </div>
                                        {
                                            subLinks?.length  ? (
                                                subLinks.map((sublink,index)=>{
                                                    return <Link key={index} to={`${sublink.link}`}>{sublink.title}</Link>
                                                })
                                            ) : (<div></div>)
                                        }
                                        </div>                                   

                                    </div>) : (
                                        <NavLink to={`${navBar.path}`}><p>
                                                {navBar.title}
                                            </p></NavLink>
                                     )
                                }
                            </li>
                        })
                    }
                </ul>
            </nav>

            {/* Login Signup DashBoard LogOut */}
            <div className="flex gap-x-4 items-center">
                {
                    user && user?.accountType !== "Instructor" && (
                        <Link to="/dashboard/cart" className="relative ">
                            <AiOutlineShoppingCart></AiOutlineShoppingCart>
                            {
                                totalItems > 0 && (
                                    <span>
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>
                        
                    )
                }
                {
                    token === null && (
                        <Link to="/login">
                            <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[7px] text-richblack-200 rounded-md">Log in</button>
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to="/signup">
                            <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[7px] text-richblack-200 rounded-md">Sign Up</button>
                        </Link>
                    )
                }
                {
                    token !== null && <ProfileDropDown></ProfileDropDown>
                }
            </div>
        </div>
    </div>)
}
export default Navbar ;