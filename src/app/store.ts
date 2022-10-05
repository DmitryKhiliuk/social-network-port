import {combineReducers, configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authReducer} from "../features/Login/auth-reducer";
import {appReducer} from "./app-reducer";
import {usersReducer} from "../features/Users/users-reducer";
import {profileReducer} from "../features/Profile/profile-reducer";


export const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    users: usersReducer,
    profile: profileReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store;