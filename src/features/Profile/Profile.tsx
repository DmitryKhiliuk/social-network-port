import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../app/store";

export const Profile = () => {
    const navigate = useNavigate();
    const auth = useAppSelector(state => state.auth.isAuth)

    useEffect(() => {
    }, [auth])

    return (

        <div>
            PROFILE
        </div>

    );
};

