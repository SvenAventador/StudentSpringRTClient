import {$host} from "./index";

export const createDocument = async (profileId) => {
    const {data} = await $host.post(`api/document?profileId=${profileId}`)
    return data
}

export const getAll = async (profileId) => {
    const {data} = await $host.get(`api/document?profileId=${profileId}`)
    return data
}