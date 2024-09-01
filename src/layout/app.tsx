import React, { createContext, useEffect } from "react";
import Navbar from "./navbar";

import { useOutlet } from "react-router-dom";

import classes from "./styles.module.css";
import { TOKEN_TYPE } from "@/models/variable";
import Cookies from "js-cookie";
import { useListContactQuery } from "@/redux/api/contact";
import { useListRequisiteQuery } from "@/redux/api/requisite";



const AppLayout: React.FC = () => {
    const outlet = useOutlet();

    const {
        refetch: refetchContact,
    } = useListContactQuery(Cookies.get(TOKEN_TYPE.ACCESS_TOKEN) || "");
    const {
        refetch: refetchRequisite,
    } = useListRequisiteQuery(Cookies.get(TOKEN_TYPE.ACCESS_TOKEN) || "");

    useEffect(() => {
        refetchContact();
        refetchRequisite();
    }, []);

    return (
        <AppLayoutContext.Provider
            value={{
                refetchRequisite,
                refetchContact,
            }}
        >
            <div className={classes.root}>
                <div className={classes.navbar}>
                    <div className={classes.title}>AASC ROUND 2</div>
                    <Navbar />
                </div>
                <div className={classes.content}>
                    {outlet}
                </div>
            </div>
        </AppLayoutContext.Provider>
    )
}

export type TypeAppLayoutContext = {
    refetchRequisite: () => void
    refetchContact: () => void
}

export const AppLayoutContext = createContext<TypeAppLayoutContext>({
    refetchRequisite: () => { },
    refetchContact: () => { },
})

export default AppLayout;