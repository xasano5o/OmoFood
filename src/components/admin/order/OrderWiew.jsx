import React, { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import Modal from "../../generic/Modal";
import jsPDF from "jspdf";

export default function OrderWiew({ items }) {
    const [skip, setOpen] = useState(false);

    const onClose = () => setOpen(!skip);

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text("Customer: " + items?.user?.first_name, 20, 20);
        doc.text("Phone: " + items?.user?.phone, 20, 30);
        doc.text("Address: " + items?.delivery?.name, 20, 40);
        doc.text("Delivery Price: " + items?.delivery?.price.toLocaleString("ru-Ru") + " so'm", 20, 50);

        let y = 70;
        items.each_products?.forEach(item => {
            doc.text("Product Title: " + item?.product?.title, 20, y);
            doc.text("Amount: " + item?.amount, 20, y + 10);
            doc.text("Amount Measure: " + item?.product?.amount_measure, 20, y + 20);
            doc.text("Price: " + item?.product?.price.toLocaleString("ru-Ru") + " So'm", 20, y + 30);
            doc.text("Total Price: " + item?.total_price.toLocaleString("ru-Ru") + " So'm", 20, y + 40);
            y += 60; // Adjust the y-coordinate for the next product details
        });

        doc.text("Total Price: " + items?.total_price.toLocaleString("ru-Ru") + " So'm", 20, y + 20);

        doc.save("order_details.pdf"); // Save the PDF with name 'order_details.pdf'
    };

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
                        <h5>Customer: &nbsp;{items?.user?.first_name}</h5>
                        <h6>Phone: &nbsp;{items?.user?.phone}</h6>
                        <h6>Address: &nbsp;{items?.delivery?.name}</h6>
                        <h6>Delivery Price: &nbsp;{items?.delivery?.price.toLocaleString("ru-Ru")} so'm</h6>

                        <section className="bg-gray-50 dark:bg-white-900 p-3 sm:p-5 antialiased">
                            <div className="mx-auto max-w-screen-3xl px-1 lg:px-12">
                                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                                    <div className="overflow-x-auto h-[60vh] w-[100%]">
                                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" className="p-4">
                                                        Product Name
                                                    </th>
                                                    <th scope="col" className="p-4">
                                                        Product Quantity
                                                    </th>
                                                    <th scope="col" className="p-4">
                                                        Product Amount Measure
                                                    </th>
                                                    <th scope="col" className="p-4">
                                                        Product Price
                                                    </th>
                                                    <th scope="col" className="p-4">
                                                        Total Price
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {items.each_products?.map((item, index) => (
                                                    <tr
                                                        key={index}
                                                        className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-white-700"
                                                    >
                                                        <td className="px-4 py-3">
                                                            <span className="text-gray-800 text-base font-medium px-2 py-0.5 rounded">
                                                                {item?.product?.title}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <span className="text-gray-800 text-base font-medium px-2 py-0.5 rounded">
                                                                {item?.amount}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <span className="text-gray-800 text-base font-medium px-2 py-0.5 rounded">
                                                                {item?.product?.amount_measure}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <span className="text-gray-800 text-base font-medium px-2 py-0.5 rounded">
                                                                {item?.product?.price.toLocaleString("ru-Ru")} So'm
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <span className="text-gray-800 text-base font-medium px-2 py-0.5 rounded">
                                                                {item?.total_price.toLocaleString("ru-Ru")} So'm
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className="flex justify-end px-4">
                            <h6>Total Price: {items?.total_price.toLocaleString("ru-Ru")} so'm</h6>
                        </div>
                    </div>
                    <button className="bg-blue-500 text-white" onClick={generatePDF}>
                        pdf 
                    </button>
                </Modal>
            )}
        </div>
    );
}
