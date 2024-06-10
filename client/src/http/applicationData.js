import {$host} from "./index";

export const getParticipant = async (profileId) => {
    const {data} = await $host.get(`api/application/data/participant?profileId=${profileId}`)
    return data
}

export const getTechGroup = async (profileId) => {
    const {data} = await $host.get(`api/application/data/tech?profileId=${profileId}`)
    return data
}

export const getDirection = async () => {
    const {data} = await $host.get(`api/application/data/direction`)
    return data
}

export const getNomination = async (directionId) => {
    const {data} = await $host.get(`api/application/data/nomination?directionId=${directionId}`)
    return data
}

export const getForms = async () => {
    const {data} = await $host.get(`api/application/data/forms`)
    return data
}