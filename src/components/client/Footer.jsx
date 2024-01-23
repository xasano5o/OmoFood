import React from 'react'
import { NavLink } from 'react-router-dom';
import { FaPhone } from "react-icons/fa6";

const Footer = () => {
    return (
        <div>
            <section>
                <footer className="text-center text-white" style={{ backgroundColor: "#0a4275" }}>

                    <div className="text-center p-3 flex items-center justify-center gap-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                        <div className="flex items-center gap-1">
                            <FaPhone />  +998913600506
                        </div>
                        <NavLink className="text-light text-decoration-none" to="/">
                            OmoFood
                        </NavLink>
                    </div>
                </footer>
            </section>
        </div>
    )
}

export default Footer;
