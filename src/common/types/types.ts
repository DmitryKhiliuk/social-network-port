export type itemType = {
    label:string,
    key:string,
    icon?: JSX.Element,
    children?:getItemType
}

export type getItemType = (label:string, key:string, icon?: JSX.Element, children?:getItemType) => void

export type LoginParamType = {
    email:string,
    password:string,
    rememberMe: boolean,
    captcha: ''
}

export type PhotosType = {
    small: string
    large: string
}

export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

export type UsersResponseType = {
    items: UserType[]
    totalCount: number
    error: string
}

export type ContactsProfileStateType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}

export type ProfileUserStateType = {
    aboutMe: string
    id: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsProfileStateType
    photos: PhotosType | null

}

