import {useRouteData} from "~/utils/useRouteData";
import {useFetcher, useLocation, useSubmit} from "@remix-run/react";
import {useRef} from "react";

export function LanguageSelector() {
    const language = useRouteData('/')?.language || 'RO';
    const fetcher = useFetcher();
    const formRef = useRef<HTMLFormElement>(null);
    let submit = useSubmit();
    const location = useLocation();
    return (
        <fetcher.Form method="post" ref={formRef}>
            <input
                type="text"
                name="action"
                defaultValue="changeLanguage"
                aria-hidden="true"
                hidden
            />
            <input
                type="text"
                name="redirectUrl"
                defaultValue={location.pathname + location.search}
                aria-hidden="true"
                hidden
            />
            <select value={language} name='language' onChange={() => submit(formRef.current, {method: 'post'})}
                    className="text-blue-600 font-semibold bg-transparent">
                <option value="RO">RO</option>
                <option value="EN">EN</option>
            </select>
        </fetcher.Form>
    );
}