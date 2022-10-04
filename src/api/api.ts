import axios from "axios";
import {LoginParamType} from "../common/types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'c5dc8002-de94-41b3-931d-884560e88891'
    }
})

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(param: LoginParamType) {
        return instance.post(`auth/login`, param)
    },
    logout() {
        return instance.delete(`auth/login`)
    },
}

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },
    follow(id: number) {
        return instance.post(`follow/${id}`)
    },
    unfollow(id: number) {
        return instance.delete(`follow/${id}`)
    }
}