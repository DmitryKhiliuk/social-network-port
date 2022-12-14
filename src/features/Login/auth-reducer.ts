import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authType, LoginParamType, PhotosType} from "../../common/types/types";
import {authAPI, profileAPI} from "../../api/api";
import {setAppStatusAC} from "../../app/app-reducer";

export const loginTC = createAsyncThunk('auth/login', async (param: { valuesParam: LoginParamType }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.login(param.valuesParam)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return res.data.data.userId
        } else {
            console.log(res.data)
        }
    } catch (error) {
        console.log(error)
    }
})

export const logoutTC = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const res = await authAPI.logout()
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            console.log(res.data)
        }
    } catch (error) {
        console.log(error)
    }

})

export const getProfileInfoTC = createAsyncThunk('auth/info', async (param:{id:number}, thunkAPI) => {
    const res = await profileAPI.getProfile(param.id)
    try {
        return res.data
    } catch (error) {

    }
})

const slice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        id: null,
        fullName: '',
        photos: {} as PhotosType
    } as authType,
    reducers: {
        setIsAuthAC(state, action: PayloadAction<{isAuth: boolean, id: number}>) {
            state.isAuth = action.payload.isAuth
            state.id = action.payload.id
        },
        resetProfileInfoAC(state,action) {
            state.fullName = ''
            state.photos = {large: '', small: ''}
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginTC.fulfilled, (state, action) => {
                state.isAuth = true
                state.id = action.payload
            })
            .addCase(logoutTC.fulfilled, (state) => {
                state.isAuth = false
                state.id = null
            })
            .addCase(getProfileInfoTC.fulfilled, (state, action) => {
                state.fullName = action.payload.fullName
                state.photos = action.payload.photos
            })

    }
})

export const authReducer = slice.reducer
export const {setIsAuthAC, resetProfileInfoAC} = slice.actions



