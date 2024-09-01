import React, { useContext } from "react";
import Cookies from "js-cookie";

import { ContactContext, TypeContactContext } from "../..";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useDeleteContactMutation } from "@/redux/api/contact";
import { TOKEN_TYPE } from "@/models/variable";
import { useAppSelector } from "@/redux/hook";
import { AppLayoutContext, TypeAppLayoutContext } from "@/layout/app";



const ModalDeleteContact: React.FC = () => {

    const { requisiteContactMap } = useAppSelector(state => state.contactSlice);

    const {
        modal,
        contactSelect,
        setModal,
        setContactSelect,
    } = useContext<TypeContactContext>(ContactContext);

    const { refetchContact, refetchRequisite } = useContext<TypeAppLayoutContext>(AppLayoutContext);

    const [ post, { isLoading } ] = useDeleteContactMutation();

    const handleDelete = async () => {
        const token = Cookies.get(TOKEN_TYPE.ACCESS_TOKEN);
        if(!contactSelect || !token) return;

        await post({
            contact: { 
                id: contactSelect.ID,
                requisiteId: requisiteContactMap[contactSelect.ID].ID
            },
            token
        });

        refetchContact();
        refetchRequisite();
        setModal({
            ...modal,
            status: false,
        });
        setContactSelect(null);
    }

    return (
        <>
            <Modal
                show={modal.status && modal.type === "contact_delete"}
                // onHide={isLoading ? () => { } : () => setModal({ ...modal, status: false })}
            >
                <Modal.Header closeButton={false}>
                    <Modal.Title>Xóa</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Bạn có chắc chắn muốn xóa liên hệ này</p>                    
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="danger"
                        disabled={isLoading}
                        onClick={() => setModal({ ...modal, status: false })}
                    >Đóng</Button>
                    {modal.type !== "contact_detail" && 
                    <Button
                        variant="primary"
                        onClick={handleDelete}
                        disabled={isLoading}
                    >
                        {
                            isLoading ?
                                <Spinner size="sm" style={{ fontSize: 12 }} animation="border" /> :
                                "Xác nhận"
                        }
                    </Button>}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDeleteContact;