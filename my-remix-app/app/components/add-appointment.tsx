import { useEffect, useState } from "react";
import { FormField } from "~/components/form-field";
import { Select } from "~/components/select-field";
import {useActionData, useFetcher, useParams} from "@remix-run/react";
import { useTranslation } from "~/utils/useTranslation";

export default function AddAppointment() {
    const { t } = useTranslation();
    const actionData = useActionData() as any;
    const params = useParams();
    console.log('params', params)
    const fetcher = useFetcher();
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        workoutType: '',
    });

    useEffect(() => {
        if (actionData == 'Success adding appointment') {
            setFormData({
                date: '',
                time: '',
                workoutType: '',
            });
        }
    }, [actionData]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
        setFormData(form => ({ ...form, [field]: event.target.value }));
    };

    return (
        <fetcher.Form method="post" action='/add-appointment' className="bg-gray-200 p-6">
            <div className='flex justify-between items-center'>
                <div>
                    <input type='hidden' name='clientId' value={params?.clientID}/>
                    <FormField
                        label={t('date')}
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange(e, 'date')}
                        htmlFor={"date"} />
                    <FormField
                        label={t('hour')}
                        type="time"
                        value={formData.time}
                        onChange={(e) => handleInputChange(e, 'time')}
                        htmlFor={"time"} />
                    <Select
                        label={t('workoutType')}
                        value={formData.workoutType}
                        onChange={(e) => handleInputChange(e, 'workoutType')}
                        options={["CARDIO", "ENDURANCE", "MUSCLE"]}
                        htmlFor={"workoutType"} />
                    <button type="submit" name="_action"
                        className="rounded-xl bg-yellow-300 p-2 text-blue-600 font-semibold transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1">
                        {t('add')}
                    </button>
                </div>
            </div>
        </fetcher.Form>
    );
}