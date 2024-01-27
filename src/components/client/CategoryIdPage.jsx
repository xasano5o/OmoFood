import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCreateBasketMutation,
  useDeleteBasketMutation,
  useIncrementMutation,
} from "../../redux/slice/client/basket";
import { useGetProductIdQuery } from "../../redux/slice/client/category";
import Savat from "../../savat.jpg";
import Loading from "./Loading";
import Skeleton from "react-loading-skeleton";
import ProductNotfound from "./ProductNotfound";
import { FaCartPlus } from "react-icons/fa";

const CategoryId = () => {
  const Loading = () => {
    return (
      <div className="container mx-auto">
        <div className="col-md-13 py-md-3">
          <div className="row">
            <div className="col-6 col-md-6 col-lg-3 mb-3">
              <Skeleton height={400} width={"100%"} />
            </div>
            <div className="col-6 col-md-6 col-lg-3 mb-3">
              <Skeleton height={400} width={"100%"} />
            </div>
            <div className="col-6 col-md-6 col-lg-3 mb-3">
              <Skeleton height={400} width={"100%"} />
            </div>
            <div className="col-6 col-md-6 col-lg-3 mb-3">
              <Skeleton height={400} width={"100%"} />
            </div>
            <div className="col-6 col-md-6 col-lg-3 mb-3">
              <Skeleton height={400} width={"100%"} />
            </div>
            <div className="col-6 col-md-6 col-lg-3 mb-3">
              <Skeleton height={400} width={"100%"} />
            </div>
            <div className="col-6 col-md-6 col-lg-3 mb-3">
              <Skeleton height={400} width={"100%"} />
            </div>
            <div className="col-6 col-md-6 col-lg-3 mb-3">
              <Skeleton height={400} width={"100%"} />
            </div>
          </div>
        </div>
      </div>
    );
  };
  const { id } = useParams();
  const [deleteBasket] = useDeleteBasketMutation();
  const [Increment, { isLoading: disl }] = useIncrementMutation();
  const {
    data: products,
    isLoading,
    refetch,
  } = useGetProductIdQuery({ id: id });
  const [procate, setProcate] = useState(products);
  const [createBasket, { isLoading: disabled, isSuccess }] =
    useCreateBasketMutation();

  const token = localStorage.getItem("user");
  if (token) {
    axios.post("users/check_token/", {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user")}`,
      },
    });
  } else {
    axios.get("users/get_token/").then((res) => {
      const token = res.data?.access_token;
      localStorage.setItem("user", token);
    });
    setTimeout(() => {
      // window.location.reload();
    }, 1500);
  }

  useEffect(() => {
    setFilter(products);
  }, [products]);
  const [filter, setFilter] = useState(products);

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
  const updateBasket = async (value, amount) => {
    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("id", value.id);

    try {
      await increment(formData).unwrap();
    } catch (error) { }
  };

  const decrement = async (value) => {
    const amount = value.amount - 1;

    if (amount === 0) {
      const id = value.id;
      deleteBasket({ id });
    } else {
      updateBasket(value, amount);
    }
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto mt-3">
      <div className="col-md-13 py-md-3">
        <div className="row">
          {

            products && products?.length > 0 ? (
              products?.map((product) => (
                <div className="col-6 col-md-3 col-lg-3 mb-1" key={product?.id}>

                  <div className="h-100">
                    <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl h-[450px]" key={product?.id}>
                      <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl">
                        <NavLink to={`/product/${product?.id}`}>
                          <img
                            src={product?.image}
                            alt={product?.title} className="object-contain w-full h-[300px]" />
                        </NavLink>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                            {product?.title}
                          </p>

                        </div>
                        {product?.discount?.product_discount_price ? (
                          <div className="f">
                            <b className="text-xm">{product?.discount?.product_discount_price?.toLocaleString("ru-Ru")} so'm</b>
                            <br />
                            <del>{product?.price.toLocaleString("ru-Ru")} so'm</del>
                          </div>
                        ) : (
                          <b className="text-xm">{product?.price.toLocaleString("ru-Ru")} so'm</b>
                        )}
                      </div>
                      <div className="p-6 pt-0">
                        {product?.basket?.amount ? (
                          <div className="flex py-4 justify-around items-center border-gray-100">
                            <span
                              disabled={disl && true}
                              onClick={() => decrement(product?.basket)}
                              className="cursor-pointer rounded-l bg-blue-700 text-white py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                            >
                              {" "}
                              -{" "}
                            </span>
                            <input className="h-8 w-8 border text-center text-xs outline-none" type="text" value={product?.basket?.amount} min="1" />
                            <span
                              disabled={disl && true}
                              onClick={() => updateBasket(product?.basket, product?.basket?.amount + 1)}
                              className="cursor-pointer rounded-r bg-blue-700 text-white py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                            >
                              {" "}
                              +{" "}
                            </span>
                          </div>
                        ) : (
                          <button
                            onClick={() => addData(product)}
                            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                          >
                            Savatga qo'shish
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <ProductNotfound />
            )}
        </div>
      </div>
    </div>
  );
};

export default CategoryId;
