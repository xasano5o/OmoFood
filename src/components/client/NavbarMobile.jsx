import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useGetBasketQuery } from '../../redux/slice/client/basket';

const NavbarMobile = () => {
  const { data: dataBasket } = useGetBasketQuery();
  return (
    <div className='nav-mobile'>
      <div className="bg-blue-800 h-12 w-full fixed bottom-0 left-0 z-50">
        <div className="grid h-full max-w-lg grid-cols-2 mx-auto container font-medium">
          <Link className="no-underline text-blue-500 mt-2" to="/">
            {/* <img src="/FakeShop.png" alt="logo" style={{ height: "50px" }} /> */}
            <h1 className="no-underline text-blue-500">
              Omo<b className="text-yellow-600">Food</b>
            </h1>
          </Link>
          <div className="">
            <Link
              to={"/basket"}
              className="no-underline text-xl flex flex-col -mt-3 items-center "
            >
              <h5 className='text-yellow-600'>{dataBasket?.items?.length}</h5>
              <button className="navbar-toggler left-0" type="button">
                <i className="fa fa-shopping-cart text-white "></i>
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default NavbarMobile
