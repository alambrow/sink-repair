import { fetchRequests } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"


const mainContainer = document.querySelector("#container")

const render = () => {
    fetchRequests().then(
        () => {
            mainContainer.innerHTML = SinkRepair()
        }
    )
}

// event listener for change of state event for input form
mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)

render()