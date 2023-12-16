
import type {LoaderFunction} from "@remix-run/node";
import { redirect} from "@remix-run/node";
import { requireUserId} from "~/utils/auth.server";
import {getClient} from "~/utils/client.server";
import {useLoaderData} from "@remix-run/react";
import {useTranslation} from "~/utils/useTranslation";
import {useRouteData} from "~/utils/useRouteData";
export const loader: LoaderFunction = async ({request, params}) => {
    await requireUserId(request)
    if (!params.clientID){
        return redirect(`/client-list`)
    }
    return getClient(params.clientID);
}

export default function IndividualClient() {
    const {t} = useTranslation();
    const language = useRouteData('/')?.language || 'RO';
    const user = useLoaderData() as any

    function convertUnit(unit: string, language: string, unitType: string) {
        const constant = unitType === 'weight' ? 2.20462 : 0.393701;
        if (language === 'EN') {
            if (unitType === 'height') {
                const totalInches = parseInt(unit) * 0.393701;
                const feet = Math.floor(totalInches / 12);
                const inches = Math.round(totalInches % 12);
                return `${feet}'${inches}`;
            } else {
                return Math.floor(parseInt(unit) * constant);
            }
        } else {
            return unit;
        }
    }

    console.log('USER', user)
    return (
        <div className='pe-4'>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div><h1 className="text-xl font-bold">{user.name}</h1>
                    <hr/>
                </div>

            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>Age</div>
                <div>{user.age}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>Weight</div>
                <div>{convertUnit(user.weight, language, 'weight')} {t('weightType')}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>Height</div>

                <div>{convertUnit(user.height, language, 'height')}{t('heightType')}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>Gender</div>
                <div>{user.gender}</div>
            </div>
        </div>)
}