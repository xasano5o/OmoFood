import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { MdOutlineDashboard } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { PiTaxi } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { PiUsersFourLight } from "react-icons/pi";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

const Home = () => {
  const navigate = useNavigate()

  const menus = [
    { name: "Boshqaruv paneli", link: "/dashbord", icon: GoHome },
    { name: "Buyurtmalar", link: "/order", icon: PiUsersFourLight },
    { name: "Asosiy sahifa rasmi", link: "/banners", icon: MdOutlineAddPhotoAlternate },
    { name: "Mahsulotlar", link: "/products", icon: MdOutlineDashboard },
    { name: "Chegirma", link: "/discount", icon: TbReportAnalytics },
    { name: "Katta Turkum", link: "/categories", icon: TbReportAnalytics },
    { name: "Kichik Turkum", link: "/subcategories", icon: TbReportAnalytics, margin: true },
    { name: "Yetkazib berish", link: "/deliveries", icon:PiTaxi },
    { name: "Chiqish", link: "", icon: FaRegUser, margin: true },

  ];
  const [open, setOpen] = useState(true);
  return (
    <section className="flex gap-6">
      <div
        className={`bg-white min-h-screen ${open ? "w-72" : "w-16"
          } duration-500 text-gray-100 px-4 h-96 overflow-x-auto`}
      >

        <div className="py-3 flex justify-end text-center items-center gap-6">
          <Link to={"/admin/home"} className={`no-underline ${open ? "block" : "hidden"}`} >
            <h1 className="text-black">Omo Food</h1>
          </Link>

          {
            open ? (
              <FiArrowRight
                className="cursor-pointer text-black text-2xl"
                onClick={() => setOpen(!open)}
              />
            ) : (
              <FiArrowLeft
                className="cursor-pointer text-black text-2xl" // Adjust the font size here
                onClick={() => setOpen(!open)}
              />
            )
          }

        </div>
        <div className="mt-4 flex flex-col gap-4 relative">

          {menus?.map((menu, i) => (
            <div className=""
              onClick={() => navigate(`/admin${menu.link}/`)}
            >
              <Link
                to={menu?.link}
                key={i}
                className={` ${menu?.margin && ""
                  } group flex items-center text-sm no-underline text-center  gap-3.5 font-medium p-2 rounded-md`}
              >
                <h1 className="text-xl text-black">{React.createElement(menu?.icon)}
                </h1>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`text-xl text-black duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
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