import React,{useEffect,useState} from "react";
import {useNavigate,Link} from "react-router-dom"
import { FaRegUserCircle } from "react-icons/fa";
function Navbar() {
  const navigate=useNavigate()
  const [user,setUser]=useState()
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user)
    if(!user){
      // navigate("/login")
    }
  },[])
  return (
    <div className=" h-[8vh] flex flex-row justify-between items-center px-10">
      <div className=" text-white">
        <h1>LOGO</h1>
      </div>
      <div className="text-white flex justify-center items-center gap-4">
        <ul className="flex flex-row space-x-5">
          <li className="cursor-pointer">Home</li>
          {/* <li className="cursor-pointer">About</li>
          <li className="cursor-pointer">Contact</li> */}
        </ul>
        <div>
        {
          user && <FaRegUserCircle size={24} />
        }
        {
          !user && <Link to="/login" className="border border-gray-500 p-1 cursor-pointer hover:border-black  px-4 rounded-md">
            Login
          </Link>
        }
      </div>
      </div>
      
    </div>
  );
}

export default Navbar;
