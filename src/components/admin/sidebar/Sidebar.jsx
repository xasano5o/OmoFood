import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { MdOutlineAddPhotoAlternate, MdOutlineDashboard, MdOutlineDiscount } from "react-icons/md";
import { PiTaxi, PiUsersFourLight } from "react-icons/pi";
import { TbReportAnalytics } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SlNote } from "react-icons/sl";
import { BiCategoryAlt } from "react-icons/bi";
import { GoBlocked } from "react-icons/go";
const Home = () => {
  const navigate = useNavigate();
  const path_name=useLocation();

  const menus = [
    { name: "Boshqaruv paneli", link: "/home", icon: GoHome },
    { name: "Buyurtmalar", link: "/order", icon: PiUsersFourLight },
    { name: "Asosiy sahifa rasmi", link: "/banners", icon: MdOutlineAddPhotoAlternate },
    { name: "Mahsulotlar", link: "/products", icon: MdOutlineDashboard },
    { name: "Chegirma", link: "/discount", icon: MdOutlineDiscount },
    { name: "Katta Turkum", link: "/categories", icon: BiCategoryAlt },
    { name: "Kichik Turkum", link: "/subcategories", icon: BiCategoryAlt, margin: true },
    { name: "Yetkazib berish", link: "/deliveries", icon: PiTaxi },
    { name: "Yon daftarcha", link: "/note", icon: TbReportAnalytics },
    { name: "Qora Ro'yhat", link: "/blocked", icon: GoBlocked },

  ];

  const [open, setOpen] = useState(true);

  return (
    <section className="flex gap-6">
      <div
        className={`bg-white min-h-screen ${open ? "w-72" : "w-16"
          } duration-500 text-gray-100 px-4 h-96 overflow-x-auto`}
      >

        <div className="py-3 flex justify-end text-center items-center gap-6">
          <Link to={"/admin/home"} className={`no-underline ${open ? "block" : "hidden"}`}>
            <h1 className="text-black">Omo Food</h1>
          </Link>

          {open ? (
            <FiArrowRight
              className="cursor-pointer text-black text-2xl"
              onClick={() => setOpen(!open)}
            />
          ) : (
            <FiArrowLeft
              className="cursor-pointer text-black text-2xl" // Adjust the font size here
              onClick={() => setOpen(!open)}
            />
          )}
        </div>

        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
         <div key={i} className="" onClick={() => navigate(`/admin${menu?.link}`)}>
         <Link
           to={`/admin${menu.link}`}
           className={`${menu?.margin && ""} ${path_name.pathname===`/admin${menu.link}`? "actives text-white" : "text-black"} group flex items-center text-sm no-underline text-center gap-3.5 font-medium p-2 rounded-md`}
         >
           <h1 className="text-xl  ">{React.createElement(menu?.icon)}</h1>
           <h2
            //  style={{
            //    transitionDelay: `${i + 3}00ms`,
            //  }}
             className={`text-xl  ${!open && "opacity-0 translate-x-28 overflow-hidden"
               }`}
           >
             {menu?.name}
           </h2>
         </Link>
       </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Home;
  