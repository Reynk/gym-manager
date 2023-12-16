import {Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData,} from "@remix-run/react";
import stylesheet from "./tailwind.css";
import type {ActionFunction, LinksFunction, LoaderFunction} from "@remix-run/node";
import { json} from "@remix-run/node";

import {LiveReload, useSWEffect} from "@remix-pwa/sw";
import Navbar from "./components/navbar";
import {getLanguage, getUser, setLanguage} from "~/utils/auth.server";

export const links: LinksFunction = () => {
    return [{rel: "stylesheet", href: stylesheet}];
}
export const loader: LoaderFunction = async ({request}) => {
    const language = await getLanguage(request);
    return json({loggedIn: !!(await getUser(request)), language: language})
}
interface LoaderDataType{
    loggedIn: boolean;
    language: string;
}
export const action: ActionFunction = async ({ request }) => {
    const form = Object.fromEntries(await request.formData());
    if (form.action == 'changeLanguage') {
        return await setLanguage(String(form.language), String(form.redirectUrl), request);
    }
};
export default function App() {
    const data = useLoaderData() as LoaderDataType;
    console.log(data)
    useSWEffect();
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <Meta/>
            <link rel="manifest" href="manifest.webmanifest"/>
            <Links/>
            <title>Proiect Gym</title>
        </head>
        <body>
        <Navbar loggedIn={data.loggedIn}/>
        <Outlet/>
        <ScrollRestoration/>
        <Scripts/>
        <LiveReload/>
        </body>
        </html>
    );
}
