
import type {LoaderFunction} from "@remix-run/node";
import { redirect} from "@remix-run/node";
import { requireUserId} from "~/utils/auth.server";
import {getClient} from "~/utils/client.server";
import {useLoaderData} from "@remix-run/react";
import AddAppointment from "~/components/add-appointment";
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
                return `${feet}'${inches}"`;
            } else {
                return Math.floor(parseInt(unit) * constant);
            }
        } else {
            return unit;
        }
    }

    console.log('USER', user)
    return (
        <div className='flex flex-col gap-2 pe-4 bg-white shadow-md rounded px-8 pt-6 pb-8'>
            <div  className=''>
                <div><h1 className="text-xl font-bold">{user.name}</h1>
                    <hr/>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>{t('age')}</div>
                <div>{user.age}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>{t('weight')}</div>
                <div id='weight'>{convertUnit(user.weight, language, 'weight')} {t('weightType')}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>{t('height')}</div>
                <div id='height'>{convertUnit(user.height, language, 'height')}{t('heightType')}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>{t('gender')}</div>
                <div>{user.gender}</div>
            </div>
            <AddAppointment/>
        </div>)
}