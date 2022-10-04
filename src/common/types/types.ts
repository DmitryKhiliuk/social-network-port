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

export type UserType = {
    id: number
    name: string
    status: string
    photos: {
        small: string
        large: string
    }
    followed: boolean
}

export type UsersResponseType = {
    items: UserType[]
    totalCount: number
    error: string
}