import React from 'react';
import {Button} from "antd";
import {CheckOutlined} from "@ant-design/icons";
import {useAppSelector} from "../../app/store";


type EditableButtonType = {
    success: boolean
    name: string
}

export const EditableButton = ({success, name}: EditableButtonType) => {

    const profileStatus = useAppSelector(state => state.profile.updateProfileStatus)

    return (
        <div>
            {!success && profileStatus && <Button type="primary" htmlType="submit">{name}</Button>}
            {success && !profileStatus && <Button type="primary" loading>Loading</Button>}
            {success && profileStatus && <Button type="primary" shape="round" icon={<CheckOutlined />} size={'middle'} style={{backgroundColor: 'green', border: 'green'}}/>}
        </div>
    );
};

