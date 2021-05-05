import { getRequests } from "./dataAccess.js"

export const Requests = () => {
    const requests = getRequests()

    let html = `
        <ul>
            ${
                requests.map(convertRequestToListElement)
            }
        </ul>
    `
    return html
}

const convertRequestToListElement = (request) => {
    return `
        <li>${request.description}</li>
    `
}