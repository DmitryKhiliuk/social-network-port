import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Typography} from 'antd';
import {saveProfileTC} from "../../features/Profile/profile-reducer";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {ContactsProfileStateType, ProfileUserStateType} from "../../common/types/types";
import {CheckOutlined} from "@ant-design/icons";

type ContactFormType = {
    callBackForm: (values: any) => void
}

export const ContactForm = (props:ContactFormType) => {

    const profileStatus = useAppSelector(state => state.profile.updateProfileStatus)
    const message = useAppSelector(state => state.profile.message)
    const profile = useAppSelector(state => state.profile.profile)

    const {facebook, github, instagram, mainLink, twitter, vk, website, youtube} = profile.contacts
    const [success, setSuccess] = useState(false)

    const onFinish = (values: any) => {
        props.callBackForm(values)
        setSuccess(true)
    };

    const onFocusHandler = () => {
        setSuccess(false)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                onFocus={onFocusHandler}
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
                    {success && profileStatus ?
                        <Button type="primary" shape="round" icon={<CheckOutlined />} size={'middle'} style={{backgroundColor: 'green', border: 'green'}}/>:
                        <Button type="primary" htmlType="submit">
                            Save Contacts
                        </Button>
                    }
                </Form.Item>
            </Form>
            <div style={{border: 'red', color: 'red'}}>
                <Typography style={{color: 'red'}}>{message.map(el => {
                    return <li>{el}</li>
                })}</Typography>
            </div>
        </>

    );
};



