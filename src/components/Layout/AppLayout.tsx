import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './AppLayout.css';
import {
    CaretRightOutlined,
    MessageOutlined,
    GlobalOutlined,
    TeamOutlined,
    UserOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import {RoutesComponent} from "../../common/routes/RoutesComponent";
import {NavLink} from "react-router-dom";
import {MESSAGES, MUSIC, NEWS, PROFILE, SETTINGS, USERS} from "../../common/routes/routes";

export const AppLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    const { Header, Content, Footer, Sider } = Layout;

    function getItem(label:JSX.Element, key:string, icon?: JSX.Element, children?:any) {
        return {
            key,
            icon,
            children,
            label,
        };
    }

    const items = [

        getItem(<NavLink to={PROFILE}>Profile</NavLink>, '1', <UserOutlined />),
        getItem(<NavLink to={MESSAGES}>Messages</NavLink>, '2', <MessageOutlined />),
        getItem(<NavLink to={USERS}>Users</NavLink>, '3', <TeamOutlined />),
        getItem(<NavLink to={NEWS}>News</NavLink>, '4', <GlobalOutlined />),
        getItem(<NavLink to={MUSIC}>Music</NavLink>, '5', <CaretRightOutlined />),
        getItem(<NavLink to={SETTINGS}>Settings</NavLink>, '6', <SettingOutlined />),
    ];

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}
                />
                <Content style={{margin: '0 16px',}}>
                    <Breadcrumb style={{margin: '16px 0',}}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{padding: 24, minHeight: 360,}}>
                        <RoutesComponent/>
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};



