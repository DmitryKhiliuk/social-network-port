import React, {useEffect} from 'react';
import './App.css';
import {AppLayout} from "../components/Layout/AppLayout";
import {useAppDispatch, useAppSelector} from "./store";
import {useNavigate} from "react-router-dom";
import {Progress, Spin} from "antd";
import {initializeAppTC} from "./app-reducer";
import {logoutTC} from "../features/Login/auth-reducer";


function App() {

    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const auth = useAppSelector(state => state.auth.isAuth)
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const status = useAppSelector(state => state.app.status)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Spin size={'large'} />
        </div>
    }

    const logOut = () => {
        dispatch(logoutTC())
    }

    return (
        <div className="App">
            <AppLayout logOut={logOut} auth={auth} status={status}/>
        </div>
    );
}

export default App;
