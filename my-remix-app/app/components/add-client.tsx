import {useEffect, useState} from "react";
import {FormField} from "~/components/form-field";
import {Select} from "~/components/select-field";
import {useActionData, useFetcher} from "@remix-run/react";
import {useTranslation} from "~/utils/useTranslation";

export default function AddClient() {
    const { t } = useTranslation();
    const actionData = useActionData() as any;
    const fetcher = useFetcher()
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        height: '',
        weight: '',
        gender: '',
    });
    useEffect(() => {
        if (actionData == 'Success adding client') {
            setFormData({
                name: '',
                age: '',
                height: '',
                weight: '',
                gender: '',
            })
        }
    }, [actionData]);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setFormData(form => ({...form, [field]: event.target.value}));
    }

    return (
        <fetcher.Form method="post" action='/add-client' className="bg-gray-200 p-6">
            <div className='flex justify-between items-center'>
                <div>
                    <FormField
                        htmlFor="name"
                        label={t('name')}
                        value={formData.name}
                        onChange={e => handleInputChange(e, 'name')}
                    />
                </div>
                <div>
                    <FormField
                        htmlFor="age"
                        label={t('age')}
                        value={formData.age}
                        onChange={e => handleInputChange(e, 'age')}
                    />
                </div>
                <div>
                    <FormField
                        htmlFor="height"
                        label={t('height')}
                        value={formData.height}
                        onChange={e => handleInputChange(e, 'height')}
                    />
                </div>
                <div>
                    <FormField
                        htmlFor="weight"
                        label={t('weight')}
                        value={formData.weight}
                        onChange={e => handleInputChange(e, 'weight')}
                    />
                </div>
                <div>
                    <Select
                        htmlFor="gender"
                        label={t('gender')}
                        value={formData.gender}
                        onChange={e => handleInputChange(e, 'gender')}
                        options={['M', 'F', 'X']}
                    />
                </div>
                <div>
                    <p className='text-gray-200'>test</p>
                    <button type="submit" name="_action"
                            className="rounded-xl bg-yellow-300 p-2 text-blue-600 font-semibold transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1">
                        {t('add')}
                    </button>
                </div>
            </div>

        </fetcher.Form>
    )
}