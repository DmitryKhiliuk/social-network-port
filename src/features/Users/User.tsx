import React from 'react';
import {Button, Card} from "antd";
import userPhoto from './../../assets/someUser.png'

type UserPropsType = {
    id: number
    name: string
    status: string
    photo: string
    followed: boolean
    callBackFollow: (id: number) => void
    callBackUnfollow: (id: number) => void
}

export const User = (props: UserPropsType) => {

    const onClickFollowHandler = (id: number) => {
        props.callBackFollow(id)
    }
    const onClickUnfollowHandler = (id: number) => {
        props.callBackUnfollow(id)
    }

    return (
        <div>
            <Card.Grid style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <img src={props.photo === null ? userPhoto : props.photo} style={{width: '100px', height: '100px'}} alt="user"/>
                <div>
                    {props.name}
                    {props.status}
                </div>
                {!props.followed ?
                    <Button type={'primary'} onClick={() => onClickFollowHandler(props.id)}>Follow</Button> :
                    <Button type={'primary'} onClick={() => onClickUnfollowHandler(props.id)}>Unfollow</Button>}
            </Card.Grid>
        </div>
    );
};

