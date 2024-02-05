import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateBasketMutation, useDeleteBasketMutation, useIncrementMutation } from "../../redux/slice/client/basket/index.js";
import { useGetProductIdQuery } from "../../redux/slice/client/getProduct/index.js";
import { CategorySlide } from "./CategorySilide.jsx";
import { FaCartPlus } from "react-icons/fa";

function Product() {
  const [deleteBasket] = useDeleteBasketMutation();
  const [Increment] = useIncrementMutation();
  const { id } = useParams();

  const { data: product, isLoading, refetch } = useGetProductIdQuery({ id: id });
  const [createBasket, { isLoading: createIsloading }] =
    useCreateBasketMutation();

  useEffect(() => {
    setFilter(product);
  }, [product]);
  const [filter, setFilter] = useState(product);

  const addData = async (productd) => {
    const formData = new FormData();
    formData.append("amount", 1);
    formData.append("product", productd.id);
    try {
      await createBasket(formData).unwrap();
      toast.success(`maxsulod  qushildi`);
    } catch (error) {
      toast.error(`Failed to add category `);
    }
    refetch();
  };

  const increment = async (value) => {
    const formData = new FormData();
    formData.append("amount", value?.amount + 1);
    formData.append("id", value.id);

    try {
      await Increment(formData).unwrap();
    } catch (error) { }
    refetch();
  };
  const decrement = async (value) => {
    const formData = new FormData();
    formData.append("amount", value.amount - 1);
    formData.append("id", value.id);
    try {
      await Increment(formData).unwrap();
    } catch (error) { }
    const id = value?.id;
    if (value?.amount == 0) {
      deleteBasket({ id });
    }
    refetch();
  };



  const Loading = () => {
    return (
      <>
        <div className="row d-flex justify-content-center">
          <div className="col-md-12">
            <NavLink className="text-decoration-none text-dark" to={`/`}>
              <div className="d-flex align-items-center m-3">
                <Skeleton height={20} width={50} />
              </div>
            </NavLink>
            <div>
              <div className="row">
                <div className="col-md-6">
                  <div className="images p-3">
                    <div className="text-center p-4">
                      <Skeleton height={300} width={250} />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="border p-4">
                    <div className="mt-4 mb-3">
                      <span className="text-uppercase text-muted brand">
                        <Skeleton height={30} width={150} />
                      </span>
                      <h5 className="text-uppercase">
                        <Skeleton height={30} width={200} />
                      </h5>
                      <div className="price d-flex flex-row align-items-center">
                        <span className="act-price">
                          <Skeleton height={20} width={70} />
                          <Skeleton height={30} width={100} />
                        </span>
                      </div>
                    </div>
                    <p className="about">
                      <Skeleton height={10} width={300} />
                      <Skeleton height={10} width={300} />
                      <Skeleton height={10} width={300} />
                      <Skeleton height={10} width={300} />
                    </p>
                    <div className="cart mt-4 align-items-center">
                      <Skeleton height={40} width={150} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowDetails = () => {
    return (
      <>
        <div className="row d-flex justify-content-center w-full">
          <div className="col-md-12">
            <NavLink className="text-decoration-none text-dark" to={`/home`}>
              <div className="d-flex align-items-center m-3">
                <i className="fa fa-long-arrow-left"></i>
                <span className="ml-1">&nbsp;Back</span>
              </div>
            </NavLink>
            <div>
              <div className="row">
                <div className="col-md-6">
                  {product?.image ? (
                    <Carousel
                      className="w-full"
                      animationHandler={true}
                      autoPlay={true}
                      showStatus={false}
                      infiniteLoop={true}
                    >
                      <div className="h-[480px]">
                        <img
                          src={product?.image}
                          alt={product?.title}
                          className="object-contain w-full h-fit"
                        />
                      </div>
                      {product.images.map((item, index) => (
                        <div key={index} className="h-fit">
                          <img
                            src={item?.image}
                            alt={`${index}`}
                            className="object-contain w-full h-fit"
                          />
                        </div>
                      ))}
                    </Carousel>
                  ) : (
                    <h1>Mahsulot rasmlari hozircha yoq</h1>
                  )}
                </div>

                <div className="col-md-6">
                  <div className="w-full border p-4 shadow-md border-gray-100 h-[600px]">
                    <div className="mt-4 mb-3">
                      <h5 className="text-uppercase">{product?.title}</h5>
                      <span className="text-capitalize text-orange-600">
                        {product?.category?.title}
                      </span>
                      <div className="price d-flex flex-row align-items-center">
                        {product?.discount?.product_discount_price ? (
                          <div className="f">
                            <b className="text-xm">{product?.discount?.product_discount_price?.toLocaleString("ru-Ru")} so'm</b>
                            <br />
                            <del>{product?.price.toLocaleString("ru-Ru")} so'm</del>
                          </div>
                        ) : (
                          <big className="text-xm">{product?.price.toLocaleString("ru-Ru")} so'm</big>
                        )}
                      </div>
                      <div className="price d-flex flex-row align-items-center">
                        <big className="display-6">
                          <b>
                            {product?.amount}{" "}
                            {product?.amount_measure?.toLocaleString("ru-Ru")}
                          </b>
                        </big>
                      </div>
                    </div>
                    {/* .slice('0',"600") */}
                    <p className="text-muted whitespace-pre-wrap break-words">
                      {product?.description}
                    </p>
                    {product?.basket?.amount ? (
                      <div>
                        <div className="flex py-4 justify-around items-center ">
                          <span
                            onClick={() => decrement(product.basket)}
                            className="cursor-pointer rounded-l bg-blue-500 py-1 px-3.5 text-white duration-100 hover:bg-blue-500 hover:text-blue-50"
                          >
                            {" "}
                            -{" "}
                          </span>
                          <input
                            className="h-8 w-8 border bg-white text-center text-xs outline-none"
                            type="text"
                            value={product.basket?.amount}
                            min="1"
                          />
                          <span
                            onClick={() => increment(product?.basket)}
                            className="cursor-pointer rounded-r bg-blue-500 text-white py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          >
                            {" "}
                            +{" "}
                          </span>

                        </div>
                        <Link to={"/basket"}>
                          <button
                            type="button"
                            className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
                          >
                            Tasdiqlash
                          </button>
                        </Link>
                      </div>
                    ) : (
                      <div className=" text-center items-center justify-center flex mb-2">
                        <button
                          disabled={createIsloading && true}
                          onClick={() => addData(product)} className="bg-blue-700 flex gap-2 hover:bg-blue-800 text-white font-bold border px-4 py-2 border-blue-700 rounded">
                          <FaCartPlus className=" cursor-pointer text-2xl" /> Savatga Qo'shish
                        </button>
                        
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CategorySlide />
        </div>
      </>
    );
  };
  return (
    <>
      <div className="container px-0 mb-5" style={{ marginTop: "66px" }}>
        {isLoading ? <Loading /> : <ShowDetails />}
      </div>
    </>
  );
}

export default Product;
