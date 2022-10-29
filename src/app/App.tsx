import React, {useEffect} from 'react';
import './App.css';
import {AppLayout} from "../components/Layout/AppLayout";
import {useAppDispatch, useAppSelector} from "./store";
import {initializeAppTC} from "./app-reducer";
import {getProfileInfoTC, logoutTC, resetProfileInfoAC} from "../features/Login/auth-reducer";
import {Preloader} from "../components/Preloader/Preloader";
import {setInfoUsersPageAC} from "../features/Users/users-reducer";
import {selectAppInitialized, selectAuthId} from "../selectors/selectors";


function App() {

    const dispatch = useAppDispatch()
    const id = useAppSelector(selectAuthId)
    const isInitialized = useAppSelector(selectAppInitialized)


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
