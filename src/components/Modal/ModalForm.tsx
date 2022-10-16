import {Button, Checkbox, Form, Input, Upload, UploadFile, UploadProps} from 'antd';
import React, {useState} from 'react';
import TextArea from "antd/es/input/TextArea";
import ImgCrop from 'antd-img-crop';
import {RcFile} from "antd/es/upload";
import {ProfileUserStateType} from "../../common/types/types";
import {useAppDispatch} from "../../app/store";
import {savePhotoTC} from "../../features/Profile/profile-reducer";

type ModalFormType = {
    profile: ProfileUserStateType
}

export const ModalForm = (props: ModalFormType) => {

    const dispatch = useAppDispatch()



    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const [fileList, setFileList] = useState<UploadFile[]>([
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
    };

    return (
        <Form
            name="profile"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ lookingForAJob: false }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item label="Add file" valuePropName="fileList">
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
            </Form.Item>

            <Form.Item
                label="Username"
                name="username"

            >
                <Input />
            </Form.Item>

            <Form.Item label="My professional skills" name="skills" >
                <TextArea rows={4} />
            </Form.Item>

            <Form.Item label="About me" name="aboutMe">
                <TextArea rows={4} />
            </Form.Item>

            <Form.Item name="lookingForAJob" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Looking for A Job?</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};




