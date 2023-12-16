import {Link, Outlet, useLoaderData, useParams} from "@remix-run/react";

import type {LoaderFunction} from "@remix-run/node";
import {getUser, requireUserId} from "~/utils/auth.server";
import {getClientsByUserId} from "~/utils/client.server";
import {useTranslation} from "~/utils/useTranslation";
import AddClient from "~/components/add-client";

export const loader: LoaderFunction = async ({request}) => {
    await requireUserId(request)
    const user = await getUser(request);
    if (!user) {
        return null
    }
    return getClientsByUserId(user.id);
}
export default function ClientList() {
    const {t} = useTranslation();
    const {clientID} = useParams();
    const loaderData = useLoaderData() as any;
    return (
        <div>
            <AddClient/>
            <div className="flex h-[calc(100vh-48px)] bg-gray-100">
                <div className="flex flex-col w-1/4 px-4 py-3 bg-white">
                    <div className="flex flex-row items-center justify-between border-b pb-2">
                        <h3 className="text-lg font-semibold">{t('clientName')}</h3>
                    </div>
                    {loaderData.map((client: any) => (
                        <Link to={`/client-list/${client.id}`}
                              key={client.id}
                              className={`flex flex-row items-center justify-between rounded-md ${client.id === clientID && 'bg-blue-200'}`}
                        >
                            <p className='p-1'>{client.name}</p>
                        </Link>
                    ))}
                </div>
                <div className="bg-white p-4 flex-1 w-3/4">
                    <Outlet/>
                </div>

            </div>
        </div>
    );
}