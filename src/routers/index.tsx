import React, { Suspense } from "react";
import ProtectedLayout from "@/layout/protected";
import AppLayout from "@/layout/app";

import { ROUTER_APP } from "@/constants/router";
import { Route, Routes } from "react-router-dom";
import { PageContact, PageLogin, PageRequisite } from "./page";



const AppRouter: React.FC = () => {
    return (
        <Suspense fallback={"Loading..."}>
            <Routes>
                <Route element={<ProtectedLayout />}>
                    <Route path={ROUTER_APP.LOGIN.href} element={<PageLogin />} />
                    <Route element={<AppLayout/>}>
                        <Route path={ROUTER_APP.HOME.href} element={<PageContact />} />
                        <Route path={ROUTER_APP.CONTACT.href} element={<PageContact />} />
                        <Route path={ROUTER_APP.REQUISITE.href} element={<PageRequisite/>}/>
                    </Route>
                </Route>
            </Routes>
        </Suspense>
    )
}

export default AppRouter;