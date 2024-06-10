import {
    $authHost,
    $host
} from "./index";
import {jwtDecode} from "jwt-decode";

export const registration = async (user) => {
    const {data} = await $host.post('api/user/registration', user)
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (user) => {
    const {data} = await $host.post('api/user/login', user)
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const auth = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const logout = async () => {
    const {data} = await $authHost.get('api/user/logout')
    localStorage.removeItem('token')
    return data
}