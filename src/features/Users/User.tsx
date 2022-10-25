import React, {useEffect} from 'react';
import {Button, Card} from "antd";
import userPhoto from './../../assets/someUser.png'
import {UserType} from "../../common/types/types";

type UserPropsType = {
    user:  UserType
    callBackFollow: (id: number) => void
    callBackUnfollow: (id: number) => void
    callBackView: (id: number) => void
}

export const User = (props: UserPropsType) => {

    const {id, name, status, photos, followed} = props.user

    const onClickFollowHandler = () => {
        props.callBackFollow(id)
    }
    const onClickUnfollowHandler = () => {
        props.callBackUnfollow(id)
    }

    const onClickViewHandler = () => {
        props.callBackView(id)
    }

    return (
        <div>
            <Card.Grid style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <img src={photos.small === null ? userPhoto : photos.small} style={{width: '100px', height: '100px'}} alt="user"/>
                <div>
                    {name}
                    {status}
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    {!followed ?
                        <Button type={'primary'} onClick={onClickFollowHandler}>Follow</Button> :
                        <Button type={'primary'} onClick={onClickUnfollowHandler}>Unfollow</Button>}
                    <Button type={'primary'} style={{marginTop: '5px'}} onClick={onClickViewHandler}>View profile</Button>
                </div>
            </Card.Grid>
        </div>
    );
};

