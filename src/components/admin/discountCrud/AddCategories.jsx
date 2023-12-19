import React, { useEffect, useState } from 'react';
import { useGetCategoryQuery } from '../../../redux/slice/client/category';
import Modal from '../../generic/Modal';
import { toast } from 'react-toastify';
import { useGetProductQuery } from '../../../redux/slice/client/getProduct';
import { useGetSubCategoryQuery } from '../../../redux/slice/client/subcategory';
import { useCreateDiscountMutation, } from '../../../redux/slice/client/discount';

const AddProduct = ({ object }) => {
  // state
  const [skip, setOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [inputValue, setInputValue] = useState({
    title: '',
    value: '',
    start_date: '',
    end_date: '',
    products_status: '',
    product: '',
    products: [],
    category: [],
    subcategory: [],
  });

  // redux
  const [createDiscount, { isLoading: isCreating }] = useCreateDiscountMutation();
  const { data, isLoading, refetch } = useGetCategoryQuery({ skip });
  const { data: subData } = useGetSubCategoryQuery({ skip })
  const { data: productData } = useGetProductQuery({ skip })



  // fuction
  const onClose = () => {
    setOpen(false);
  };

  const [direction, setDirection] = useState('ALL');
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    if (direction === 'ALL') {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [direction]);

  const handleDirectionChange = (e) => {
    setDirection(e.target.value);
  };

  // post data
  const addData = async () => {
    const formData = new FormData();
    formData.append('title', inputValue.title);
    formData.append('value', inputValue.value);
    formData.append('is_active', isChecked);
    formData.append('start_date', inputValue.start_date);
    formData.append('end_date', inputValue.end_date);
    formData.append('products_status', direction);

    if (direction === 'CUSTOM') {
      if (inputValue.products.length > 0) {
        inputValue.products.forEach(product => {
          formData.append('products', product);
        });
      }
      if (inputValue.category.length > 0) {
        inputValue.category.forEach(category => {
          formData.append('category', category);
        });
      }
      if (inputValue.subcategory.length > 0) {
        inputValue.subcategory.forEach(subcat => {
          formData.append('subcategory', subcat);
        });
      }
    }

    try {
      const response = await createDiscount(formData).unwrap();
      toast.success(`Category '${inputValue.title}' added successfully`);
      // Foydalanuvchi interfeysini yangilash
      setInputValue({ ...inputValue, title: '', products: [], category: [], subcategory: [] });
      setOpen(false);
    } catch (error) {
      toast.error(`Failed to add category '${inputValue.title}'. Error: ${error.message}`);
      console.error('Error creating category:', error);
    }
  };

  const handleSelectionChange = (field, event) => {
    const selectedOptions = event.target.selectedOptions;
    const selectedData = Array.from(selectedOptions).map(option => option.value);
    setInputValue({ ...inputValue, [field]: selectedData });
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        type="button"
        className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        +
        Maxsulot
      </button>
      {skip && (
        <Modal loader={isCreating} closeModal={onClose} addFunc={addData}>

          <form>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label for="Name" className="block mb-2 text-sm font-medium text-gray-900 ">Nomi</label>

                <input type="text" id="Name"
                  onChange={(e) => setInputValue({ ...inputValue, title: e.target.value })}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Chegirma nomi" required />
              </div>

              <div>
                <label for="chegirmamiqdori" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Chegirma miqdori</label>
                <input
                  onChange={(e) => setInputValue({ ...inputValue, value: e.target.value })}

                  type="text" id="chegirmamiqdori" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Chegirma miqdori(%)" required />
              </div>
              <div>
                <label for="boshsana" className="block mb-2 text-sm font-medium text-gray-900 ">Boshlanish sana</label>
                <input
                  onChange={(e) => setInputValue({ ...inputValue, start_date: e.target.value })}
                  type="datetime-local" id="boshsana" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" required />
              </div>
              <div>
                <label for="tugashsana" className="block mb-2 text-sm font-medium text-gray-900 ">Tugash sana</label>
                <input
                  onChange={(e) => setInputValue({ ...inputValue, end_date: e.target.value })}
                  type="datetime-local" id="tugashsana" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" required />
              </div>



              <div>
                <label htmlFor="direction" className="block mb-2 text-sm font-medium text-gray-900">Mahsulot Yunalishi</label>
                <select id="direction" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={handleDirectionChange}>
                  <option value="ALL">Hech biri</option>
                  <option value="ALL">Hammasi</option>
                  <option value="CUSTOM">Tanlanganlar</option>
                </select>
              </div>
              <div className='flex justify-center flex-col gap-1'>
                <label htmlFor="statusCheckbox" className="">Status</label>
                <div>
                  <input
                    type="checkbox"
                    id="statusCheckbox"
                    checked={inputValue.is_active}
                    onChange={handleCheckboxChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="category-select" className="block mb-2 text-sm font-medium text-gray-900">Kategoriya tanlang</label>
                <select
                  id="category-select"
                  multiple
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onChange={(e) => handleSelectionChange('category', e)}
                >
                  {data?.map((value) => (
                    <option key={value?.id} disabled={direction === 'ALL'} value={value.id}>{value.title}</option>
                  ))}
                </select>
              </div>

              {/* Category Select */}
              <div>
                <label htmlFor="subcategory-select" className="block mb-2 text-sm font-medium text-gray-900">Ichki kategoriya tanlang</label>
                <select
                  id="subcategory-select"
                  multiple
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onChange={(e) => handleSelectionChange('subcategory', e)}
                >
                  {subData?.map((value) => (
                    <option key={value.id} disabled={direction === 'ALL'} value={value.slug}>{value.title}</option>
                  ))}
                </select>
              </div>

              {/* Products Select */}
              <div>
                <label htmlFor="products-select" className="block mb-2 text-sm font-medium text-gray-900">Mahsulot tanlash</label>
                <select
                  id="products-select"
                  multiple
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onChange={(e) => handleSelectionChange('products', e)}
                >
                  {productData?.map((value) => (
                    <option key={value.id} disabled={direction === 'ALL'} value={value.id}>{value.title}</option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AddProduct;
