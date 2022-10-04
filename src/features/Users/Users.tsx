import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/store";
import {followUserTC, getUsersTC, unfollowUserTC} from "./users-reducer";
import {User} from "./User";
import {Pagination} from "antd";

export const Users = () => {

    const dispatch = useAppDispatch()
    const users = useAppSelector(state => state.users.users)
    const totalCount = useAppSelector(state => state.users.totalCount)

    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)


    const onChangeHandler = (page: number, pageSize: number) => {
        setPage(page)
        setPageSize(pageSize)
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
    return (
        <div>
            <Pagination defaultCurrent={page} total={totalCount} onChange={onChangeHandler} />
            {users.map((el) => <User key={el.id}
                                     id={el.id}
                                     name={el.name}
                                     status={el.status}
                                     followed={el.followed}
                                     callBackFollow={followUser}
                                     callBackUnfollow={unfollowUser}
            photo={el.photos.small}/>)}
        </div>
    );
};

