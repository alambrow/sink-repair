import { getRequests, deleteRequest, getPlumbers, saveCompletion, getCompletions } from "./dataAccess.js"

// basic rendering function for submitted requests
export const Requests = () => {
    
    const requestsArray = getRequests()
    const completionsArray = getCompletions()

    for (let i = 0; i < requestsArray.length; i++) {
        for (let p = 0; p < completionsArray.length; p++) {
            if(requestsArray[i].id === completionsArray[p].requestId) {
                delete requestsArray[i]
                break
            }
        }
    }
    
    

    let html = `
        <ul>
            ${
                requestsArray.map(convertRequestToListElement).join("\n")
            }
            ${
                completionsArray.map(convertCompletionToListElement).join("\n")
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

const convertCompletionToListElement = (completion) => {
    return `
    <li>
    <strong>Service Order ${completion.id}</strong>, completed on ${completion.date_created}.
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
            const timestamp = Date.now()
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