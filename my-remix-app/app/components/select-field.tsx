// app/components/select.tsx

import { useEffect, useState } from "react"

interface SelectProps {
    htmlFor: string,
    label: string,
    value: any,
    onChange?: (...args: any) => any,
    error?: string,
    options: string[]
}

export function Select({
                           htmlFor,
                           label,
                           value,
                           onChange = () => {},
                           error = "",
                           options
                       }: SelectProps) {
    const [errorText, setErrorText] = useState(error)

    useEffect(() => {
        setErrorText(error)
    }, [error])

    return (
        <>
            <label htmlFor={htmlFor} className="text-blue-600 font-semibold">{label}</label>
            <select
                id={htmlFor}
                name={htmlFor}
                className="w-full p-2 rounded-xl my-2"
                value={value}
                onChange={e => {
                    onChange(e)
                    setErrorText('')
                }}
            >
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
            <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
                {errorText || ''}
            </div>
        </>
    )
}