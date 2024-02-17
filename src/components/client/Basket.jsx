import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImFire } from "react-icons/im";
import {
  useDeleteBasketMutation,
  useGetBasketQuery,
  useIncrementMutation,
} from "../../redux/slice/client/basket";
import BasketCheckout from "./BasktChecout";

const Basket = () => {
  const { data: dataBasket, isSuccess, refetch: refetchData } = useGetBasketQuery();
  const [deleteBasket] = useDeleteBasketMutation();
  const [Increment] = useIncrementMutation();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [user, setUser] = useState()
  const [selectTotal, setSelectTotal] = useState(1);
  const [totalAmount, settotalAmount] = useState(0);

  const deleteFunc = async (id) => {
    try {
      await deleteBasket({ id });
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };
  const token = localStorage.getItem("user");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  useEffect(() => {
    if (isAllSelected !== undefined) {
      axios.get(`basket/change_all_status/?status=${isAllSelected}`, { headers })
        .then(() => {
          refetchData();
        })
        .catch((error) => {
          console.error("Error updating status:", error);
          // Handle error if needed
        });
    }
  }, [isAllSelected]);

  const handleSelectAmount = async (e, value) => {
    const newAmount = e?.target?.value;
    setSelectTotal(newAmount);

    const formData = new FormData();
    formData.append("amount", newAmount);
    formData.append("id", value.id);
    try {
      await Increment(formData).unwrap();
    } catch (error) {
    }
  };

  const increment = async (value) => {
    const formData = new FormData();
    formData.append("amount", value?.amount + 1);
    formData.append("id", value.id);

    try {
      await Increment(formData).unwrap();
    } catch (error) {
      console.error("Error incrementing item:", error);
    }
  };

  const decrement = async (value) => {
    const formData = new FormData();
    formData.append("amount", value.amount - 1);
    formData.append("id", value.id);
    try {
      await Increment(formData).unwrap();
    } catch (error) {
      console.error("Error decrementing item:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Array.isArray(dataBasket?.items)) {
        const total = dataBasket?.items?.reduce(
          (a, b) => a + (b?.total_price?.discount_price || 0) * b.amount,
          0
        );
        settotalAmount(total);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [dataBasket]);

  const selectAll = () => {
    const allUserIds = dataBasket?.items?.map((user) => user?.id);
    setIsAllSelected(!isAllSelected);
    setSelectedUsers(isAllSelected ? [] : allUserIds);
  };

  useEffect(() => {
    selectAll();
  }, [isSuccess]);

  const handleUserSelect = (user) => {
    if (user) {
      axios.get(`basket/${user?.id}/change_status/`, { headers })
        .then(() => {
          refetchData();
        })
    }

    if (selectedUsers?.includes(user?.id)) {
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((id) => console.log(id !== user.id, 'id'))

      );
    } else {
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user.id]);
    }
    setIsAllSelected(selectedUsers.length === dataBasket?.items?.length);

  };
  const isUserSelected = (user) => {
    return selectedUsers?.includes(user.id);
  };

  const isAllUsersSelected = () => {
    return selectedUsers.length === dataBasket?.items?.length;
  };

  return (
    <div className="pt-12">
      <div className="container mx-auto">
        <section className="items-center py-24 bg-gray-50 font-poppins">
          <div className="justify-center flex-1 px-4 py-6 mx-auto max-w-7xl lg:py-4 lg:px-6">
            <div className="mx-auto max-full flex items-center gap-2">
              <input
                id="selectAll"
                name="selectAll"
                type="checkbox"
                checked={isAllSelected}
                onChange={selectAll}
              />
              <label htmlFor="selectAll">Hammasini tanlash</label>
            </div>
            <h2 className="mb-10 text-4xl font-bold text-center text-gray-800">    Savatga olingan maxsulotlar soni: {dataBasket?.items?.length}</h2>
            {dataBasket?.items?.map((value) => (
              <div className="mb-10 lg:px-0" key={value?.id}>
                <div className="relative flex flex-wrap items-center -mx-1 border-b border-gray-200 dark:border-gray-500 xl:justify-between border-opacity-40">
                  <div key={value?.id} className="flex items-center">
                    <input
                      className=""
                      type="checkbox"
                      checked={isUserSelected(value)}
                      onChange={() => handleUserSelect(value)}
                    />
                  </div>
                  <div className="w-full mb-4 md:mb-0 h-96 md:h-44 md:w-56">
                    <img src={value?.product?.image} alt="" className="object-contain w-full h-full" />
                  </div>
                  <div className="w-full px-4 mb-6 md:w-96 xl:mb-0">
                    <h1 className="block text-xl font-medium  text-gray-800" >
                      {value?.product?.title}
                    </h1>
                    <p className="mt-1 text-base text-gray-700">
                      {value.product?.description?.length > 100
                        ? `${value?.product?.description.substring(0, 70)}...`
                        : value?.product?.description}
                    </p>
                    <div className="flex flex-wrap">
                      {value?.product?.discount?.value ? (
                        <div className="flex justify-center">
                          <ImFire className="text-red-700" />
                          <p className="text-base text-gray-700">{value.product.discount.value}%</p>
                        </div>
                      ) : null}
                      <p className="text-sm font-medium text-gray-800">
                        <span>Hajmi:</span>
                        <span className="ml-2 text-gray-800">{value?.product?.amount} {value?.product?.amount_measure}</span>
                      </p>
                    </div>
                  </div>
                  <div className="w-full px-4 mt-6 mb-6 xl:w-auto xl:mb-0 xl:mt-0">
                    <div className="flex items-center">
                      <div className="inline-flex items-center px-4 font-semibold text-gray-800 border border-gray-300 rounded-md">
                        <button onClick={() => decrement(value)} className="py-2 pr-2 border-r border-gray-300 text-gray-800">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"></path>
                          </svg>
                        </button>
                        <input type="number" className="w-16 px-2 py-4 text-center border-0 rounded-md bg-gray-50 text-gray-800" placeholder="1" value={value?.amount} />
                        <button onClick={() => increment(value)} className="py-2 pl-2 border-l border-gray-300 text-gray-800 w-8">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                          </svg>
                        </button>
                        <select className="flex justify-center py-2 pl-2 border-l border-gray-300 text-gray-800" onChange={(e) => handleSelectAmount(e, value)}>
                          <option className="flex justify-center" value="1">1</option>
                          <option className="flex justify-center" value="10">10</option>
                          <option className="flex justify-center" value="20">20</option>
                          <option className="flex justify-center" value="30">30</option>
                          <option className="flex justify-center" value="40">40</option>
                          <option className="flex justify-center" value="50">50</option>
                          <option value="100">100</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="w-full px-4 xl:w-auto">
                    <span className="text-xl font-medium text-blue-500 dark:text-blue-400 ">
                      {value?.product?.discount?.product_discount_price?.toLocaleString ? (
                        <p className="text-sm">
                          {value?.product?.discount?.product_discount_price?.toLocaleString(
                            "uz-UZ"
                          )}
                          so'm
                        </p>
                      ) : null}
                      {value?.total_price?.discount_price?.toLocaleString ? (
                        <p className="text-sm">
                          {value?.total_price?.discount_price?.toLocaleString(
                            "uz-UZ"
                          )}
                          so'm
                        </p>
                      ) : null}


                      {value?.total_price?.discount_price && value?.product?.discount?.product_discount_price ? (
                        <del>
                          {value?.product?.price?.toLocaleString("uz-UZ")} so'm
                        </del>
                      ) : <p>
                        {value?.product?.price?.toLocaleString("uz-UZ")} so'm
                      </p>}

                      {value?.total_price?.discount_price ? (
                        null
                      ) : <p className="text-sm">
                        {value?.total_price?.price?.toLocaleString(
                          "uz-UZ"
                        )}
                        so'm
                      </p>}
                    </span>
                  </div>
                  <button onClick={() => deleteFunc(value?.id)} className="absolute top-0 right-0 text-gray-800 lg:mt-6 lg:-mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-6 h-6 bi bi-x-circle" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            <div className="flex flex-wrap justify-between">

              <div className="w-full lg:w-1/3">
                <div>
                  <h2 className="mb-6 text-3xl font-bold text-gray-800">Cart totals</h2>
                  <div className="flex flex-wrap items-center justify-between px-10 py-4 w-[30rem] mb-3 font-medium leading-8 bg-opacity-50 border text-white bg-gray-800 border-gray-800 rounded-xl">
                    <span>Mahsulotning umimiy narxi</span>
                    <span className="flex items-center text-xl flex-wrap ">
                      <p className="mb-1 text-lg font-bold">
                        {dataBasket?.total_price.price?.toLocaleString("uz-UZ")} so'm
                      </p>
                      <div className="w-4"></div>
                      <del>
                        {dataBasket?.total_price?.discount_price?.toLocaleString("uz-UZ")} so'm

                      </del>
                    </span>
                  </div>

                  <BasketCheckout selectProduct={selectedUsers} />

                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Basket;
