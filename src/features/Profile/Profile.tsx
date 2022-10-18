import React, {ChangeEvent, ChangeEventHandler, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/store";
import userPhoto from './../../assets/someUser.png'
import needJob from './../../assets/Job.jpg'
import {getProfileTC, getStatusTC, saveStatusTC} from "./profile-reducer";
import s from './Profile.module.css'
import {Button, Input, Typography} from "antd";
import {ModalEditProfile} from "../../components/Modal/ModalEditProfile";
import {EditOutlined} from "@ant-design/icons";

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
        dispatch(getStatusTC({id}))
    }, [id])

    const [editStatus, setEditStatus] = useState(false)
    const [value, setValue] = useState('')

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const onClickHandler = () => {
        setEditStatus(true)
    }

    const onClickSaveHandler = () => {
        console.log(value)
        dispatch(saveStatusTC({status: value}))
        setEditStatus(false)
    }

    return (

        <div>
            <div className={s.editBlock}>
                <div className={s.photoBlock}>
                    <img src={profile.photos?.large || userPhoto} className={s.photo} alt="user"/>
                    <div className={s.job}>
                        {profile.lookingForAJob && <img src={needJob} className={s.jobImage} alt="user"/>}
                    </div>
                </div>
                <ModalEditProfile profile={profile} status={status}/>
            </div>

            <div>
                <Typography.Title level={3}>{profile.fullName}</Typography.Title>
            </div>
            <div >
                {editStatus ?
                    <Input.Group compact>
                        <Input style={{ width: 'calc(100% - 200px)' }} defaultValue={status} onChange={onChangeHandler} />
                        <Button type="primary" onClick={onClickSaveHandler}>Save</Button>
                    </Input.Group> :
                    <div>
                        {status + ' '}
                        <EditOutlined style={{cursor: 'pointer'}} onClick={onClickHandler}/>
                    </div>
                }
            </div>

            <div>
                <Typography.Title level={5}>{profile.lookingForAJobDescription}</Typography.Title>
                <Typography.Title level={5}>{profile.aboutMe}</Typography.Title>
            </div>
            <Typography.Text > Contacts: </Typography.Text>
        </div>

    );
};

