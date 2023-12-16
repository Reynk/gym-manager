// app/routes/login.tsx
import {useEffect, useRef, useState} from 'react'
import {Layout} from '~/components/layout'
import {FormField} from '~/components/form-field'
import type {ActionFunction, LoaderFunction} from "@remix-run/node";
import {json, redirect} from "@remix-run/node";
import {validateName, validatePassword} from "~/utils/validators.server";
import {getUser, login, register} from "~/utils/auth.server";
import {useActionData} from "@remix-run/react";
import {useTranslation} from "~/utils/useTranslation";

export const action: ActionFunction = async ({request}) => {
    const form = await request.formData()
    const action = form.get('_action')
    const username = form.get('username')
    const password = form.get('password')

    if (typeof username !== 'string' || typeof password !== 'string') {
        return json({error: `Invalid Form Data`, form: action}, {status: 400})
    }

    const errors = {
        username: validateName(username),
        password: validatePassword(password),
    }

    if (Object.values(errors).some(Boolean))
        return json({errors, fields: {username, password}, form: action}, {status: 400})

    switch (action) {
        case 'login': {
            return await login({username, password})
        }
        case 'register': {
            return await register({username, password})
        }
        default:
            return json({error: `Invalid Form Data`}, {status: 400});
    }
}
export const loader: LoaderFunction = async ({request}) => {
    // If there's already a user in the session, redirect to the home page
    return (await getUser(request)) ? redirect('/') : null
}
export default function Login() {
    const { t } = useTranslation();
    const actionData = useActionData() as any;
    const firstLoad = useRef(true)
    const [errors, setErrors] = useState(actionData?.errors || {})
    const [formError, setFormError] = useState(actionData?.error || '')
    const [formData, setFormData] = useState({
        username: '',
        password: '',

    })
    const [action, setAction] = useState('login')
    // Updates the form data when an input changes
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setFormData(form => ({...form, [field]: event.target.value}))
    }
    useEffect(() => {
        if (!firstLoad.current) {
            const newState = {
                username: '',
                password: ''
            }
            setErrors(newState)
            setFormError('')
            setFormData(newState)
        }
    }, [action])

    useEffect(() => {
        if (!firstLoad.current) {
            setFormError('')
        }
    }, [formData])

    useEffect(() => {
        firstLoad.current = false
    }, [])
    return (
        <Layout>
            <div className="h-full justify-center items-center flex flex-col gap-y-4">
                <button
                    onClick={() => setAction(action == 'login' ? 'register' : 'login')}
                    className="absolute top-14 right-8 rounded-xl bg-yellow-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
                >
                    {action === 'login' ? t('signUp') : t('signIn')}
                </button>
                <h2 className="text-5xl font-extrabold text-yellow-300">{t('welcomeMessage')}</h2>
                <p className="font-semibold text-slate-300">{action === 'login' ? t('welcomeMessage2') : t('signUpMessage')}</p>

                <form method="POST" className="rounded-2xl bg-gray-200 p-6 w-96">
                    <div
                        className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">{formError}</div>
                    <FormField
                        htmlFor="username"
                        label={t('username')}
                        value={formData.username}
                        onChange={e => handleInputChange(e, 'username')}
                        error={errors?.username}
                    />
                    <FormField
                        htmlFor="password"
                        type="password"
                        label={t('password')}
                        value={formData.password}
                        onChange={e => handleInputChange(e, 'password')}
                        error={errors?.password}
                    />
                    <div className="w-full text-center">
                        <button type="submit" name="_action" value={action}
                                className="rounded-xl mt-2 bg-yellow-300 px-3 py-2 text-blue-600 font-semibold transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1">
                            {
                                action === 'login' ? t('signIn') : t('signUp')
                            }
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}