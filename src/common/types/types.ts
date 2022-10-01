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

export type MeResponseType = {
    id: number,
    email: string,
    password: string
}