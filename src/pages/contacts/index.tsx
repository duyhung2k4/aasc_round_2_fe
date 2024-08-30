import React, { createContext, useEffect, useMemo, useRef, useState } from "react";
import Cookies from "js-cookie";
import ModalEditContact from "./components/modal/index.edit";
import CardContact from "./components/card";

import { Button } from "react-bootstrap";
import { useListContactQuery } from "@/redux/api/contact";
import { TOKEN_TYPE } from "@/models/variable";
import { ContactModel } from "@/models/contact";

import classes from "./styles.module.css";
import ModalDeleteContact from "./components/modal/index.delete";



const Contact: React.FC = () => {
    const optionRef = useRef<HTMLDivElement>(null);

    const [modal, setModal] = useState<StatusModalContact>({
        type: "contact_add",
        status: false,
    });

    const [contactSelect, setContactSelect] = useState<ContactModel | null>(null);

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

    const contacts = useMemo(() => {
        return data?.data || [];
    }, [data?.data]);



    return (
        <ContactContext.Provider
            value={{
                modal,
                contactSelect,
                setModal,
                setContactSelect,
                refetchContact: refetch,
            }}
        >
            <div className={classes.root}>
                <div ref={optionRef}>
                    <div className={classes.list_btn}>
                        <Button
                            disabled={!contactSelect}
                            onClick={() => openModal("contact_detail")}
                            variant={contactSelect ? "primary" : "secondary"}
                            style={{
                                cursor: contactSelect ? "pointer" : "not-allowed"
                            }}
                        >Chi tiết</Button>
                        <Button onClick={() => openModal("contact_add")} variant="success">Thêm mới</Button>
                        <Button
                            disabled={!contactSelect}
                            onClick={() => openModal("contact_edit")}
                            variant={contactSelect ? "warning" : "secondary"}
                            style={{
                                cursor: contactSelect ? "pointer" : "not-allowed"
                            }}
                        >Chỉnh sửa</Button>
                        <Button
                            disabled={!contactSelect}
                            onClick={() => openModal("contact_delete")}
                            variant={contactSelect ? "danger" : "secondary"}
                            style={{
                                cursor: contactSelect ? "pointer" : "not-allowed"
                            }}
                        >Xóa</Button>
                    </div>
                </div>

                <div
                    style={{
                        height: `calc(100vh - ${optionRef.current?.offsetHeight}px - 8px)`,
                        marginTop: 8,
                        overflow: "scroll"
                    }}
                >
                    {
                        contacts.map(item => <CardContact key={item.ID} {...item} />)
                    }
                </div>
            </div>


            <ModalEditContact />
            <ModalDeleteContact/>
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
    modal: StatusModalContact
    contactSelect: ContactModel | null
    setModal: (value: StatusModalContact) => void
    setContactSelect: (value: ContactModel | null) => void
    refetchContact: () => void
};

export const ContactContext = createContext<TypeContactContext>({
    modal: { type: "contact_add", status: false },
    contactSelect: null,
    setModal: (_) => { },
    setContactSelect: (_) => { },
    refetchContact: () => {},
})

export default Contact;