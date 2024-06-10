import {$host} from "./index";

export const getOne = async (id) => {
    const {data} = await $host.get(`/api/participant/one?id=${id}`)
    return data
}

export const getAll = async (id) => {
    const {data} = await $host.get(`/api/participant?id=${id}`)
    return data
}

export const create = async (participant) => {
    const {data} = await $host.post('/api/participant', participant)
    return data
}

export const update = async (id, participant) => {
    const {data} = await $host.put(`/api/participant?id=${id}`, participant)
    return data
}

export const updateStatus = async (profileId) => {
    const {data} = await $host.put(`/api/participant/status?profileId=${profileId}`)
    return data
}

export const deleteOne = async (id) => {
    return await $host.delete(`/api/participant/one?id=${id}`)
}

export const deleteAll = async (profileId) => {
    return await $host.delete(`/api/participant?profileId=${profileId}`)
}