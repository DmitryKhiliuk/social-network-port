import React, {useEffect} from 'react';
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
    callBackView: (id: number) => void
}

export const User = (props: UserPropsType) => {



    const onClickFollowHandler = () => {
        props.callBackFollow(props.id)
    }
    const onClickUnfollowHandler = () => {
        props.callBackUnfollow(props.id)
    }

    const onClickViewHandler = () => {
        props.callBackView(props.id)
    }

    return (
        <div>
            <Card.Grid style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <img src={props.photo === null ? userPhoto : props.photo} style={{width: '100px', height: '100px'}} alt="user"/>
                <div>
                    {props.name}
                    {props.status}
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    {!props.followed ?
                        <Button type={'primary'} onClick={onClickFollowHandler}>Follow</Button> :
                        <Button type={'primary'} onClick={onClickUnfollowHandler}>Unfollow</Button>}
                    <Button type={'primary'} style={{marginTop: '5px'}} onClick={onClickViewHandler}>View profile</Button>
                </div>
            </Card.Grid>
        </div>
    );
};

