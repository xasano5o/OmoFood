import React from "react";
import { useGetCategoryQuery } from "../../redux/slice/client/category";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { useGetBannersQuery } from "../../redux/slice/client/banner";
import Home from "./Home";

export default function HomeIndex() {
    const { data, isLoading } = useGetCategoryQuery();
    const navigate = useNavigate();

    const { data: datacarusel } = useGetBannersQuery();

    return (
        <>
            <div className=" fixed inset-0 z-50 flex items-center justify-center overflow-x-auto">


                <div className=" border rounded-lg shadow-lg relative flex flex-col w-full h-full bg-white outline-none focus:outline-none">
   
                    <h1 className="px-4 ">Bizning xizmatlar</h1>
                        <Carousel className="w-full" autoPlay={true} infiniteLoop={true} showThumbs={false} showStatus={false} showArrows={true}>
                            {datacarusel?.map((item, index) => (
                                <div key={index + 1} className="  carousel-item active w-full" data-bs-interval="10000">
                                    <img
                                        src={item?.image}
                                        className="object-cover w-full h-[400px] "
                                        alt="banner_image"
                                    />
                                </div>
                            ))}
                        </Carousel>
                    <div className="p-6 bg-white flex-auto">
                        <div className="flex gap-2">
                            <h1 className="text-2xl font-bold mb-4">Turkumlar</h1>
                  <NavLink className={'texts'} to={'/home'}>
                  <h1 className=" text-2xl font-bold mb-4 cursor-pointer">Umumiy</h1>
                  </NavLink>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
  {data?.map((item) => (
    <Link
      className="flex items-center gap-2 p-2 border rounded transition duration-300 no-underline hover:bg-gray-100"
      to={`/categories/${item.id}`}
      onClick={(e) => {
        e.preventDefault();
        navigate(`/categories/${item.id}`);
      }}
      key={item.id}
    >
      <img src={item?.image} alt="" className="w-12 h-12 rounded-full" />
      <p className="text-gray-800 text-sm sm:text-base md:text-lg">{item?.title}</p>
    </Link>
  ))}
</div>
                        <br />
                        <br />


                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>

        </>
    );
}
