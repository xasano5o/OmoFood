import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useGetBasketQuery } from '../../redux/slice/client/basket';
import Modal from './Modal';
import Logo from "../../assest/photo1705589004.jpeg"
import { TiShoppingCart } from "react-icons/ti";
import { FaChevronLeft } from 'react-icons/fa6';
const NavbarMobile = () => {
  const { data: dataBasket } = useGetBasketQuery();
  const navigate = useNavigate()

  const minusPage = () => {
    navigate(-1)
  }
  return (
    <div className='nav-mobile'>
      <div className="bg-green-600 h-12 w-full fixed bottom-0 left-0 z-50">
        <div className="grid h-full max-w-lg grid-cols-4 mx-auto container font-medium">
          <Link className="no-underline text-blue-500 mt-2" to="/">
            {/* <img src="/FakeShop.png" alt="logo" style={{ height: "50px" }} /> */}
            {/* <h1 className="no-underline text-blue-500">
              Omo<b className="text-yellow-600">Food</b>
            </h1> */}
            <img className='w-[40px] rounded-full' src={Logo} alt="" />
          </Link>
          <NavLink className={"md:hidden block "} onClick={() => minusPage()}>
            <FaChevronLeft className='text-2xl mt-3' />
          </NavLink>
            <Link
              to={"/basket"}
              className="no-underline text-2xl flex gap-2 justify-center  items-center "
              >
              <button className="navbar-toggler left-0" type="button">
              {/* <i className=" font text-3xl  fa fa-shopping-cart text-white "></i> */}

              <TiShoppingCart className=' text-5xl text-red-900'/>
  
              </button>
  
              <h5 className=' text-3xl text-yellow-600'>{dataBasket?.items?.length}</h5>

            </Link>
            
              <Modal/>
        </div>

      </div>
    </div>
  )
}

export default NavbarMobile
