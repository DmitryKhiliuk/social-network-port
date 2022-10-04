import React from 'react';
import {Spin} from "antd";

export const Preloader = () => {
    return (
        <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Spin size={'large'} />
        </div>
    );
};

