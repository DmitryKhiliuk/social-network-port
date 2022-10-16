import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ProfileUserStateType} from "../../common/types/types";
import {profileAPI} from "../../api/api";

export const getProfileTC = createAsyncThunk('profile/getProfile', async (param:{id: number}, ThunkAPI) => {
    const res = await profileAPI.getProfile(param.id!)
    try {
        return res.data
    } catch (error) {
        console.log(error)
    }

})

export const savePhotoTC = createAsyncThunk('profile/savePhoto', async (param:{file:string}, ThunkAPI) => {
    const res = await profileAPI.savePhoto(param.file)
    try {
        return res.data.data.photos
    }  catch (error) {
        console.log(error)
    }
})

const slice = createSlice({
    name: 'profile',
    initialState: {
        profile: {} as ProfileUserStateType,
        status: '' as string
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getProfileTC.fulfilled, (state, action) => {
                state.profile = action.payload
            })
            .addCase(savePhotoTC.fulfilled, (state, action) => {
                state.profile.photos!.large = action.payload
            })
    }
})

export const profileReducer = slice.reducer