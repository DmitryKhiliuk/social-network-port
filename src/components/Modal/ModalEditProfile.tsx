import React, {useState} from 'react';
import {Button, Modal} from 'antd';
import {ModalForm} from "./ModalForm";
import {useAppSelector} from "../../app/store";

export const ModalEditProfile = () => {

    const auth = useAppSelector(state => state.auth)
    const profile = useAppSelector(state => state.profile.profile)

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {auth.id === profile.userId &&
            <Button type="primary" onClick={showModal}>Edit Profile</Button>}
            <Modal title="Edit Profile" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <ModalForm />
            </Modal>
        </>
    );
};

