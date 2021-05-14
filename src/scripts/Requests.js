import { getRequests, deleteRequest, getPlumbers, saveCompletion } from "./dataAccess.js"

// basic rendering function for submitted requests
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

// plumber selection dropdown
const convertRequestToListElement = (request) => {
    const plumbers = getPlumbers()
    
    return `
        <li>
        <strong>Service Order ${request.id}</strong>, needed by ${request.neededBy} at <em>${request.address} (address)</em>, for <strong>${request.description}</strong> with a max budget of $${request.budget}.
        
        <select class="plumbers" id="plumbers">
        <option value="">Choose</option>
        ${plumbers.map(
            plumber => {
                return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`}).join("")}
        </select>
        
        <button class="request__delete" id="request--${request.id}">Delete</button>
        </li>
    `
}
// event listener for dropdown selection event
const mainContainer = document.querySelector("#container")

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const timestampUTC = Date.now()
            const timestamp = new (timestampUTC).toLocaleDateString("en-US")
            const completion = { 
                "requestId": parseInt(requestId),
                "plumberId": parseInt(plumberId),
                "date_created": timestamp
            }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            saveCompletion(completion)
        }
    }
)





// Event listener for delete button
mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})