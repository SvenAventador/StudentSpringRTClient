import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";

const Home = () => {
    return (
        <>
            <Header/>
            <main className="wrapper">
                <div className="content">
                    <Outlet/>
                </div>
            </main>
            <Footer/>
        </>
    )
};

export default Home;
