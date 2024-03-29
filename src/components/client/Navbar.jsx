import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useGetBasketQuery } from "../../redux/slice/client/basket";
import Logo from "../../assest/photo1705589004.jpeg"
import { FaChevronLeft } from "react-icons/fa6";

import axios from "axios";
import DeskModal from "./DeskModal";
const Navbar = () => {
  const [skip, setSkip] = useState(false);
  const [search, setSearch] = useState("");
  const { data: dataBasket } = useGetBasketQuery();
  const [data, setData] = useState([]);
  const navigate = useNavigate()
  // Debounce function
  const token = localStorage.getItem("user");
  useEffect(() => {
    let debounceTimer = setTimeout(() => {
      if (search?.length > 0) {
        axios
          .get(`search/?query=${search}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => setData(response.data));
      }
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [search]);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    setSkip(true);
  };
  useEffect(() => {
    if (search?.length === 0) setSkip(false);
  }, [search]);

  useEffect(() => {
    if (skip === false) setSearch(null);
  }, [skip]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSkip(false);
  };

  const close = () => {
    setSkip(false);
    setSearch("");
  };
  const minusPage = () => {
    navigate(-1)
  }
  return (
    <div className="bot">
      <nav className="navbar bg-light flex flex-col gap-1  shadow">
        <div className="  container-fluid ">
          <NavLink className="no-underline text-blue-500" to="/">
            <img className="logo  w-[70px] rounded-full" src={Logo} alt="" />
          </NavLink>
          <DeskModal />
          <NavLink className={"md:block hidden"} onClick={() => minusPage()}>
            <FaChevronLeft />
          </NavLink>
          <div className="logo flex gap-3 items-center">
          </div>
          <div>
            <div className="">
              <form onSubmit={handleSubmit}>
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute  inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    onChange={handleInputChange}
                    type="search"
                    id="default-search"
                    className="px-5 w-[350px] p-3 ps-10 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Mahsulod qidirish...."
                    required
                  />
                  <button
                    type="submit"
                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
            {skip && (
              <div className="  bg-red-400 transition duration-150 ease-out md:ease-in absolute z-50 left-0  w-[100%] h-[100vh]">
                <div className="  z-100 bg-white  pt-12  px-6 rounded shadow-lg flex flex-col w-[100%] h-screen overflow-x-auto sx:overflow-y-auto sx:h-[30vh]">
                  {data?.result?.categories?.map((value) => {
                    return (
                      <div>
                        <NavLink
                          className={"no-underline"}
                          to={`/categories/${value?.id}`}
                        >
                          <p className="flex container  md:ml-0 items-center gap-2 cursor-pointer ">
                            <span>
                              {" "}
                              <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                              </svg>
                            </span>{" "}
                            {value?.title}
                          </p>
                        </NavLink>
                      </div>
                    );
                  })}
                  {data?.result?.products?.map((value, index) => {
                    return (
                      <div key={index + 1}>
                        <NavLink
                          className="no-underline"
                          to={`/product/${value?.id}`}
                        >
                          <p className="container flex items-center ml-12  md:ml-0 gap-2 cursor-pointer">
                            <span>
                              {" "}
                              <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                              </svg>
                            </span>{" "}
                            {value?.title}
                          </p>
                        </NavLink>
                      </div>
                    );
                  })}

                  {data?.result?.subcategories?.map((value) => {
                    return (
                      <div>
                        <NavLink
                          className="no-underline"
                          to={`/product/${value?.id}`}
                        >
                          <p className="container flex items-center ml-12  md:ml-0 gap-2 cursor-pointer">
                            <span>
                              {" "}
                              <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                              </svg>
                            </span>{" "}
                            {value?.title}
                          </p>
                        </NavLink>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="basket">
            <Link
              to={"/basket"}
              className="no-underline  flex flex-col items-center "
            >
              <h5>{dataBasket?.items?.length}</h5>
              <button className="navbar-toggler left-0" type="bu  tton">
                <i className="fa fa-shopping-cart text-black  hover:text-black"></i>
              </button>
            </Link>
          </div>

        </div>
      </nav>
    </div>
  );
};

export default Navbar;
