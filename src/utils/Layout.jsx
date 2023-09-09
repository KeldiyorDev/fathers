import React from 'react';
import Aside from '../components/Aside';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';

const Layout = ({ children }) => {
    const [showAside, setShowAside] = useState(true)
    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                <Aside showAside={showAside} setShowAside={setShowAside} />

                <div className="layout-page">
                    <Navbar showAside={showAside} setShowAside={setShowAside}/>

                    <div className="content-wrapper">
                        <div className="container-xxl flex-grow-1 container-p-y">
                            {children}
                        </div>

                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout;