import {useOutletContext} from "react-router";

export default function IndividualClient() {
    const selectedClient = useOutletContext() as any;
    return (
        <div className="mt-4 p-4 bg-white shadow rounded">
            <h2 className="text-xl font-bold">{selectedClient.name}</h2>
            <p>{selectedClient.info}</p>
        </div>)
}