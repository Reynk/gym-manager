import {Link, Outlet, useLoaderData} from "@remix-run/react";

import {useState} from 'react';
import type {LoaderFunction} from "@remix-run/node";
import {getUser, requireUserId} from "~/utils/auth.server";
import {getClientsByUserId} from "~/utils/client.server";
import {useTranslation} from "~/utils/useTranslation";

export const loader: LoaderFunction = async ({request}) => {
    await requireUserId(request)
    const user = await getUser(request);
    if (!user) {
        return null
    }
    return getClientsByUserId(user.id);
}
export default function ClientList() {
    const { t } = useTranslation();
    const loaderData = useLoaderData() as any;
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-blue-500 mb-4">Client List Route</h1>
                <div className="flex flex-col w-full max-w-md px-4 py-3 rounded bg-white shadow-lg">
                    <div className="flex flex-row items-center justify-between border-b pb-2">
                        <h3 className="text-lg font-semibold">ID</h3>
                        <h3 className="text-lg font-semibold">{t('clientName')}</h3>
                    </div>
                    {loaderData.map((client:any) => (
                        <Link to={`/client-list/${client.id}`}
                              key={client.id}
                              className={`className="flex flex-row items-center justify-between pt-2`}
                        >
                            {client.name}
                        </Link>
                    ))}
                </div>
                <Outlet />
            </div>
        </div>
    );
}