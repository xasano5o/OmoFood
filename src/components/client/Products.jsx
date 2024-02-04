import axios from "axios";
import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCreateBasketMutation,
  useDeleteBasketMutation,
  useGetProductQuery,
  useIncrementMutation,
} from "../../redux/slice/client/basket/index.js";



function DiscountCom() {
  const { data: products, isLoading } = useGetProductQuery();
  const [deleteBasket] = useDeleteBasketMutation();
  const [increment, { isLoading: disl }] = useIncrementMutation();
  const [createBasket] = useCreateBasketMutation();
  const token = localStorage.getItem("user");
  if (token) {
    fetch('https://api.omofoods.uz/api/v1/users/check_token/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user")}`,
      }
    }
    ).then((res) => {
   if (res.status===401) {
      localStorage.removeItem('user')
   }
   })

  } else {
    axios.get("users/get_token/").then((res) => {
      const token = res.data.access_token;
      localStorage.setItem("user", token);
    });
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }



  const addData = async (productData) => {
    const formData = new FormData();
    formData.append("amount", 1);
    formData.append("product", productData.id);

    try {
      await createBasket(formData).unwrap();
      toast.success(`maxsulod qushildi`);
    } catch (error) {
      toast.error(`Failed to add category`);
    }
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

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://widget.replain.cc/dist/client.js';

    const head = document.getElementsByTagName('head')[0];
    head.appendChild(script);

    window.replainSettings = { id: 'ef9b08a6-e42d-454d-8c44-b11a5e975fed' };

    return () => {
      // Cleanup: remove the script when the component unmounts
      head.removeChild(script);
    };
  }, []);
  const Loading = () => (
    <div className="col-md-13 py-md-3">
      <div className="row">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="col-6 col-md-6 col-lg-3 mb-3">
            <Skeleton height={400} width={"100%"} />
          </div>
        ))}
      </div>
    </div>
  );

  const ShowProducts = () => (
    <>
      <h3>Maxsulotlar</h3>
      <div className="flex col-md-13 py-md-3">
        {/* <div className="">
            <Sidekatalg/>
          </div> */}
        <div className="row">
          {products?.map((product) => {
            const discountTimeLeft = parseFloat(product?.discount?.time_left);
            const backend_seconds = product?.discount?.time_left;

            // Convert seconds to milliseconds
            const diffTime = backend_seconds * 1000;

            const days = Math?.floor(diffTime / (24 * 60 * 60 * 1000));
            const hours = Math?.floor((diffTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
            const minutes = Math?.floor((diffTime % (60 * 60 * 1000)) / (60 * 1000));
            const secs = Math?.floor((diffTime % (60 * 1000)) / 1000);


            return (
              <div className="col-6 col-md-3 col-lg-3 mb-3" >
                <div className="h-100">
                  <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl h-[350px] lg:h-[400px]" key={product?.id}>
                    <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl">
                      <NavLink to={`/product/${product?.id}`}>
                        <img
                          src={product?.image}
                          alt={product?.title} className="object-contain w-full h-fit" />
                      </NavLink>
                    </div>
                    <div className="p-2">
                      <div className="flex items-center justify-between mb-2">
                        <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                          {product?.title}
                        </p>
                      </div>
                      {product?.discount?.product_discount_price ? (
                        <div className="f">
                          <b className="text-xs">{product?.discount?.product_discount_price?.toLocaleString("ru-Ru")} so'm</b>
                          <del>{product?.price.toLocaleString("ru-Ru")} so'm</del>
                        </div>
                      ) : (
                        <b className="text-xm">{product?.price.toLocaleString("ru-Ru")} so'm</b>
                      )}
                    </div>
                    <div className="p-2 pt-0">
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
            );
          })}
        </div>
      </div>
    </>
  );

  return (
    <div className="container">
      <div className="row">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <ShowProducts />
          </>
        )}
      </div>
    </div>
  );
}

export default DiscountCom;
