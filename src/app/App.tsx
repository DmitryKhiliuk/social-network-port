import React, {useEffect} from 'react';
import './App.css';
import {AppLayout} from "../components/Layout/AppLayout";
import {useAppDispatch, useAppSelector} from "./store";
import {useNavigate} from "react-router-dom";
import {Progress, Spin} from "antd";
import {initializeAppTC} from "./app-reducer";
import {getProfileInfoTC, logoutTC, resetProfileInfoAC} from "../features/Login/auth-reducer";
import {Preloader} from "../components/Preloader/Preloader";


function App() {

    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const auth = useAppSelector(state => state.auth)
    const id = useAppSelector(state => state.auth.id)
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const status = useAppSelector(state => state.app.status)
    const profile = useAppSelector(state => state.profile.profile)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    useEffect(() => {
        console.log(id)
        id && dispatch(getProfileInfoTC({id}))
    }, [id])

    if (!isInitialized) {
        return <Preloader/>
    }

    const logOut = () => {

        dispatch(logoutTC())
        dispatch(resetProfileInfoAC({}))
        console.log('logout' + id)
    }

    return (
        <div className="App">
            <AppLayout logOut={logOut} auth={auth} status={status} id={id} profile={profile}/>
        </div>
    );
}

export default App;
