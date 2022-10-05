import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/store";
import userPhoto from './../../assets/someUser.png'
import {getProfileTC} from "./profile-reducer";

export const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const auth = useAppSelector(state => state.auth.isAuth)
    const id = useAppSelector(state => state)


    useEffect(() => {
        dispatch(getProfileTC({id: '23559'}))
    }, [])

    return (

        <div>
            <div>
                <img src={userPhoto} style={{width: '150px', height: '150px'}} alt="user"/>
            </div>
            <div>

            </div>
        </div>

    );
};

