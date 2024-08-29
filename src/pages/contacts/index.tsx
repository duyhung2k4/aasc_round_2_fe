import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import ModalAddContact from "./components/modal/index.add";

import { Button } from "react-bootstrap";
import { useListContactQuery } from "@/redux/api/contact";
import { TOKEN_TYPE } from "@/models/variable";

import classes from "./styles.module.css";



const Contact: React.FC = () => {
    const [modal, setModal] = useState<StatusModalContact>({
        type: "contact_add",
        status: false,
    });

    const {
        data,
        refetch,
    } = useListContactQuery(Cookies.get(TOKEN_TYPE.ACCESS_TOKEN) || "");

    useEffect(() => {
        refetch();
    }, []);

    const openModal = (type: TYPE_MODAL_CONTACT) => {
        setModal({
            status: true,
            type,
        });
    }

    return (
        <ContactContext.Provider
            value={{
                modal,
                setModal,
            }}
        >
            <div className={classes.root}>
                <div className={classes.list_btn}>
                    <Button onClick={() => openModal("contact_detail")} variant="primary">Chi tiết</Button>
                    <Button onClick={() => openModal("contact_add")} variant="success">Thêm mới</Button>
                    <Button onClick={() => openModal("contact_edit")} variant="warning">Chỉnh sửa</Button>
                    <Button onClick={() => openModal("contact_delete")} variant="danger">Xóa</Button>
                </div>
            </div>

            <ModalAddContact />
        </ContactContext.Provider>
    )
}

export type StatusModalContact = {
    type: TYPE_MODAL_CONTACT
    status: boolean
}
export type TYPE_MODAL_CONTACT = 
    | "contact_detail" 
    | "contact_add" 
    | "contact_edit" 
    | "contact_delete";

export type TypeContactContext = {
    modal: StatusModalContact,
    setModal: (value: StatusModalContact) => void
};

export const ContactContext = createContext<TypeContactContext>({
    modal: { type: "contact_add", status: false },
    setModal: (_) => { },
})

export default Contact;