import { getRequests, deleteRequest } from "./dataAccess.js"

export const Requests = () => {
    const requests = getRequests()

    let html = `
        <ul>
            ${
                requests.map(convertRequestToListElement).join("\n")
            }
        </ul>
    `
    return html
}

const convertRequestToListElement = (request) => {
    return `
        <li>
        <strong>Service Order ${request.id}</strong>, needed by ${request.neededBy} at <em>${request.address} (address)</em>, for <strong>${request.description}</strong> with a max budget of $${request.budget}.
        <button class="request__delete" id="request--${request.id}">Delete</button>
        </li>
    `
}

// Event listener for delete button
const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})