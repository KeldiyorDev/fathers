import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BiSolidCategory, BiWorld } from "react-icons/bi";
import { IoMdMailUnread } from "react-icons/io";
import { MdMarkunread, MdSchool } from "react-icons/md";
import { FaSchool } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { BsPostcardFill } from 'react-icons/bs';
import styled from 'styled-components';

function Aside({ showAside, setShowAside }) {
    const { pathname } = useLocation()
    console.log(JSON.parse(localStorage.getItem("user")));
    const user = JSON.parse(localStorage.getItem("user"))

    console.log(pathname);
    return (
        <Wrapper>
            {
                showAside && (
                    <aside className="menu-vertical menu bg-menu-theme">
                        <div className="app-brand demo" style={{ height: "130px", display: "flex", justifyContent: "center", flexDirection: "column" }}>
                            <img src="../assets/img/logo3.png" alt="Logo" height={"80px"} />
                            <h3>EduReyting</h3>

                            <div className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
                                <i className="bx bx-chevron-left bx-sm align-middle" onClick={() => setShowAside(!showAside)}></i>
                            </div>
                        </div>

                        <div className="menu-inner-shadow"></div>

                        <ul className="menu-inner py-1">
                            {
                                user?.role === "admin" && (
                                    <li className={`my-1 menu-item ${pathname === "/category" && "active"}`}>
                                        <Link to="/category" className="menu-link">
                                            <BiSolidCategory fontSize={"18px"} className='me-2' />
                                            <div data-i18n="Analytics">Baholash me`zonlari</div>
                                        </Link>
                                    </li>
                                )}

                            {
                                user?.role === "admin" && (
                                    <li className={`my-1 menu-item ${pathname === "/schools" && "active"}`}>
                                        <Link to="/schools" className="menu-link">
                                            <FaSchool fontSize={"18px"} className='me-2' />
                                            <div data-i18n="Analytics">Maktablar</div>
                                        </Link>
                                    </li>
                                )}

                            {
                                user?.role === "director" && (
                                    <li className={`my-1 menu-item ${pathname === "/classes" && "active"}`}>
                                        <Link to="/classes" className="menu-link">
                                            <MdSchool fontSize={"18px"} className='me-2' />
                                            <div data-i18n="Analytics">Sinflar</div>
                                        </Link>
                                    </li>
                                )}

                            {
                                user?.role === "classleader" && (
                                    <li className={`my-1 menu-item ${pathname === "/student" && "active"}`}>
                                        <Link to="/student" className="menu-link">
                                            <PiStudentFill fontSize={"18px"} className='me-2' />
                                            <div data-i18n="Analytics">O'quvchilar</div>
                                        </Link>
                                    </li>
                                )}

                            {
                                (user?.role === "director") && (
                                    <li className={`my-1 menu-item ${pathname === "/unread" && "active"}`}>
                                        <Link to="/unread" className="menu-link">
                                            <IoMdMailUnread fontSize={"18px"} className='me-2' />
                                            <div data-i18n="Analytics">O'qilmagan postlar</div>
                                        </Link>
                                    </li>
                                )
                            }

                            {
                                (user?.role === "admin") && (
                                    <li className={`my-1 menu-item ${pathname === "/admin-unread" && "active"}`}>
                                        <Link to="/admin-unread" className="menu-link">
                                            <IoMdMailUnread fontSize={"18px"} className='me-2' />
                                            <div data-i18n="Analytics">O'qilmagan postlar</div>
                                        </Link>
                                    </li>
                                )
                            }

                            {
                                (user?.role === "admin") && (
                                    <li className={`my-1 menu-item ${pathname === "/posts" && "active"}`}>
                                        <Link to="/posts" className="menu-link">
                                            <MdMarkunread fontSize={"18px"} className='me-2' />
                                            <div data-i18n="Analytics">Barcha postlar</div>
                                        </Link>
                                    </li>
                                )}

                            {
                                (user?.role === "director") && (
                                    <li className={`my-1 menu-item ${pathname === "/director-posts" && "active"}`}>
                                        <Link to="/director-posts" className="menu-link">
                                            <MdMarkunread fontSize={"18px"} className='me-2' />
                                            <div data-i18n="Analytics">Barcha postlar</div>
                                        </Link>
                                    </li>
                                )}

                            {
                                user?.role === "classleader" && (
                                    <li className={`my-1 menu-item ${pathname === "/class-posts" && "active"}`}>
                                        <Link to="/class-posts" className="menu-link">
                                            <MdMarkunread fontSize={"18px"} className='me-2' />
                                            <div data-i18n="Analytics">Postlar</div>
                                        </Link>
                                    </li>
                                )}

                        </ul>
                    </aside>
                )
            }
        </Wrapper>
    )
}

export default Aside

const Wrapper = styled.div`
    .menu-vertical {
        height: 100%;
    }


    @media(max-width: 992px) {
        .menu-vertical {
            z-index: 9999;
            position: fixed;
        }
    }
`