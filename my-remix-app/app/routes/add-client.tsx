// app/routes/add-client.tsx
import {createClient} from '~/utils/client.server';
import type {ActionFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {getUser} from "~/utils/auth.server";


export const action: ActionFunction = async ({request}) => {
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
        return 'Success adding client';
    } else {
        // If there was an error, return a 400 response
        return json({error: 'Could not create client'}, {status: 400});
    }
};
