import {ro} from "~/utils/romanianTranslations";
import type { TranslationsKeys} from "~/utils/englishTranslations";
import {en} from "~/utils/englishTranslations";
import React from "react";

export function useTranslation() {
    // const language = useRouteData('/')?.language || 'RO'; // fetch cookie
    const language = 'RO';
    const t = React.useCallback(
        (key: Omit<string, TranslationsKeys>) => {
            if (key === '0') return '0';

            if (language == 'EN') {
                return (
                    en[key as TranslationsKeys] ??
                    `NEEDS TRANSLATION FOR EN ${key}`
                );
            }
            return (
                ro[key as TranslationsKeys] ?? `NEEDS TRANSLATION FOR RO ${key}`
            );
        },
        [language]
    );

    return { t };
}