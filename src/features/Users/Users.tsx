import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/store";
import {followUserTC, getUsersTC, setInfoUsersPageAC, unfollowUserTC} from "./users-reducer";
import {User} from "./User";
import {Pagination} from "antd";
import {getProfileTC} from "../Profile/profile-reducer";
import {useNavigate} from "react-router-dom";
import {PROFILE} from "../../common/routes/routes";
import {selectUsers, selectUsersPage, selectUsersPageSize, selectUsersTotalCount} from "../../selectors/selectors";

export const Users = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const users = useAppSelector(selectUsers)
    const totalCount = useAppSelector(selectUsersTotalCount)
    const page = useAppSelector(selectUsersPage)
    const pageSize = useAppSelector(selectUsersPageSize)

    const onChangeHandler = (page: number, pageSize: number) => {
        dispatch(setInfoUsersPageAC({page, count: pageSize}))

    }
    useEffect(() => {
        dispatch(getUsersTC({page, pageSize}))
    }, [page, pageSize])


    const followUser = (id: number) => {
        dispatch(followUserTC({id}))
    }
    const unfollowUser = (id: number) => {
        dispatch(unfollowUserTC({id}))
    }

    const viewProfileUser = (id: number) => {
        dispatch(getProfileTC({id}))
        navigate(PROFILE + `/${id}`)
    }

    return (
        <div>
            <Pagination defaultCurrent={page} defaultPageSize={pageSize} total={totalCount} onChange={onChangeHandler} />
            {users.map((el) => <User key={el.id}
                                     user={el}
                                     callBackFollow={followUser}
                                     callBackUnfollow={unfollowUser}
                                     callBackView={viewProfileUser}
            />)}
        </div>
    );
};

