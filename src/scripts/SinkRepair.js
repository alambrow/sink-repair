import { ServiceForm } from "./ServiceForm.js"
import { Requests } from "./Requests.js"

export const SinkRepair = () => {
    return `
        <h1>Maude and Merle's Sink Repair</h1>
        <section class="serviceForm">
            ${ServiceForm()}
        </section>

        <section class="serviceRequests">
            <h1>Service Requests</h1>
            ${Requests()}
        </section>
    `
}