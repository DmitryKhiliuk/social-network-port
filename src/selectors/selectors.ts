import {AppRootStateType} from "../app/store";

export const selectAppInitialized = (state: AppRootStateType) => state.app.isInitialized
export const selectAppStatus = (state: AppRootStateType) => state.app.status
export const selectAuth = (state: AppRootStateType) => state.auth
export const selectAuthId = (state: AppRootStateType) => state.auth.id
export const selectAuthIsAuth = (state: AppRootStateType) => state.auth.isAuth
export const selectUpdateProfileStatus = (state: AppRootStateType) => state.profile.updateProfileStatus
export const selectProfile = (state: AppRootStateType) => state.profile.profile
export const selectProfileStatus = (state: AppRootStateType) => state.profile.status
export const selectUsers = (state: AppRootStateType) => state.users.users
export const selectUsersTotalCount = (state: AppRootStateType) => state.users.totalCount
export const selectUsersPage = (state: AppRootStateType) => state.users.page
export const selectUsersPageSize = (state: AppRootStateType) => state.users.count