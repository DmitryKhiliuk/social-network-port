import {authReducer, getProfileInfoTC, loginTC, logoutTC} from './auth-reducer'
import {authType, LoginParamType, PhotosType} from "../../common/types/types";

let startState: authType

beforeEach(() => {
    startState = {
        isAuth: false,
        id: null,
        fullName: '',
        photos: {} as PhotosType
    }
})
test('should be added user id', () => {
    const payload = 2

    const valuesParam: LoginParamType = {
        email: '',
        password: '',
        rememberMe: false,
        captcha: ''
    }

    const endState = authReducer(startState, loginTC.fulfilled(payload, '', {valuesParam}))

    expect(endState.id ).toEqual(2)
    expect(endState.isAuth ).toBe(true)
})

test('should be deleted user id', () => {
    const endState = authReducer(startState, logoutTC.fulfilled(undefined, 'id', undefined))

    expect(endState.id ).toBeNull()
    expect(endState.isAuth ).toBe(false)
})

test('should be added user name and photos', () => {

    let userProfile = {
        fullName: 'user',
        photos: {
            large: 'some large photo',
            small: 'some small photo'
        }
    }

    let id = 2

    const endState = authReducer(startState, getProfileInfoTC.fulfilled({fullName: userProfile.fullName, photos: userProfile.photos}, 'id', {id}))

    expect(endState.fullName ).toEqual('user')
    expect(endState.photos.small ).toEqual('some small photo')
})