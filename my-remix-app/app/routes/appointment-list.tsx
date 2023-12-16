import type {LoaderFunction} from "@remix-run/node";
import {requireUserId} from "~/utils/auth.server";

export const loader: LoaderFunction = async ({request}) => {
    await requireUserId(request)

    return null
}
var arrayForDisplayPurpose = [
    {
        "date": "1-3-2022",
        "time": "19:15git",
        "client": "Client1",
        "workoutType": "MUSCLE"
    },{
        "date": "4-2-2023",
        "time": "10:30",
        "client": "Client2",
        "workoutType": "ENDURANCE"
    },{
        "date": "1-2-2021",
        "time": "12:25",
        "client": "Client3",
        "workoutType": "CARDIO"
    }
]
export default function AppointmentList(){
    return (
        <div>
            <h1>Scheduled Appointments</h1>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Hour</th>
                        <th>Client Name</th>
                        <th>Workout Type</th>
                    </tr>
                </thead>
                <tbody>
                {arrayForDisplayPurpose.map((item)=>{
                    return(
                        <tr>
                            <td>{item.date}</td>
                            <td>{item.time}</td>
                            <td>{item.client}</td>
                            <td>{item.workoutType}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )

}