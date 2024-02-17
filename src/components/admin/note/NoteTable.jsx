import React, { useEffect, useState } from "react";
import NoProduct from "../../../assest/icon/Без названия.png";
import { useGetNoteQuery } from "../../../redux/slice/client/note/index.js";
import EmptyBox from "../../EmptyBox/EmptyBox.jsx";
import Loader from "../../Loader/Loader";
import AddNote from "./AddNote.jsx";
import DeleteNote from "./DeleteNote.jsx";
import EditNote from "./EditNote.jsx";
import ViewNote from "./ViewNote.jsx";

const NoteTable = () => {
  const { data, error, isLoading } = useGetNoteQuery();
  const [search, setSearch] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);




  useEffect(() => {
    // Delay execution by 1 or 2 seconds
    const timer = setTimeout(() => {
      if (Array.isArray(data)) {
        const total = data.reduce((a, b) => a + (b?.amount || 0), 0);
        setTotalAmount(total);
      }
    }, 0); // 1000 milliseconds = 1 second

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, [data]); // Depend on filteredTeachers to recalculate when it changes

  return (
    <div className=" ">

      <section className="bg-gray-50  dark:bg-white-900 p-3 sm:p-5 antialiased">
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

              {totalAmount.toLocaleString('uz-UZ')} so'm
              <AddNote />
            </div>
            <br />
            <div className="overflow-x-auto  h-[80vh] ">
              <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="  text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">
                      Maxsulot narxi
                    </th>

                    <th scope="col" className="p-4">
                      Maxsulot haqida komment
                    </th>
                    <th scope="col" className="p-4">
                      Maxsulot nomi
                    </th>
                    <th scope="col" className="p-4">Maxsulot qo'shilgan narxi</th>
                    <th scope="col" className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader color="#36d7b7" />
                    </div>
                  ) : data?.length > 0 ? (
                    data?.map((item) => {

                      const dateObject = new Date(item?.created_date);
                      const options = { hour12: false };
                      const formattedDate = dateObject.toLocaleString(
                        "en-US",
                        options
                      );
                      return (
                        <tr
                          className="border-b dark:border-gray-600 hover:bg-gray-100  dark:hover:bg-white-700"
                          key={item?.id}
                        >

                          <td className="px-4 py-3">
                            <span
                              className={`text-gray-800  text-base font-medium px-2 py-0.5 rounded`}
                            >
                              {item?.price} So'm
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`text-gray-800  text-base font-medium px-2 py-0.5 rounded`}
                            >
                              {item?.comment}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`text-gray-800  text-base font-medium px-2 py-0.5 rounded`}
                            >
                              {item?.product?.title}
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
                              <ViewNote object={item} formattedDate={formattedDate} />
                              <EditNote object={item} />
                              {/* <DeleteNote ID={item.id} /> */}
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

export default NoteTable;
