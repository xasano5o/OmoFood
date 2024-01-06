import React from "react";
import { Carousel } from "react-responsive-carousel";
import { useGetBannersQuery } from "../../redux/slice/client/banner/index.js";
import Products from "./Products";
import { CategorySlide } from "./CategorySilide.jsx";
import Discount from "./Discout.jsx";

const Home = () => {
  const { data } = useGetBannersQuery();
  return (
    <div className="md:mt-24">
      <div className="container px-0">
        <Carousel className="z" autoPlay={true} infiniteLoop={true} showArrows={true}>
          {data?.map((item) => {
            return (
              <>
                <div className="carousel-item active" data-bs-interval="10000">
                  <img
                    src={item?.image}
                    className="h-96 object-contain w-full"
                    alt="banner_image"
                  />
                </div>
              </>
            );
          })}
        </Carousel>

        <CategorySlide />
        <Discount/>
        <Products />
      </div>
    </div>
  );
};

export default Home;
