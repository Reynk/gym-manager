import {Outlet, Link} from "@remix-run/react";

import {useState} from 'react';
import type {LoaderFunction} from "@remix-run/node";
import {requireUserId} from "~/utils/auth.server";

export const loader: LoaderFunction = async ({request}) => {
    await requireUserId(request)
    return null
}
export default function ClientList() {
    const clients = [
        {id: 1, name: 'Client 1', info: 'Info about Client 1'},
        {id: 2, name: 'Client 2', info: 'Info about Client 2'},
        {id: 3, name: 'Client 3', info: 'Info about Client 3'},
    ]; // Replace this with your actual data

    const [selectedClient, setSelectedClient] = useState(null);

    const handleSelect = (client: { name: string; id: number; info: string }) => {
        setSelectedClient(client as any);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-blue-500 mb-4">Client List Route</h1>
                <div className="flex flex-col w-full max-w-md px-4 py-3 rounded bg-white shadow-lg">
                    <div className="flex flex-row items-center justify-between border-b pb-2">
                        <h3 className="text-lg font-semibold">ID</h3>
                        <h3 className="text-lg font-semibold">Name</h3>
                    </div>
                    {clients.map((client) => (
                        <Link to={`/client-list/${client.id}`}
                              key={client.id}
                              className={`className="flex flex-row items-center justify-between pt-2" ${selectedClient === client ? 'bg-blue-200' : ''}`}
                              onClick={() => handleSelect(client)}
                        >
                            {client.name}
                        </Link>
                    ))}
                </div>
            </div>
            <Outlet context={selectedClient}/>
        </div>
    );
}