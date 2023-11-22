import {
    Form,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import appStylesHref from "./app.css";
import {LinksFunction} from "@remix-run/node";
import {useSWEffect, LiveReload} from "@remix-pwa/sw";
import {badgingSupported, setBadge} from "@remix-pwa/client";
import {useEffect} from "react";

export const links: LinksFunction = () => {
    return [{rel: "stylesheet", href: appStylesHref}];
}

export default function App() {
    useSWEffect();
        useEffect(() => {
            async function checkAndSetBadge() {
                const isSupported = await badgingSupported();
                if (isSupported) {
                    const badge = await navigator.setAppBadge(10);
                    await setBadge(10).catch((error) => {
                        console.error('Failed to set badge:', error);
                    });
                    console.log('Badge set:', badge);
                } else {
                    console.log('Badging API not supported');
                }
            }

            checkAndSetBadge().then(r => console.log(r));
        }, []);
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <Meta/>
            {/* <link rel="manifest" href="manifest.webmanifest"/> */}
            <Links/>
            <title>Proiect Gym</title>
        </head>
        <body>
        <div id="sidebar">
            <h1>Remix Contacts</h1>
            <div>
                <Form id="search-form" role="search">
                    <input
                        id="q"
                        aria-label="Search contacts"
                        placeholder="Search"
                        type="search"
                        name="q"
                    />
                    <div id="search-spinner" aria-hidden hidden={true}/>
                </Form>
                <Form method="post">
                    <button type="submit">New</button>
                </Form>
            </div>
            <nav>
                <ul>
                    <li>
                        <a href={`/contacts/1`}>Your Name</a>
                    </li>
                    <li>
                        <a href={`/contacts/2`}>Your Friend</a>
                    </li>
                </ul>
            </nav>
        </div>
        <Outlet/>
        <ScrollRestoration/>
        <Scripts/>
        <LiveReload/>
        </body>
        </html>
    );
}
