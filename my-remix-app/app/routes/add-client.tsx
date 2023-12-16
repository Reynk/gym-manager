// app/routes/add-client.tsx
import { useState } from 'react';
import { Layout } from '~/components/layout';
import { FormField } from '~/components/form-field';
import { createClient } from '~/utils/client.server';
import { json, redirect } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import {getUser} from "~/utils/auth.server";
import {Select} from "~/components/select-field";
export const action: ActionFunction = async ({ request }) => {
    const user = await getUser(request);
    const form = await request.formData();
    const clientData = {
        name: String(form.get('name')),
        age: Number(form.get('age')),
        height: String(form.get('height')),
        weight: String(form.get('weight')),
        gender: form.get('gender') as "M" | 'F' | 'X',
        userId: user?.id || ''
    };
    console.log(form)
    console.log(clientData)
    // Validate the form data here

    // Create the new client
    const newClient = await createClient(clientData);

    // If the client was created successfully, redirect to the client list page
    if (newClient) {
        return redirect('/client-list');
    } else {
        // If there was an error, return a 400 response
        return json({ error: 'Could not create client' }, { status: 400 });
    }
};
export default function AddClient() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        height: '',
        weight: '',
        gender: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setFormData(form => ({...form, [field]: event.target.value}));
    }

    return (
        <Layout>
            <form method="post" className="rounded-2xl bg-gray-200 p-6 w-96">
                <h1 className="text-5xl font-extrabold text-yellow-300">Add Client</h1>
                <FormField
                    htmlFor="name"
                    label="Name"
                    value={formData.name}
                    onChange={e => handleInputChange(e, 'name')}
                />
                <FormField
                    htmlFor="age"
                    label="Age"
                    value={formData.age}
                    onChange={e => handleInputChange(e, 'age')}
                />
                <FormField
                    htmlFor="height"
                    label="Height"
                    value={formData.height}
                    onChange={e => handleInputChange(e, 'height')}
                />
                <FormField
                    htmlFor="weight"
                    label="Weight"
                    value={formData.weight}
                    onChange={e => handleInputChange(e, 'weight')}
                />
                <Select
                    htmlFor="gender"
                    label="Gender"
                    value={formData.gender}
                    onChange={e => handleInputChange(e, 'gender')}
                    options={['M', 'F', 'X']}
                />
                <button type="submit" name="_action" className="rounded-xl mt-2 bg-yellow-300 px-3 py-2 text-blue-600 font-semibold transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1">
                    Add Client
                </button>
            </form>
        </Layout>
    )
}