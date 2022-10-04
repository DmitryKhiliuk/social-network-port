import React from 'react';
import {Button, Card, Pagination} from "antd";
import userPhoto from './../../assets/someUser.png'

type UserPropsType = {
    name: string
    status: string
    photo: string
}

export const User = (props: UserPropsType) => {
    return (
        <div>
            <Card.Grid style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <img src={props.photo === null ? userPhoto : props.photo} style={{width: '100px', height: '100px'}} alt=""/>
                <div>
                    {props.name}
                    {props.status}
                </div>
                <Button type={'primary'}>Follow</Button>
            </Card.Grid>
        </div>
    );
};

