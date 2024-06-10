import {$host} from "./index";

export const getAllParticipantStatuses = async () => {
    const {data} = await $host.get(`/api/statuses/participant`)
    return data
}

export const getAllAccountStatuses = async () => {
    const {data} = await $host.get(`/api/statuses/account`)
    return data
}