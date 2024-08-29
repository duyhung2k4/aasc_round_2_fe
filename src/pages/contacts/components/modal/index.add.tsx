import React, { useContext, useState } from "react";

import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { ContactContext, TypeContactContext } from "../..";

import classes from "./styles.module.css";



const ModalAddContact: React.FC = () => {

    const { modal, setModal } = useContext<TypeContactContext>(ContactContext);

    const [contact, setContact] = useState<FormAddContact>({
        NAME: "",
        LAST_NAME: "",
        ADDRESS_REGION: "",
        ADDRESS_PROVINCE: "",
        ADDRESS_CITY: "",
        PHONE: "",
        EMAIL: "",
        WEB: "",
    });

    const handleChange = (field: keyof FormAddContact, value: string) => {
        setContact({ ...contact, [field]: value });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Contact Submitted:', contact);
    };

    return (
        <>
            <Modal
                show={modal.status && modal.type === "contact_add"}
                onHide={() => setModal({ ...modal, status: false })}
            >
                <Modal.Header closeButton={false}>
                    <Modal.Title>Thêm liên hệ</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form id="create_contact" className={classes.form} onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group controlId="formName">
                                    <Form.Label>Tên</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={contact.NAME}
                                        onChange={(e) => handleChange('NAME', e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group controlId="formRegion">
                            <Form.Label>Xã, phường</Form.Label>
                            <Form.Control
                                type="text"
                                value={contact.ADDRESS_REGION}
                                onChange={(e) => handleChange('ADDRESS_REGION', e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formProvince">
                            <Form.Label>Quận, huyện</Form.Label>
                            <Form.Control
                                type="text"
                                value={contact.ADDRESS_PROVINCE}
                                onChange={(e) => handleChange('ADDRESS_PROVINCE', e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formCity">
                            <Form.Label>Tỉnh, thành phố</Form.Label>
                            <Form.Control
                                type="text"
                                value={contact.ADDRESS_CITY}
                                onChange={(e) => handleChange('ADDRESS_CITY', e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPhone">
                            <Form.Label>Điện thoại</Form.Label>
                            <Form.Control
                                type="text"
                                value={contact.PHONE}
                                onChange={(e) => handleChange('PHONE', e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                value={contact.EMAIL}
                                onChange={(e) => handleChange('EMAIL', e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formWeb">
                            <Form.Label>Web</Form.Label>
                            <Form.Control
                                type="text"
                                value={contact.WEB}
                                onChange={(e) => handleChange('WEB', e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={() => setModal({ ...modal, status: false })}>Đóng</Button>
                    <Button type="submit" form="create_contact" variant="primary">Thêm mới</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

type FormAddContact = {
    "NAME": string
    "LAST_NAME": string
    "ADDRESS_REGION": string
    "ADDRESS_PROVINCE": string
    "ADDRESS_CITY": string
    "PHONE": string
    "EMAIL": string
    "WEB": string
}

export default ModalAddContact;