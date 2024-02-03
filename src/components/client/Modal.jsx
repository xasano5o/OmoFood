import React from "react";
import { useGetCategoryQuery } from "../../redux/slice/client/category";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa6";

export default function Modal() {
    const { data, isLoading } = useGetCategoryQuery();

    const navigate = useNavigate();
    const [showModal, setShowModal] = React.useState(false);
    return (
        <>
            <button
                className="block md:hidden text-white  font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
            >
                <FaBars className="text-2xl" />
            </button>
            {showModal ? (
                <>
                    <div
                        className="h-full justify-center items-center flex  overflow-x-auto fixed inset-0 z-50 outline-none focus:outline-none w-full "
                    >
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full h-full bg-white outline-none focus:outline-none">
                            <div className="relative p-6 flex-auto">
                                <h1>Turkumlar</h1>
                                <div className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                    {data?.map((item) => (
                                        <Link
                                            to={`/categories/${item.id}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate(`/categories/${item.id}`);
                                            }}>
                                            <p>  {item?.title}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                >
                                    Yopish
                                </button>

                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}