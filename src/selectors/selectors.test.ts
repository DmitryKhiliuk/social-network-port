import {
    selectAppInitialized,
    selectAppStatus,
    selectAuth,
    selectAuthId,
    selectAuthIsAuth, selectProfile, selectProfileStatus,
    selectUpdateProfileStatus, selectUsers, selectUsersPage, selectUsersPageSize, selectUsersTotalCount
} from "./selectors";
import {AppRootStateType} from "../app/store";

let startState: AppRootStateType

beforeEach(() => {
    startState = {
        auth: {
            isAuth:true,
            id: 2,
            fullName:'name',
            photos: {
                small: 'some small photo',
                large: 'some large photo'
            }
        },
        app: {
            status: 'idle',
            error: null,
            isInitialized: false
        },
        users: {
            users: [],
            totalCount: 123,
            page: 1,
            count: 10
        },
        profile: {
            profile: {
                aboutMe: '',
                userId: 2,
                lookingForAJob: true,
                lookingForAJobDescription: '',
                fullName:'name',
                contacts: {
                    facebook: 'string',
                    website: 'string',
                    vk: 'string',
                    twitter: 'string',
                    instagram: 'string',
                    youtube: 'string',
                    github: 'string',
                    mainLink: 'string'
                },
                photos: {
                    small: 'some small photo',
                    large: 'some large photo'
                }
            },
            status: '',
            updateProfileStatus: false,
            message: []
        }
    }
})

describe('select state appReducer', () => {
    test('selected isInitialized', () => {
        const endState = selectAppInitialized(startState)
        expect(endState).toBe(false)
    })
    test('selected status', () => {
        const endState = selectAppStatus(startState)
        expect(endState).toBe('idle')
    })
})

describe('select state authReducer', () => {
    test('selected auth', () => {
        const endState = selectAuth(startState)
        expect(endState.fullName).toBe('name')
        expect(endState.id).toEqual(2)
    })
    test('selected id', () => {
        const endState = selectAuthId(startState)
        expect(endState).toEqual(2)
    })
    test('selected isAuth', () => {
        const endState = selectAuthIsAuth(startState)
        expect(endState).toBe(true)
    })
})

describe('select state authProfile', () => {
    test('selected updateProfileStatus', () => {
        const endState = selectUpdateProfileStatus(startState)
        expect(endState).toBe(false)

    })
    test('selected profile', () => {
        const endState = selectProfile(startState)
        expect(endState.userId).toEqual(2)
    })
    test('selected profileStatus', () => {
        const endState = selectProfileStatus(startState)
        expect(endState).toBe('')
    })
})

describe('select state usersReducer', () => {
    test('selected users', () => {
        const endState = selectUsers(startState)
        expect(endState.length).toEqual(0)

    })
    test('selected total count', () => {
        const endState = selectUsersTotalCount(startState)
        expect(endState).toEqual(123)
    })
    test('selected page', () => {
        const endState = selectUsersPage(startState)
        expect(endState).toBe(1)
    })
    test('selected page size', () => {
        const endState = selectUsersPageSize(startState)
        expect(endState).toBe(10)
    })
})