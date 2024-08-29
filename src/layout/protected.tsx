import Cookies from "js-cookie";
import React, { useEffect } from "react";

import { ROUTER_APP } from "@/constants/router";
import { TOKEN_TYPE } from "@/models/variable";
import { useNavigate, useOutlet } from "react-router-dom";



const ProtectedLayout: React.FC = () => {
    const outlet = useOutlet();

    const navigation = useNavigate();

    useEffect(() => {  
        handleReload();
    }, []);
    
    const handleReload = async () => {
        const app_id = Cookies.get(TOKEN_TYPE.APP_ID);
        const token = Cookies.get(TOKEN_TYPE.ACCESS_TOKEN);
    
        if(!app_id || !token) {
            navigation(ROUTER_APP.LOGIN.href);
            return;
        }
    }

    return (
        <>{outlet}</>
    )
}

export default ProtectedLayout;