import React, {useEffect} from 'react';
import './App.css';
import {AppLayout} from "../components/Layout/AppLayout";
import {useAppDispatch, useAppSelector} from "./store";
import {getAuthUserDataTC, logoutTC} from "../features/Login/auth-reducer";
import {useNavigate} from "react-router-dom";

function App() {

    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const auth = useAppSelector(state => state.auth.isAuth)

    useEffect(() => {
       dispatch(getAuthUserDataTC())
        console.log('fetch')
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
