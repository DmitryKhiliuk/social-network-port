import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import {ModalForm} from "./ModalForm";
import {authType, ProfileUserStateType} from "../../common/types/types";

type ModalEditProfileType = {
    profile: ProfileUserStateType
    status: string
    profileStatus: boolean
    message: string[]
    auth: authType
}

export const ModalEditProfile = (props: ModalEditProfileType) => {
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
            {props.auth.id === props.profile.userId &&
            <Button type="primary" onClick={showModal}>Edit Profile</Button>}
            <Modal title="Edit Profile" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <ModalForm
                    profile={props.profile}
                    status={props.status}
                    profileStatus={props.profileStatus}
                    message={props.message}
                />
            </Modal>
        </>
    );
};

