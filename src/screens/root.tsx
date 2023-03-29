import {Outlet} from "react-router-dom";
import {AppHeader} from "../components/app-header";
import React from "react";

export function Root() {
    return (
        <>
            <AppHeader/>
            <Outlet/>
        </>
    );
}