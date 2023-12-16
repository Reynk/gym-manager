
import type {LoaderFunction} from "@remix-run/node";
import { redirect} from "@remix-run/node";
import { requireUserId} from "~/utils/auth.server";
import {getClient} from "~/utils/client.server";
import {useLoaderData} from "@remix-run/react";
export const loader: LoaderFunction = async ({request, params}) => {
    await requireUserId(request)
    if (!params.clientID){
        return redirect(`/client-list`)
    }
    return getClient(params.clientID);
}
export default function IndividualClient() {
    const user = useLoaderData() as any
    console.log('USER', user)
    return (
        <div className="mt-4 p-4 bg-white shadow rounded">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div><h2 className="text-xl font-bold">Name</h2></div>
                <div><h2 className="text-xl font-bold">{user.name}</h2></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>Age</div>
                <div>{user.age}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>Weight</div>
                <div>{user.weight}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>Height</div>
                <div>{user.height}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>Gender</div>
                <div>{user.gender}</div>
            </div>
        </div>)
}