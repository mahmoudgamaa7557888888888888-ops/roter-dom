import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../../../firebaseConfig";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import StorefrontIcon from '@material-ui/icons/Storefront';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      alert(`حدث خطاء غير متوقع ${err}`);
    }
  };

  return (
    <nav  className="bg-white z-50 text-gray-800 shadow-md p-4  relative">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">ادارة المخزن</h1>

        <button
          className="flex flex-col justify-between w-8 h-6 md:hidden z-50 focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          <span
            className={`block h-1  bg-gray-800  rounded transform transition-transform duration-300 ease-in-out ${
              open ? "rotate-90 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block h-1  bg-gray-800  rounded transition-opacity duration-300 ease-in-out ${
              open ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block h-1  bg-gray-800  rounded transform transition-transform duration-300 ease-in-out ${
              open ? "-hue-rotate-90 -translate-y-3" : ""
            }`}
          ></span>
        </button>

        {/* اللينكات */}
        <ul
          className={`absolute md:static left-0 top-14 w-full md:w-auto bg-gray-800 md:bg-transparent md:flex md:space-x-6 text-center transition-all duration-300 ease-in-out ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto"
          }`}
        >
          <Link to="/home">
          
          <li className={`p-3 ${ open ? "text-white" : "text-gray-800"} hover:text-blue-400 cursor-pointer`}>
           <HomeOutlinedIcon/> الصفحه الرئيسيه  
          </li>
          </Link>
          <Link to="add-day">
          
          <li className={`p-3 ${ open ? "text-white" : "text-gray-800" } hover:text-blue-400 cursor-pointer`}>
             <OpenInBrowserIcon/>  اضافه نقله جديده
          </li>
          </Link>
          
          <Link to="all-days">
          <li className={`p-3 ${open ? "text-white" : "text-gray-800 "} hover:text-blue-400 cursor-pointer`}>
            <StorefrontIcon/> جميع النقل
          </li>
          </Link>
          
          <li
            className="p-3 font-semibold text-red-600 hover:text-red-400 cursor-pointer"
            onClick={handleLogout}
          >
             تسجيل خروج    <ExitToAppIcon/>

            
           
          </li>
        </ul>
      </div>
    </nav>
  );
}
