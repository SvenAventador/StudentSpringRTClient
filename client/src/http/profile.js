import {$host} from "./index";

export const getOne = async (id) => {
    const {data} = await $host.get(`api/profile?id=${id}`)
    return data
}

export const settingProfile = async (profile) => {
    const {data} = await $host.put('api/profile', profile)
    return data
}