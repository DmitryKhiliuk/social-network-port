import React, {useState} from 'react';
import {Button, Form, Input} from 'antd';
import {saveProfileTC} from "../../features/Profile/profile-reducer";
import {useAppDispatch} from "../../app/store";
import {ContactsProfileStateType, ProfileUserStateType} from "../../common/types/types";

type ContactFormType = {
    callBackForm: (values: any) => void
    profile: ProfileUserStateType
}

export const ContactForm = (props:ContactFormType) => {

    const dispatch = useAppDispatch()

    const {facebook, github, instagram, mainLink, twitter, vk, website, youtube} = props.profile.contacts

    const onFinish = (values: any) => {
        props.callBackForm(values)

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item label="Facebook" name="facebook" initialValue={facebook}>
                <Input />
            </Form.Item>

            <Form.Item label="Git" name="github" initialValue={github}>
                <Input />
            </Form.Item>

            <Form.Item label="Instagram" name="instagram" initialValue={instagram}>
                <Input />
            </Form.Item>

            <Form.Item label="MainLink" name="mainLink" initialValue={mainLink}>
                <Input />
            </Form.Item>

            <Form.Item label="Twitter" name="twitter" initialValue={twitter}>
                <Input />
            </Form.Item>

            <Form.Item label="VK" name="vk" initialValue={vk}>
                <Input />
            </Form.Item>

            <Form.Item label="Website" name="website" initialValue={website}>
                <Input />
            </Form.Item>

            <Form.Item label="YouTube" name="youtube" initialValue={youtube}>
                <Input />
            </Form.Item>


            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Save Contacts
                </Button>
            </Form.Item>
        </Form>
    );
};



