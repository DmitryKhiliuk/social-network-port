import React, {useEffect} from 'react';
import './App.css';
import {AppLayout} from "../components/Layout/AppLayout";
import {useAppDispatch, useAppSelector} from "./store";
import {getAuthUserDataTC, logoutTC} from "../features/Login/auth-reducer";
import {useNavigate} from "react-router-dom";
import {LOGIN} from "../common/routes/routes";

function App() {

    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const auth = useAppSelector(state => state.auth.isAuth)

    useEffect(() => {
        if (!auth) {
            navigate(LOGIN)
        }
    }, [])

    const logOut = () => {
        dispatch(logoutTC())
    }

    return (
        <div className="App">
            <AppLayout logOut={logOut} auth={auth}/>
        </div>
    );
}

export default App;
