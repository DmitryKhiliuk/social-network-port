import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {UsersResponseType, UserType} from "../../common/types/types";
import {usersAPI} from "../../api/api";


export const getUsersTC = createAsyncThunk('users/getUsers', async (param: { page: number, pageSize: number }, ThunkAPI) => {
    const res = await usersAPI.getUsers(param.page, param.pageSize)
    try {
        return res.data
    } catch (error) {

    }
})

const slice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        count: 5,
        totalCount: 0,
        currentPage: 1,
    } as InitialStateType,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getUsersTC.fulfilled, (state, action) => {
                state.users = action.payload.items
                state.totalCount = action.payload.totalCount
            })

    }
})

export const usersReducer = slice.reducer

type InitialStateType = {
    users: UserType[]
    count: number
    totalCount: number
    currentPage: number

}