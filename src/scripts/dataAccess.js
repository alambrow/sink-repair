const applicationState = {
    plumbers: [],
    requests: [],
    completions: []
}

const API = "http://localhost:8088"

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

export const getRequests = () => {
    return [...applicationState.requests]
}

export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
    .then(response => response.json())
    .then(
        (serviceRequests) => {
            applicationState.plumbers = serviceRequests
        }
    )
}

export const getPlumbers = () => {
    return [...applicationState.plumbers]
}


const mainContainer = document.querySelector("#container")

// HTTP Request (Post) (Also: GET, PUT, DELETE)
export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

// HTTP request to fetch completed projects
export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (completions) => {
                applicationState.completions = completions
            }
        )
}

// HTTP request to save completed project in API through stateChanged event
export const saveCompletion = (completedRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completedRequest)
    }
    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}


// HTTP Request to delete service request from database
export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}