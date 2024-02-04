import React from 'react'
import { NavLink } from 'react-router-dom';
import { FaPhone } from "react-icons/fa6";

const Footer = () => {
    return (
        <div>
            <section>
                <footer className="text-center text-white  bg-green-600" >

                    <div className="text-center p-3 flex items-center justify-center gap-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                        <div className="flex items-center gap-1">
                            <FaPhone />  <a className='no-underline text-white' href="tel:+998912420005">+998912420005</a>
                        </div>
                        <NavLink className="text-light text-decoration-none" to="/">
                            OmoFood
                        </NavLink>
              
                    </div>
                    Bizda manzildan manzilgacha buyirtmalarni yetqazib berish hizmati mavjud 
                </footer>
            </section>
        </div>
    )
}

export default Footer;
