import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import stylesheet from "./tailwind.css";
import type {LinksFunction} from "@remix-run/node";
import {useSWEffect, LiveReload} from "@remix-pwa/sw";
import {badgingSupported, setBadge} from "@remix-pwa/client";
import {useEffect} from "react";
import Navbar from "./components/navbar";

export const links: LinksFunction = () => {
    return [{rel: "stylesheet", href: stylesheet}];
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
            <link rel="manifest" href="manifest.webmanifest"/>
            <Links/>
            <title>Proiect Gym</title>
        </head>
        <body>
        <Navbar/>
        <Outlet/>
        <ScrollRestoration/>
        <Scripts/>
        <LiveReload/>
        </body>
        </html>
    );
}
