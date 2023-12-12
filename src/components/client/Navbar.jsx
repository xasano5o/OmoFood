import React from "react";
import { Link, NavLink } from "react-router-dom";
import SidebarClient from "./Sidebar";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar bg-light fixed-top shadow">
        <div className="container-fluid container">
          <div className="flex gap-3 items-center">
            {/* <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
            >
              <i className="fa fa-bars"></i>
            </button> */}
            <NavLink className='no-underline' to="/">
              {/* <img src="/FakeShop.png" alt="logo" style={{ height: "50px" }} /> */}
              <h1 className="no-underline ">Omo <b className="text-yellow-600">Food</b></h1>
            </NavLink>
          </div>


          
          <div className="d-flex items-center gap-4">
            <input
              className="form-control"
              list="datalistOptions"
              id="exampleDataList"
              placeholder="Type to search..."
            />
            <Link to={'/basket'} className="no-underline">
              <button className="navbar-toggler" type="button">
                <i className="fa fa-shopping-cart text-black p-1 hover:text-black"></i>
              </button>
            </Link>
          </div>
          <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            {/* <div className="offcanvas-header">
              <NavLink to="/">
                <img
                  src="/FakeShop.png"
                  alt="logo"
                  style={{ height: "50px" }}
                />
              </NavLink>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div> */}
            {/* <SidebarClient/> */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
