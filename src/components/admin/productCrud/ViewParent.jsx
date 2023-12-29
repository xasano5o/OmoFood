import React, { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";
import { useDeleteProductImgMutation } from "../../../redux/slice/client/getProduct";
import Modal from "../../generic/Modal";

export default function View({ object }) {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(!isOpen);
  const [deleteProduct, { isLoading }] = useDeleteProductImgMutation();

  const handleDelete = async (object) => {
    console.log(object);
    try {
      await deleteProduct({ object });
      toast.success("Maxsulot o'chirildi!");
      setIsOpen(false);
    } catch (err) {
      toast.error("Maxsulot o'chirishda xatolik:", err);
    }
  };
  const [skip, setOpen] = useState(false);
  const onClose = () => setOpen(!skip);
  // object?.images.map((value) => {
  //   console.log( value.id,'sss');
  //   });
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
          <div className="w-[80vw] p-4">
            <div className="flex flex-wrap w-full h-full md:items-stretch md:flex-row sm:flex-col sm:items-center sx:flex-col">
              <div className="md:w-[50%] sm:w-full sx:w-full p-2 h-full">
                <div className="grid grid-cols-2 h-[32vh] overflow-y-auto bg-white rounded-lg gap-2 shadow-lg border p-4">
                  {object?.images?.length > 0 ? (
                    object?.images?.map((value) => {
                      return (
                        <div className="containers object-contain">
                          <div className="overlay  text-end pb-2  ">
                            <button
                              onClick={() => setIsOpen(!isOpen)}
                              type="button"
                              className="text inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              <BsTrash className="" aria-hidden="true" />
                            </button>
                            {isOpen && (
                              <Modal
                                addFunc={() => handleDelete(value?.id)}
                                closeModal={closeModal}
                                loader={isLoading}
                                actionType={"delete"}
                              >
                                <img src={value?.image} className="w-[300px] h-[200px] object-cover" alt="" />
                                <div className="py-5 px-10">
                                  <h1 className="text-2xl font-bold text-red-600">
                                    Malumotni o'chirishga rozimisiz !!!
                                  </h1>
                                </div>
                              </Modal>
                            )}
                          </div>
                          <img
                            className="image shadow border w-[300px] h-[150px] object-cover border-black"
                            src={value?.image}
                            alt=""
                          />

                        </div>
                      );
                    })
                  ) : (
                    <p className="text-gray-800">Maxsulot Rasmlari yuq</p>
                  )}
                </div>
              </div>
              <div className="md:w-[50%] sm:w-full sx:w-full p-2 h-full">
                <div className="bg-white rounded-lg shadow-lg border p-4 text-gray-800   ">
                  <h2 className="text-xl mb-2">Barcha malumotlar</h2>
                  <p>
                    <strong>Maxsulot nomi:</strong> {object?.title}
                  </p>
                  <p>
                    <strong>Kategoriyasi:</strong>{object?.category?.title}
                  </p>
                  <p>
                    <strong>Narxi:</strong> {object?.price}
                  </p>
                  <p>
                    <strong>Qo'shilgan Vaqti:</strong> {object?.created_date}
                  </p>
                  <p>
                    <strong>Miqdori:</strong> {object?.amount}
                  </p>
                  <p>
                    <strong>O'lchovi:</strong>{" "}
                    {object?.amount_measure || "Hali belgilanmadi"}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h1 className="text-black">description</h1>
              <p className="text-muted whitespace-pre-wrap text-black break-words">
                {object?.description}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
