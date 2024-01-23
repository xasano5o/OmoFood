import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useGetSearchQuery } from "../../redux/slice/client/search";
import { useGetBasketQuery } from "../../redux/slice/client/basket";
import axios from "axios";
import Sidekatalg, { SidebarWithBurgerMenu } from "./Sidekatalg";
const Navbar = () => {
  const [skip, setSkip] = useState(false);
  const [search, setSearch] = useState("");
  const { data: dataBasket } = useGetBasketQuery();
  const [data, setData] = useState([]);

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
    if (search?.length == 0) setSkip(false);
  }, [search]);

  useEffect(() => {
    if (skip == false) setSearch(null);
  }, [skip]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSkip(false);
  };

  const close = () => {
    setSkip(false);
    setSearch("");
  };
  return (
    <div className="bot">
      <nav className="navbar bg-light fixed-top shadow">
        
        <div className="container-fluid container grid grid-cols-3 ">
      
         <div className="logo flex gap-3 items-center">
            <NavLink className="no-underline text-blue-500" to="/">
              <h1 className="no-underline text-blue-500">
                Omo<b className="text-yellow-600">Food</b>
              </h1>
            </NavLink>
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
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
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
              <div className="transition duration-150 ease-out md:ease-in absolute -z-50 left-0  w-[100%] h-[100vh]">
                {/* <NavLink className="" to={`/product/${product?.id}`}>
                  <button className="btn btn-sm m-3 border-primary">
                    <span className="fa fa-arrow-right text-muted" />
                  </button>
                </NavLink> */}

                <div className="bg-white absolute pt-12  px-6 rounded shadow-lg flex flex-col w-[100%] h-screen overflow-x-auto sx:overflow-y-auto sx:h-[30vh]">
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
