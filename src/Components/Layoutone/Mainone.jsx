import React from 'react';
import { Outlet, useLocation } from "react-router-dom";
import Nav from "../Nav/Nav";

const Mainone = () => {
    const location = useLocation();
    const hideNavPaths = ['/','/aboutUs']; // Add any paths here where you don't want the Nav to be shown

    return (
        <div>
            {!hideNavPaths.includes(location.pathname) && <Nav />}
            <Outlet />
        </div>
    );
};

export default Mainone;
