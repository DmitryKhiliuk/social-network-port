import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ProfileUserStateType} from "../../common/types/types";
import {profileAPI} from "../../api/api";
import {AppRootStateType} from "../../app/store";
import {getProfileInfoTC} from "../Login/auth-reducer";

export const getProfileTC = createAsyncThunk('profile/getProfile', async (param:{id: number}, ThunkAPI) => {
    const res = await profileAPI.getProfile(param.id!)
    try {
        return res.data
    } catch (error) {
        console.log(error)
    }

})

export const getStatusTC = createAsyncThunk('profile/getStatus', async (param:{id: number}, ThunkAPI) => {
    const res = await profileAPI.getStatus(param.id!)
    try {
        return res.data
    } catch (error) {
        console.log(error)
    }

})

export const saveStatusTC = createAsyncThunk('profile/saveStatus', async(param: {status: string} , ThunkAPI) => {
    const res = await profileAPI.updateStatus(param.status)
    try {
        const userId = ThunkAPI.getState() as AppRootStateType;
        ThunkAPI.dispatch(getStatusTC({id: userId.auth.id!}))
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const savePhotoTC = createAsyncThunk('profile/savePhoto', async (param: { file: string }, ThunkAPI) => {
    const res = await profileAPI.savePhoto(param.file)
    try {
        return res.data.data
    }  catch (error) {
        console.log(error)
    }
})

export const saveProfileTC = createAsyncThunk<string[], ProfileUserStateType>('profile/saveProfile', async (param: ProfileUserStateType, ThunkAPI ) => {
    ThunkAPI.dispatch(changeProfileStatusAC(false))
    const res = await profileAPI.saveProfile(param)
    try {
        const userId = ThunkAPI.getState() as AppRootStateType;
        if (res.data.resultCode === 0 && userId.auth.id) {
            ThunkAPI.dispatch(getProfileTC({id: userId.auth.id}))
            ThunkAPI.dispatch(getProfileInfoTC({id: userId.auth.id}))
            ThunkAPI.dispatch(changeProfileStatusAC(true))
        }
        return res.data.messages
    } catch (error) {
        console.log(error)
    }
})

const slice = createSlice({
    name: 'profile',
    initialState: {
        profile: {} as ProfileUserStateType,
        status: '' as string,
        updateProfileStatus: true,
        message: [] as string[]

    },
    reducers: {
        changeProfileStatusAC(state, action){
            state.updateProfileStatus = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getProfileTC.fulfilled, (state, action) => {
                state.profile = action.payload
            })
            .addCase(getStatusTC.fulfilled, (state, action) => {
                state.status = action.payload
            })
            .addCase(savePhotoTC.fulfilled, (state, action) => {
                state.profile.photos = action.payload.photos
            })
            .addCase(saveProfileTC.fulfilled, (state, action) => {
                state.message = action.payload
            })
    }
})

export const {
    changeProfileStatusAC
} = slice.actions

export const profileReducer = slice.reducer