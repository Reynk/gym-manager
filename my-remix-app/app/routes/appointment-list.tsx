import type {LoaderFunction} from "@remix-run/node";
import {requireUserId} from "~/utils/auth.server";
import {prisma} from "~/utils/prisma.server";
import {useLoaderData} from "@remix-run/react";
import {useTranslation} from "~/utils/useTranslation";


export const loader: LoaderFunction = async ({request}) => {
    await requireUserId(request)
    const data = await prisma.appointment.findMany({
        include: {
            client: true
        }
    })
    return data;
}

export default function AppointmentList(){
    const { t } = useTranslation();
    const data = useLoaderData() as any

    return (
        <div className='flex flex-col gap-2 pe-4 bg-white shadow-md rounded px-8 pt-6 pb-8'>
            <h1 className="text-center text-2xl font-bold">{t('scheduledAppointments')}</h1>
            <table className="">
                <thead>
                <tr>
                    <th className="px-4 py-2">{t('date')}</th>
                    <th className="px-4 py-2">{t('hour')}</th>
                    <th className="px-4 py-2">{t('clientName')}</th>
                    <th className="px-4 py-2">{t('workoutType')}</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item: any) => {
                    const date = item.date.split("T")[0]
                    return (
                        <tr key={item.id}>
                            <td className="border px-4 py-2">{date}</td>
                            <td className="border px-4 py-2">{item.time}</td>
                            <td className="border px-4 py-2">{item.client.name}</td>
                            <td className="border px-4 py-2">{t(item.workoutType)}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>)

}