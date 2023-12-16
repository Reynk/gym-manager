import * as React from 'react';
import {useRouteData} from './useRouteData';
import type { TranslationsKeys} from "~/utils/englishTranslations";
import {en} from "~/utils/englishTranslations";
import {ro} from "~/utils/romanianTranslations";

export function useTranslation() {
    // const language = useRouteData('/')?.language || 'RO'; // fetch cookie
    const language = 'EN';
    const language = useRouteData('/')?.language || 'RO';
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

    return {t};
}
