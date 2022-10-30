import {Checkbox, Form, Input, } from 'antd';
import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/store";
import {savePhotoTC, saveProfileTC} from "../../features/Profile/profile-reducer";
import {EditOutlined} from "@ant-design/icons";
import {EditableButton} from "../EditableButton/EditableButton";
import {selectProfile} from "../../selectors/selectors";
import TextArea from "antd/lib/input/TextArea";


export const ModalForm = () => {

    const dispatch = useAppDispatch()
    const profile = useAppSelector(selectProfile)

    const [success, setSuccess] = useState(false)

    const {facebook, github, instagram, mainLink, twitter, vk, website, youtube} = profile.contacts

    const onFinish = (values: any) => {
        dispatch(saveProfileTC(values))
        setSuccess(true)
    };

    const onFocusHandler = () => {
        setSuccess(false)
    }

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

                <Form.Item label="Facebook" name={["contacts", "facebook"]} initialValue={facebook}>
                    <Input />
                </Form.Item>

                <Form.Item label="Git" name={["contacts", "github"]} initialValue={github}>
                    <Input />
                </Form.Item>

                <Form.Item label="Instagram" name={["contacts", "instagram"]} initialValue={instagram}>
                    <Input />
                </Form.Item>

                <Form.Item label="MainLink" name={["contacts", "mainLink"]} initialValue={mainLink}>
                    <Input />
                </Form.Item>

                <Form.Item label="Twitter" name={["contacts", "twitter"]} initialValue={twitter}>
                    <Input />
                </Form.Item>

                <Form.Item label="VK" name={["contacts", "vk"]} initialValue={vk}>
                    <Input />
                </Form.Item>

                <Form.Item label="Website" name={["contacts", "website"]} initialValue={website}>
                    <Input />
                </Form.Item>

                <Form.Item label="YouTube" name={["contacts", "youtube"]} initialValue={youtube}>
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <EditableButton success={success} name={'Save Profile'}/>
                </Form.Item>
            </Form>

        </div>
    );
};




