import React, {useState} from 'react';
import 'antd/dist/antd.css';
import './AppLayout.css';
import {
    CaretRightOutlined,
    GlobalOutlined,
    MessageOutlined,
    SettingOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Avatar, Button, Dropdown, Layout, Menu, Typography} from 'antd';
import {RoutesComponent} from "../../common/routes/RoutesComponent";
import {NavLink, useLocation} from "react-router-dom";
import {LOGIN, MESSAGES, MUSIC, NEWS, PROFILE, SETTINGS, USERS} from "../../common/routes/routes";
import {Preloader} from "../Preloader/Preloader";
import {authType, ProfileUserStateType} from "../../common/types/types";
import logo from '../../assets/logo.svg'
import logoShort from '../../assets/logoShort.png'
import {useAppSelector} from "../../app/store";
import {selectAppStatus, selectAuth, selectAuthId} from "../../selectors/selectors";

type AppLayoutType = {
    logOut: () => void
    isDefaultPagination: () => void
}

export const AppLayout = (props: AppLayoutType) => {

    const auth = useAppSelector(selectAuth)
    const status = useAppSelector(selectAppStatus)
    const id = useAppSelector(selectAuthId)

    const [collapsed, setCollapsed] = useState(false);
    let location = useLocation();
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

        getItem(<NavLink to={PROFILE + `/${id}`}>Profile</NavLink>, PROFILE + `/${id}`, <UserOutlined/>),
        getItem(<NavLink to={MESSAGES}>Messages</NavLink>, MESSAGES, <MessageOutlined/>),
        getItem(<NavLink to={USERS}>Users</NavLink>, USERS, <TeamOutlined/>),
        getItem(<NavLink to={NEWS}>News</NavLink>, NEWS, <GlobalOutlined/>),
        getItem(<NavLink to={MUSIC}>Music</NavLink>, MUSIC, <CaretRightOutlined/>),
        getItem(<NavLink to={SETTINGS}>Settings</NavLink>, SETTINGS, <SettingOutlined/>),
    ];

    const onClickHandler = () => {
        props.logOut()

    }

    const isDefaultPagination = () => {
        props.isDefaultPagination()
    }
    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (<NavLink to={PROFILE + `/${id}`}>Profile</NavLink>),
                },
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
                <img className="logo" src={collapsed ? logoShort : logo}/>
                <Menu theme="dark" defaultSelectedKeys={[location.pathname]} mode="inline" items={items} onClick={isDefaultPagination}/>
            </Sider>
            {status === 'loading'? <div style={{margin: 'auto'}}><Preloader/></div>:
            <Layout className="site-layout">
                <Header className="site-layout-background"
                        style={{paddingRight: '15px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                    {
                        !auth ?
                            <NavLink to={LOGIN} ><Button >Login</Button></NavLink> :
                            <div>
                                <Typography.Text strong>{auth.fullName + ' '}</Typography.Text>
                                <Dropdown overlay={menu} placement="bottomLeft" arrow>
                                    <Avatar shape="square" size='large' icon={<UserOutlined/>} src={auth.photos?.large}/>
                                </Dropdown>
                            </div>

                    }
                </Header>
                <Content style={{margin: '0 16px',}}>
                    <div className="site-layout-background" style={{padding: 24, minHeight: 360,}}>
                        <RoutesComponent/>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center',}}>
                    <a href="https://portfolio-dzmitry-khiliuk.herokuapp.com">Portfolio</a> | khiliukbrest@gmail.ru | <a href="https://github.com/DmitryKhiliuk">Git</a>
                </Footer>
            </Layout>
            }
        </Layout>
    );
};



