import React, {useEffect} from 'react';
import {Button, Checkbox, Form, Input} from "antd";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {loginTC} from "./auth-reducer";
import {LoginParamType} from "../../common/types/types";
import {PROFILE} from "../../common/routes/routes";
import {useNavigate} from "react-router-dom";


export const Login = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const auth = useAppSelector(state => state.auth.isAuth)

    useEffect(() => {
        if (auth) {
            navigate(PROFILE)
        }
    }, [auth])


    const onFinish = (values: LoginParamType) => {
        let valuesParam: LoginParamType = {...values, captcha: ''}
        dispatch(loginTC(valuesParam))
        console.log(valuesParam)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const validateMessages = {
        required: 'Please input your ${label}!',
        types: {
            email: '${label} is not a valid email!',
        },
    };
    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            validateMessages={validateMessages}
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, type: 'email' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
};

