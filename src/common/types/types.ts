export type itemType = {
    label:string,
    key:string,
    icon?: JSX.Element,
    children?:getItemType
}

export type getItemType = (label:string, key:string, icon?: JSX.Element, children?:getItemType) => void