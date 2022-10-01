import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {getAuthUserDataTC} from "../Login/auth-reducer";
import {LOGIN} from "../../common/routes/routes";
import {useAppSelector} from "../../app/store";

export const Profile = () => {

    const navigate = useNavigate();
    const auth = useAppSelector(state => state.auth.isAuth)

    useEffect(() => {
        console.log('profile')
        if (!auth) {
            navigate(LOGIN)
        }
    }, [auth])
    return (
        <div>
            PROFILE
        </div>
    );
};

