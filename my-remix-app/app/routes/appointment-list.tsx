import type {LoaderFunction} from "@remix-run/node";
import {requireUserId} from "~/utils/auth.server";

export const loader: LoaderFunction = async ({request}) => {
    await requireUserId(request)
    return null
}
export default function AppointmentList(){
    return (
        <div>
            <h1>Appointment List Route</h1>
        </div>
    )

}