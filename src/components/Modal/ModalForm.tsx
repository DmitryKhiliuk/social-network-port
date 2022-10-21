import {Button, Checkbox, Form, Input} from 'antd';
import React, {useEffect, useState} from 'react';
import TextArea from "antd/es/input/TextArea";
import {ProfileUserStateType} from "../../common/types/types";
import {useAppDispatch} from "../../app/store";
import {savePhotoTC, saveProfileTC} from "../../features/Profile/profile-reducer";
import {CheckOutlined, EditOutlined} from "@ant-design/icons";
import {ContactForm} from "./ContactForm";

type ModalFormType = {
    profile: ProfileUserStateType
    status: string
    profileStatus: boolean
    message: string[]

}

export const ModalForm = (props: ModalFormType) => {

    const dispatch = useAppDispatch()

    const [requestProfile, setRequestProfile] = useState<ProfileUserStateType>(props.profile)
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

    /*const [fileList, setFileList] = useState<UploadFile[]>([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: props.profile.photos?.large,
        },
    ]);
    console.log(fileList)

    const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        console.log(fileList[0])
    };

    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as RcFile);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };*/

    const onChangeHandler = (e: { target: any }) => {
        if (e.target.files.length) {
            dispatch(savePhotoTC({file: e.target.files[0]}))

        }
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginLeft: '100px'}}>
                <img src={props.profile.photos?.small} alt=""/>

                <label htmlFor='upload-photo' >
                    <input type={'file'} style={{display: 'none'}} id="upload-photo" onChange={onChangeHandler}/>
                    <EditOutlined  style={{width: '50px', height: '50px', fontSize: '24px', cursor: 'pointer'}}/>
                </label>
            </div>

            <Form
                name="profile"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                initialValues={{lookingForAJob: props.profile.lookingForAJob}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                onFocus={onFocusHandler}
                autoComplete="off"
            >
                {/*<Form.Item label="Add file" valuePropName="fileList">
                <ImgCrop rotate>
                    <Upload
                        action="https://social-network.samuraijs.com/api/1.0/profile/photo"
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={onPreview}
                    >
                        {fileList.length < 2 && '+ Upload'}
                    </Upload>
                </ImgCrop>
            </Form.Item>*/}
                <Form.Item
                    label="Username"
                    name="fullName"
                    initialValue={props.profile.fullName}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="My professional skills" name="lookingForAJobDescription" initialValue={props.profile.lookingForAJobDescription}>
                    <TextArea rows={4}/>
                </Form.Item>

                <Form.Item label="About me" name="aboutMe" initialValue={props.profile.aboutMe}>
                    <TextArea rows={4}/>
                </Form.Item>

                <Form.Item label="LookingForAJob" name="lookingForAJob" valuePropName="checked" wrapperCol={{offset: 8, span: 16}}  >
                    <Checkbox />
                </Form.Item>


                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    {success && props.profileStatus ?
                        <Button type="primary" shape="round" icon={<CheckOutlined />} size={'middle'} style={{backgroundColor: 'green', border: 'green'}}/>:
                        <Button type="primary" htmlType="submit">
                            Save Profile
                        </Button>
                    }
                </Form.Item>
            </Form>
            <ContactForm callBackForm={submitContacts} profile={props.profile}  profileStatus={props.profileStatus} message={props.message}/>
        </div>
    );
};




