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
            return
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
    } as initialStateType,
    reducers: {
        setIsAuthAC(state, action: PayloadAction<{value: boolean}>) {
            state.isAuth = action.payload.value
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginTC.fulfilled, (state) => {
                state.isAuth = true
            })
            .addCase(logoutTC.fulfilled, (state) => {
                state.isAuth = false
            })

    }
})

export const authReducer = slice.reducer
export const {setIsAuthAC} = slice.actions



export type initialStateType = {
    isAuth: boolean
}