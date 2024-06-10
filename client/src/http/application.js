import {$host} from "./index";

export const getOneApplication = async (id) => {
    const {data} = await $host.get(`api/application/one?id=${id}`)
    return data
}

export const getAllApplication = async (profileId) => {
    const {data} = await $host.get(`api/application?profileId=${profileId}`)
    return data
}

export const create = async (application) => {
    const {data} = await $host.post('api/application', application)
    return data
}

export const update = async (id, application) => {
    const {data} = await $host.put(`api/application?id=${id}`, application)
    return data
}

export const updateStatus = async (profileId) => {
    const {data} = await $host.put(`/api/application/status?profileId=${profileId}`)
    return data
}

export const deleteOne = async (id) => {
     return await $host.delete(`api/application/one?id=${id}`)
}

export const deleteAll = async (profileId) => {
    return await $host.delete(`api/application/all?profileId=${profileId}`)
}
