import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BiWorld } from "react-icons/bi";

function Aside() {
    const { pathname } = useLocation()

    console.log(pathname);
    return (
        <aside className="menu-vertical menu bg-menu-theme">
            <div className="app-brand demo" style={{ height: "130px", display: "flex", justifyContent: "center" }}>
                {/* <Link to="/" className="app-brand-link">
                    <img src="../assets/img/logo.png" alt="Logo" height={"180px"} />

                </Link> */}
                <h1>Logo</h1>

                <a href="/" className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
                    <i className="bx bx-chevron-left bx-sm align-middle"></i>
                </a>
            </div>

            <div className="menu-inner-shadow"></div>

            <ul className="menu-inner py-1">
                <li className={`my-1 menu-item ${pathname === "/unread" && "active"}`}>
                    <Link to="/unread" className="menu-link">
                        <BiWorld fontSize={"18px"} className='me-2' />
                        <div data-i18n="Analytics">O'qilmagan postlar</div>
                    </Link>
                </li>

                <li className={`my-1 menu-item ${pathname === "/posts" && "active"}`}>
                    <Link to="/posts" className="menu-link">
                        <BiWorld fontSize={"18px"} className='me-2' />
                        <div data-i18n="Analytics">Postlar</div>
                    </Link>
                </li>

                <li className={`my-1 menu-item ${pathname === "/schools" && "active"}`}>
                    <Link to="/schools" className="menu-link">
                        <BiWorld fontSize={"18px"} className='me-2' />
                        <div data-i18n="Analytics">Maktablar</div>
                    </Link>
                </li>

                <li className={`my-1 menu-item ${pathname === "/category" && "active"}`}>
                    <Link to="/category" className="menu-link">
                        <BiWorld fontSize={"18px"} className='me-2' />
                        <div data-i18n="Analytics">Kategoriyalar</div>
                    </Link>
                </li>

                <li className={`my-1 menu-item ${pathname === "/classes" && "active"}`}>
                    <Link to="/classes" className="menu-link">
                        <BiWorld fontSize={"18px"} className='me-2' />
                        <div data-i18n="Analytics">Sinflar</div>
                    </Link>
                </li>

                <li className={`my-1 menu-item ${pathname === "/rating" && "active"}`}>
                    <Link to="/rating" className="menu-link">
                        <BiWorld fontSize={"18px"} className='me-2' />
                        <div data-i18n="Analytics">Reyting</div>
                    </Link>
                </li>

                <li className={`my-1 menu-item ${pathname === "/student" && "active"}`}>
                    <Link to="/student" className="menu-link">
                        <BiWorld fontSize={"18px"} className='me-2' />
                        <div data-i18n="Analytics">O'quvchilar</div>
                    </Link>
                </li>

            </ul>
        </aside>
    )
}

export default Aside