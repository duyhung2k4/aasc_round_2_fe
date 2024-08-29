import React from "react";
import Navbar from "./navbar";

import { useOutlet } from "react-router-dom";

import classes from "./styles.module.css";



const AppLayout: React.FC = () => {
    const outlet = useOutlet();

    return (
        <div className={classes.root}>
            <div className={classes.navbar}>
                <div className={classes.title}>AASC ROUND 2</div>
                <Navbar/>
            </div>
            <div className={classes.content}>
                {outlet}
            </div>
        </div>
    )
}

export default AppLayout;