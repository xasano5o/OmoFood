import React from "react";
import { useGetCategoryQuery } from "../../redux/slice/client/category";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa6";

export default function DeskModal() {
    const { data, isLoading } = useGetCategoryQuery();

    const navigate = useNavigate();
    const [showModal, setShowModal] = React.useState(false);

    return (
        <>
            <button
                className="hidden md:block text-gray-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none ease-linear transition-all duration-150 hover:text-gray-800"
                type="button"
                onClick={() => setShowModal(true)}
            >
                <FaBars className="text-2xl" />
            </button>
            {showModal ? (
                <>
                    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-auto">
                        <div className="border rounded-lg shadow-lg relative flex flex-col w-full h-full bg-white outline-none focus:outline-none">
                            <div className="flex items-center justify-end">

                            </div>
                            <div className="p-6 flex-auto">

                                <div className="flex justify-between">
                                    <h1 className="text-2xl font-bold mb-4">Turkumlar</h1>
                                    <button className="text-2xl font-bold mb-4 text-red-800" onClick={() => setShowModal(false)} >X</button>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {data?.map((item) => (
                                        <Link
                                            className="flex items-center gap-2 p-2 border rounded transition duration-300 no-underline hover:bg-gray-100"
                                            to={`/categories/${item.id}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate(`/categories/${item.id}`);
                                                setShowModal(false)
                                            }}
                                            key={item.id}
                                        >
                                            <img src={item?.image} alt="" className="w-12 h-12 rounded-full" />
                                            <p className="text-gray-800">{item?.title}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}
