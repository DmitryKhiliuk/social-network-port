import {Button, Checkbox, Form, Input} from 'antd';
import React, {useEffect, useState} from 'react';
import TextArea from "antd/es/input/TextArea";
import {ProfileUserStateType} from "../../common/types/types";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {savePhotoTC, saveProfileTC} from "../../features/Profile/profile-reducer";
import {CheckOutlined, EditOutlined} from "@ant-design/icons";
import {ContactForm} from "./ContactForm";


export const ModalForm = () => {

    const dispatch = useAppDispatch()
    const profileStatus = useAppSelector(state => state.profile.updateProfileStatus)
    const profile = useAppSelector(state => state.profile.profile)


    const [requestProfile, setRequestProfile] = useState<ProfileUserStateType>(profile)
    const [success, setSuccess] = useState(false)

    const onFinish = (values: any) => {
        setRequestProfile(values)
        setSuccess(true)
    };

    const submitContacts = (values:any) => {
        setRequestProfile ({...requestProfile, contacts: values})

    }

    const onFocusHandler = () => {
        setSuccess(false)
    }


    useEffect(() => {
        dispatch(saveProfileTC(requestProfile))
    }, [requestProfile])

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    const onChangeHandler = (e: { target: any }) => {
        if (e.target.files.length) {
            dispatch(savePhotoTC({file: e.target.files[0]}))

        }
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginLeft: '100px'}}>
                <img src={profile.photos?.small} alt=""/>

                <label htmlFor='upload-photo' >
                    <input type={'file'} style={{display: 'none'}} id="upload-photo" onChange={onChangeHandler}/>
                    <EditOutlined  style={{width: '50px', height: '50px', fontSize: '24px', cursor: 'pointer'}}/>
                </label>
            </div>

            <Form
                name="profile"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                initialValues={{lookingForAJob: profile.lookingForAJob}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                onFocus={onFocusHandler}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="fullName"
                    initialValue={profile.fullName}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="My professional skills" name="lookingForAJobDescription" initialValue={profile.lookingForAJobDescription}>
                    <TextArea rows={4}/>
                </Form.Item>

                <Form.Item label="About me" name="aboutMe" initialValue={profile.aboutMe}>
                    <TextArea rows={4}/>
                </Form.Item>

                <Form.Item label="LookingForAJob" name="lookingForAJob" valuePropName="checked" wrapperCol={{offset: 8, span: 16}}  >
                    <Checkbox />
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    {!success && profileStatus && <Button type="primary" htmlType="submit">Save Profile</Button>}
                    {success && !profileStatus && <Button type="primary" loading>Loading</Button>}
                    {success && profileStatus && <Button type="primary" shape="round" icon={<CheckOutlined />} size={'middle'} style={{backgroundColor: 'green', border: 'green'}}/>}
                </Form.Item>
            </Form>
            <ContactForm callBackForm={submitContacts} />
        </div>
    );
};




