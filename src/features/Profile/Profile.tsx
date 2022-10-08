import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/store";
import userPhoto from './../../assets/someUser.png'
import needJob from './../../assets/Job.jpg'
import {getProfileTC} from "./profile-reducer";
import s from './Profile.module.css'
import {Button, Typography} from "antd";
import {ModalEditProfile} from "../../components/Modal/ModalEditProfile";

export const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const auth = useAppSelector(state => state.auth.isAuth)
    const profile = useAppSelector(state => state.profile.profile)
    const status = useAppSelector(state => state.profile.status)

    const userId = useParams()
    const id = +userId.id!

    useEffect(() => {
        dispatch(getProfileTC({id}))
    }, [id])

    return (

        <div>
            <div className={s.editBlock}>
                <div className={s.photoBlock}>
                    <img src={profile.photos?.large || userPhoto} className={s.photo} alt="user"/>
                    <div className={s.job}>
                        {profile.lookingForAJob && <img src={needJob} className={s.jobImage} alt="user"/>}
                    </div>
                </div>
                <ModalEditProfile profile={profile}/>
            </div>
            <div>
                <Typography.Title level={3}>{profile.fullName}</Typography.Title>
            </div>
            <div>
                {status}
            </div>
            <div>
                <Typography.Title level={5}>{profile.lookingForAJobDescription}</Typography.Title>
                <Typography.Title level={5}>{profile.aboutMe}</Typography.Title>
            </div>
            <Typography.Text > Contacts: </Typography.Text>
        </div>

    );
};

