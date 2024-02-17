import React, { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { toast } from "react-toastify";
import { useDeleteProductImgMutation } from "../../../redux/slice/client/getProduct";
import Modal from "../../generic/Modal";

export default function OrderWiew({ items }) {

    const [isOpen, setIsOpen] = useState(false);
    const [deleteProduct, { isLoading }] = useDeleteProductImgMutation();
    const [search, setSearch] = useState("");

    const handleDelete = async (items) => {
        try {
            await deleteProduct({ items });
            toast.success("Maxsulot o'chirildi!");
            setIsOpen(false);
        } catch (err) {
            toast.error("Maxsulot o'chirishda xatolik:", err);
        }
    };
    const [skip, setOpen] = useState(false);
    const onClose = () => setOpen(!skip);
console.log(items,'items');

    return (
        <div>
            <button
                onClick={() => setOpen(!skip)}
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
                <AiOutlineEye className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                Ko'rish
            </button>
            {skip && (
                <Modal closeModal={onClose} actionType="view">
                    <div className=" ">

                        <h5>Mijoz: &nbsp;{items?.user?.first_name}</h5>
                        <h6>Tel: &nbsp;{items?.user?.phone}</h6>
                        <h6>Adres: &nbsp;{items?.delivery?.name}</h6>
                        <h6>Yetkazib berish: &nbsp;{items?.delivery?.price.toLocaleString("ru-Ru")} so'm</h6>

                        <section className="bg-gray-50 dark:bg-white-900 p-3 sm:p-5 antialiased">
                            <div className="mx-auto max-w-screen-3xl  px-1 lg:px-12">
                                <div className="bg-white  dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">

                                    <div className="overflow-x-auto h-[60vh] w-[100%] ">
                                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" className="p-4">
                                                        Mahsulot nomi
                                                    </th>
                                                    <th scope="col" className="p-4">
                                                        Mahsulot soni
                                                    </th>
                                                    <th scope="col" className="p-4">
                                                        Mahsulot miqdor
                                                    </th>
                                                    <th scope="col" className="p-4">
                                                        Mahsulot narxi
                                                    </th>
                                                    <th scope="col" className="p-4">
                                                        Umumiy narx
                                                    </th>

                                                    <th scope="col" className="p-4">
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    items.each_products?.map((item) => {

                                                        return (
                                                            <tr
                                                                className="border-b dark:border-gray-600 hover:bg-gray-100  dark:hover:bg-white-700"
                                                                key={item.id}
                                                            >
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
                                                                        {item?.amount}
                                                                    </span>
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    <span
                                                                        className={`text-gray-800  text-base font-medium px-2 py-0.5 rounded`}
                                                                    >
                                                                        {item?.product?.amount_measure}
                                                                    </span>
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    <span
                                                                        className={`text-gray-800  text-base font-medium px-2 py-0.5 rounded`}
                                                                    >
                                                                        {item?.product?.price.toLocaleString("ru-Ru")} So'm
                                                                    </span>
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    <span
                                                                        className={`text-gray-800  text-base font-medium px-2 py-0.5 rounded`}
                                                                    >
                                                                        {item?.total_price.toLocaleString("ru-Ru")} So'm
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })

                                                }
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </section>
                        <div className="flex justify-end px-4">
   <h6>umumiy narx: {items?.total_price.toLocaleString("ru-Ru")} so'm</h6>
   </div>
                    </div>
                    
                </Modal>
            )}
        </div>
    );
}












{/* <tr>
<th>ID</th>
<th>Mahsulot nomi</th> 
<th>Mahsulot soni</th>
<th>Mahsulot miqdor</th>
<th>Mahsulot narxi</th> 
<th>Umumiy narx</th> 
</tr> */}