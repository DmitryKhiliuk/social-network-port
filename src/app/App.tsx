import React, {useEffect} from 'react';
import './App.css';
import {AppLayout} from "../components/Layout/AppLayout";
import {useAppDispatch, useAppSelector} from "./store";
import {initializeAppTC} from "./app-reducer";
import {getProfileInfoTC, logoutTC, resetProfileInfoAC} from "../features/Login/auth-reducer";
import {Preloader} from "../components/Preloader/Preloader";
import {setInfoUsersPageAC} from "../features/Users/users-reducer";


function App() {

    const dispatch = useAppDispatch()
    //const auth = useAppSelector(state => state.auth)
    const id = useAppSelector(state => state.auth.id)
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    //const status = useAppSelector(state => state.app.status)
    //const profile = useAppSelector(state => state.profile.profile)

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
        dispatch(setInfoUsersPageAC({page: 1, pageSize: 10}))
    }

    const isDefaultPagination = () => {
        dispatch(setInfoUsersPageAC({page: 1, pageSize: 10}))
    }

    return (
        <div className="App">
            <AppLayout logOut={logOut} isDefaultPagination={isDefaultPagination}/>
        </div>
    );
}

export default App;
