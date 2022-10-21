import React, {useEffect, useState} from 'react';
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
import {Avatar, Button, Dropdown, Layout, Menu, Spin, Typography} from 'antd';
import {RoutesComponent} from "../../common/routes/RoutesComponent";
import {NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
import {LOGIN, MESSAGES, MUSIC, NEWS, PROFILE, SETTINGS, USERS} from "../../common/routes/routes";
import {Preloader} from "../Preloader/Preloader";
import {authType, ProfileUserStateType} from "../../common/types/types";
import logo from '../../assets/logo.svg'
import logoShort from '../../assets/logoShort.png'
import {getProfileInfoTC} from "../../features/Login/auth-reducer";
import {useAppDispatch, useAppSelector} from "../../app/store";

type AppLayoutType = {
    logOut: () => void
    auth: authType
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    id: number | null
    profile: ProfileUserStateType
}

export const AppLayout = (props: AppLayoutType) => {
    const [collapsed, setCollapsed] = useState(false);
    let location = useLocation();
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const userId = useParams()
    const key = location.pathname
    const {Header, Content, Footer, Sider} = Layout;
    const id = useAppSelector(state => state.auth.id)

    /*useEffect(() => {
        console.log('layot' + id)
        id && dispatch(getProfileInfoTC({id}))
    }, [])*/


    function getItem(label: JSX.Element, key: string, icon?: JSX.Element, children?: any) {
        return {
            key,
            icon,
            children,
            label,
        };
    }

    const items = [

        getItem(<NavLink to={PROFILE + `/${props.id}`}>Profile</NavLink>, PROFILE + `/${props.id}`, <UserOutlined/>),
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
                {
                    key: '1',
                    label: (<NavLink to={PROFILE + `/${props.id}`}>Profile</NavLink>),
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
                <Menu theme="dark" defaultSelectedKeys={[location.pathname]} mode="inline" items={items}/>
            </Sider>
            {props.status === 'loading'? <div style={{margin: 'auto'}}><Preloader/></div>:
            <Layout className="site-layout">
                <Header className="site-layout-background"
                        style={{paddingRight: '15px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                    {
                        !props.auth ?
                            <NavLink to={LOGIN} ><Button >Login</Button></NavLink> :
                            <div>
                                <Typography.Text strong>{props.auth.fullName + ' '}</Typography.Text>
                                <Dropdown overlay={menu} placement="bottomLeft" arrow>
                                    <Avatar shape="square" size='large' icon={<UserOutlined/>} src={props.auth.photos?.large}/>
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



