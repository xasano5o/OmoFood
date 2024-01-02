import React, { useState } from "react";
import NoProduct from "../../../assest/icon/Без названия.png";
import { useGetOrderQuery } from "../../../redux/slice/client/order/index.js";
import EmptyBox from "../../EmptyBox/EmptyBox.jsx";
import Loader from "../../Loader/Loader";
import DeleteOrder from "./OrderDelete.jsx";
import OrderUpdate from "./OrderUpdate.jsx";
import OrderLocation from "./OrderLocation.jsx";

const OrderCrud = () => {
  const { data, error, isLoading } = useGetOrderQuery();
  console.log(data, "order");
  const [search, setSearch] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className=" ">
      {/* Set the height to 100vh */}
      <section className="bg-gray-50 dark:bg-white-900 p-3 sm:p-5 antialiased">
        <div className="mx-auto max-w-screen-3xl  px-1 lg:px-12">
          <div className="bg-white  dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <br />
            <div className="flex justify-between px-3">
              <input
                type="text"
                id="table-search-users"
                className="block p-2 pl-10 text-sm text-black border border-gray-300 rounded-lg w-80 bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Izlash..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <br />
            <div className="overflow-x-auto h-[80vh] w-[100%] ">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">
                      Haridorning Ismi
                    </th>
                    <th scope="col" className="p-4">
                      Haridorning Familyasi

                    </th>
                    <th scope="col" className="p-4">
                      To'lov turi
                    </th>
                    <th scope="col" className="p-4">
                      Yetkazilganligi haqida
                    </th>
                    <th scope="col" className="p-4">
                      Maxsulotga Buyurtma berilgan Vaqti
                    </th>
                    <th scope="col" className="p-4">
                      Yetkazilganligi haqida
                    </th>
                    <th scope="col" className="p-4">
                      Buyurtma qilingan sana
                    </th>
                    

                    <th scope="col" className="p-4">
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader color="#36d7b7" />
                    </div>
                  ) : data?.length > 0 ? (
                    data?.map((item) => {
                      const dateObject = new Date(item.created_date);
                      const options = { hour12: false };
                      const formattedDate = dateObject.toLocaleString(
                        "en-US",
                        options
                      );

                      return (
                        <tr
                          className="border-b dark:border-gray-600 hover:bg-gray-100  dark:hover:bg-white-700"
                          key={item.id}
                        >


                          <td className="px-4 py-3">
                            <span
                              className={`text-gray-800  text-base font-medium px-2 py-0.5 rounded`}
                            >
                              {item?.user?.first_name}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`text-gray-800  text-base font-medium px-2 py-0.5 rounded`}
                            >
                              {item?.user?.last_name}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`text-gray-800  text-base font-medium px-2 py-0.5 rounded`}
                            >
                              {item?.total_price} So'm
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`text-gray-800  text-base font-medium px-2 py-0.5 rounded`}
                            >
                              {item?.payment_method}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`text-gray-800  text-base font-medium px-2 py-0.5 rounded`}
                            >
                              {item?.delivery_status}
                            </span>
                          </td>

                          <td className="px-4 py-3">
                            <span
                              className={`text-gray-800  text-base font-medium px-2 py-0.5 rounded`}
                            >
                              {item?.location.address}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`text-gray-800  text-base font-medium px-2 py-0.5 rounded`}
                            >
                              {formattedDate}
                            </span>
                          </td>

               
                          <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <div className="flex items-center space-x-4">
                              <div>
                                <OrderLocation location={item.location} />
                              </div>
                              <div>
                                <OrderUpdate object={item} />
                              </div>

                              <div>
                                <DeleteOrder ID={item?.id} />
                              </div>

                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <EmptyBox />
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderCrud;
