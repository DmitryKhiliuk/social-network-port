import {Profile} from "../../features/Profile/Profile";
import {ERROR, LOGIN, MESSAGES, MUSIC, NEWS, PROFILE, SETTINGS, USERS} from "./routes";
import {Login} from "../../features/Login/Login";
import {Messages} from "../../features/Messages/Messages";
import {Users} from "../../features/Users/Users";
import {News} from "../../features/News/News";
import {Music} from "../../features/Music/Music";
import {Settings} from "../../features/Settings/Settings";
import {ErrorPage} from "../../features/Error/ErrorPage";
import {Navigate, Route, Routes} from "react-router-dom";

export const RoutesComponent = () => {
    const routes = [
        {path: PROFILE, component: <Profile/>},
        {path: MESSAGES, component: <Messages/>},
        {path: USERS, component: <Users/>},
        {path: LOGIN, component: <Login/>},
        {path: NEWS, component: <News/>},
        {path: MUSIC, component: <Music/>},
        {path: SETTINGS, component: <Settings/>},
        {path: ERROR, component: <ErrorPage/>},
    ];

    return (
        <div >
            <Routes>
                <Route path={'*'} element={<Navigate to={ERROR}/>}/>
                {routes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.component}/>
                ))}
            </Routes>
        </div>
    )
};