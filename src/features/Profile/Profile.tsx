import React, {ChangeEvent, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/store";
import userPhoto from './../../assets/someUser.png'
import needJob from './../../assets/Job.jpg'
import {getProfileTC, getStatusTC, saveStatusTC} from "./profile-reducer";
import s from './Profile.module.css'
import {Button, Input, Typography} from "antd";
import {ModalEditProfile} from "../../components/Modal/ModalEditProfile";
import {EditOutlined} from "@ant-design/icons";
import {ContactsProfileStateType} from "../../common/types/types";
import {selectProfile, selectProfileStatus} from "../../selectors/selectors";

export const Profile = () => {

    const dispatch = useAppDispatch()
    const profile = useAppSelector(selectProfile)
    const status = useAppSelector(selectProfileStatus)

    const userId = useParams()
    const id = +userId.id!

    useEffect(() => {
        dispatch(getProfileTC({id}))
        dispatch(getStatusTC({id}))
    }, [dispatch,id])



    useEffect(() => {
        console.log(profile.contacts)
    },[profile.contacts])

    const [editStatus, setEditStatus] = useState(false)
    const [value, setValue] = useState('')

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const onClickHandler = () => {
        !value && setValue(status)
        setEditStatus(true)
    }

    const onClickSaveHandler = () => {
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
                <ModalEditProfile  />
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
            {profile.contacts && Object.keys(profile.contacts).map((el , index ) => {
                const contact = profile.contacts[el as keyof ContactsProfileStateType]
                return contact && <div style={{fontWeight: 'bold'}} key={index}>{el + ' : '} <a href={contact} target='_blank'>{contact}</a> </div>
            })}
        </div>

    );
};

