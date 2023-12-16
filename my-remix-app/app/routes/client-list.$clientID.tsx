
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
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p>info</p>
        </div>)
}