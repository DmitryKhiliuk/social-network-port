import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {UserType} from "../../common/types/types";
import {usersAPI} from "../../api/api";


export const getUsersTC = createAsyncThunk('users/getUsers', async (param: { page: number, pageSize: number }, ThunkAPI) => {
    const res = await usersAPI.getUsers(param.page, param.pageSize)
    try {
        console.log(param)
        return res.data
    } catch (error) {

    }
})

export const followUserTC = createAsyncThunk/*<{ users: UserType[] }, {id: number }, {}>*/('users/followUser', async(param: { id: number }, ThunkAPI) => {
    const res = await usersAPI.follow(param.id)
    try {
        return param.id
    } catch (error) {

    }
})

export const unfollowUserTC = createAsyncThunk/*<{ users: UserType[] }, {id: number }, {}>*/('users/unfollowUser', async(param: { id: number }, ThunkAPI) => {
    const res = await usersAPI.unfollow(param.id)
    try {
        return param.id
    } catch (error) {

    }
})

const slice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        totalCount: 0,
        page: 1,
        count: 10
    } as InitialStateType,
    reducers: {
        setInfoUsersPageAC(state,action) {
            console.log(action)
            state.page = action.payload.page
            state.count = action.payload.count
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getUsersTC.fulfilled, (state, action) => {
                state.users = action.payload.items
                state.totalCount = action.payload.totalCount
            })
            .addCase(followUserTC.fulfilled, (state, action) => {
                const index = state.users.findIndex((el) => el.id === action.payload)
                state.users[index].followed = true
            })
            .addCase(unfollowUserTC.fulfilled, (state, action) => {
                const index = state.users.findIndex((el) => el.id === action.payload)
                state.users[index].followed = false
            })

    }
})

export const usersReducer = slice.reducer
export const {setInfoUsersPageAC} = slice.actions

type InitialStateType = {
    users: UserType[]
    totalCount: number,
    page: number,
    count: number

}