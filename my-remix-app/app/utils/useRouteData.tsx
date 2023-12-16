import {useMatches} from '@remix-run/react';

export const useRouteData = (routeId: string) => {
    const matches = useMatches();
    const data = matches.find((match) => match.pathname === routeId)?.data as any;

    return data || undefined;
};