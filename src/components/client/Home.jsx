import React from "react";
import { Carousel } from "react-responsive-carousel";
import { useGetBannersQuery } from "../../redux/slice/client/banner/index.js";
import { CategorySlide } from "./CategorySilide.jsx";
import Products from "./Products";
import DiscountCom from "./discounCom.jsx";

const Home = () => {
  const { data } = useGetBannersQuery();
  return (
    <div className="md:mt-24">
      <div className="container px-0 bg-white">
        <Carousel className="w-full bg-white" autoPlay={true} infiniteLoop={true} showThumbs={false} showStatus={false} showArrows={true}>
          {data?.map((item, index) => (
            <div key={index + 1} className="carousel-item active w-full " data-bs-interval="10000">
              <img
                src={item?.image}
                className="object-cover w-full h-[350px]"
                alt="banner_image"
              />
            </div>
          ))}
        </Carousel>
        <DiscountCom />
        <Products />
      </div>
    </div>
  );
};

export default Home;
