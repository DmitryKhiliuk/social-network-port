import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ProfileUserStateType} from "../../common/types/types";
import {profileAPI} from "../../api/api";

export const getProfileTC = createAsyncThunk('profile/getProfile', async (param:{id: string}, ThunkAPI) => {
    const res = await profileAPI.getProfile(+param.id)
    try {
        return res.data
    } catch (error) {
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
    }
})

export const profileReducer = slice.reducer