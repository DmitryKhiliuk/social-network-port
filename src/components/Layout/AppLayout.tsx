import React, {useState} from 'react';
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
import {Avatar, Breadcrumb, Button, Dropdown, Layout, Menu} from 'antd';
import {RoutesComponent} from "../../common/routes/RoutesComponent";
import {NavLink, useLocation} from "react-router-dom";
import {LOGIN, MESSAGES, MUSIC, NEWS, PROFILE, SETTINGS, USERS} from "../../common/routes/routes";

type AppLayoutType = {
    logOut: () => void
    auth: boolean
}

export const AppLayout = (props: AppLayoutType) => {
    const [collapsed, setCollapsed] = useState(false);
    let location = useLocation();
    console.log(location.pathname)

    const {Header, Content, Footer, Sider} = Layout;

    function getItem(label: JSX.Element, key: string, icon?: JSX.Element, children?: any) {
        return {
            key,
            icon,
            children,
            label,
        };
    }

    const items = [

        getItem(<NavLink to={PROFILE}>Profile</NavLink>, PROFILE, <UserOutlined/>),
        getItem(<NavLink to={MESSAGES}>Messages</NavLink>, MESSAGES, <MessageOutlined/>),
        getItem(<NavLink to={USERS}>Users</NavLink>, USERS, <TeamOutlined/>),
        getItem(<NavLink to={NEWS}>News</NavLink>, NEWS, <GlobalOutlined/>),
        getItem(<NavLink to={MUSIC}>Music</NavLink>, MUSIC, <CaretRightOutlined/>),
        getItem(<NavLink to={SETTINGS}>Settings</NavLink>, SETTINGS, <SettingOutlined/>),
    ];



    const onClickHandler = () => {
        props.logOut()
    }
    const menu = (
        <Menu
            items={[
                {key: '1', label: (<NavLink to={PROFILE}>Profile</NavLink>),},
                {
                    key: '2',
                    label: (<Button type="text" style={{padding: 0}} onClick={onClickHandler}>Log Out</Button>),
                },
            ]}
        />
    );

    return (
        <Layout style={{minHeight: '100vh',}}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="logo"/>
                <Menu theme="dark" defaultSelectedKeys={[location.pathname]} mode="inline" items={items}/>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background"
                        style={{paddingRight: '15px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                    {
                        !props.auth ?
                            <NavLink to={LOGIN} ><Button >Login</Button></NavLink> :
                            <Dropdown overlay={menu} placement="bottomLeft" arrow>
                                <Avatar shape="square" size='large' icon={<UserOutlined/>}/>
                            </Dropdown>
                    }
                </Header>
                <Content style={{margin: '0 16px',}}>
                    <div className="site-layout-background" style={{padding: 24, minHeight: 360,}}>
                        <RoutesComponent/>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center',}}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};



