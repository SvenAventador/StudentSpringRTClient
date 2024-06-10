import {$host} from "./index";

export const getAllProfile = async () => {
    const {data} = await $host.get('api/admin/participant')
    return data
}

export const updateAccountStatus = async (id, accountStatusId, status) => {
    const {data} = await $host.put(`api/admin/participant?id=${id}&accountStatusId=${accountStatusId}`, {status})
    return data
}

export const getAllApplication = async () => {
    const {data} = await $host.get('api/admin/application')
    return data
}

export const updateApplicationStatus = async (id, applicationStatusId, status) => {
    const {data} = await $host.put(`api/admin/application?id=${id}&applicationStatusId=${applicationStatusId}`, {status})
    return data
}

export const getDocument = async (userId) => {
    const {data} = await $host.get(`api/admin/application/document?userId=${userId}`)
    return data
}


export const createDocument = async (profileId, userId) => {
    const {data} = await $host.post(`api/admin/application?profileId=${profileId}&userId=${userId}`)
    return data
}

export const updateProfile = async (profile) => {
    const {data} = await $host.put(`api/admin/application/profile`, profile)
    return data
}

export const updateParticipant = async (participant) => {
    const {data} = await $host.put(`api/admin/application/participant`, participant)
    return data
}

export const update = async (id, application) => {
    const {data} = await $host.put(`api/admin/application/application?id=${id}`, application)
    return data
}