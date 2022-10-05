import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoginParamType} from "../../common/types/types";
import {authAPI} from "../../api/api";
import {setAppStatusAC} from "../../app/app-reducer";

export const loginTC = createAsyncThunk('auth/login', async (param: LoginParamType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            console.log(res.data.data.userId)
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

const slice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        id: null
    } as initialStateType,
    reducers: {
        setIsAuthAC(state, action: PayloadAction<{isAuth: boolean, id: number}>) {
            state.isAuth = action.payload.isAuth
            state.id = action.payload.id
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginTC.fulfilled, (state, action) => {
                console.log(action)
                state.isAuth = true
                state.id = action.payload
            })
            .addCase(logoutTC.fulfilled, (state) => {
                state.isAuth = false
                state.id = null
            })

    }
})

export const authReducer = slice.reducer
export const {setIsAuthAC} = slice.actions



export type initialStateType = {
    isAuth: boolean
    id: number | null
}