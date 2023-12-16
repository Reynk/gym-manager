import type {LoaderFunction} from "@remix-run/node";
import {requireUserId} from "~/utils/auth.server";
import {prisma} from "~/utils/prisma.server";
import {useLoaderData} from "@remix-run/react";
import {useTranslation} from "~/utils/useTranslation";


export const loader: LoaderFunction = async ({request}) => {
    await requireUserId(request)
    const data = await prisma.appointment.findMany()
    return data
}

export default function AppointmentList(){
    const { t } = useTranslation();
    const data = useLoaderData() as any
    // var data = [
    //     {"_id":{"$oid":"657d96940605561607c8a045"},
    //         "Date":{
    //         "$date":{
    //             "$numberLong":"1704412800000"}
    //         },
    //         "Client":"Marmota",
    //         "ClientId":
    //             {"$oid":"657d91bc48bde091fec52d30"},
    //         "WorkoutType":"Cariceps"}
    // ]
    console.log(data)
    return (
        <div>
            <h1>{t('scheduledAppointments')}</h1>
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
                {/*{data.map((item:any)=>{*/}
                {/*    // return(*/}
                {/*    //     <tr>*/}
                {/*    //         <td>{item.Date.$date}</td>*/}
                {/*    //         <td>{item.time}</td>*/}
                {/*    //         <td>{item.client.name}</td>*/}
                {/*    //         <td>{item.workoutType}</td>*/}
                {/*    //     </tr>*/}
                {/*    // )*/}
                {/*})}*/}
                </tbody>
            </table>
        </div>
    )

}