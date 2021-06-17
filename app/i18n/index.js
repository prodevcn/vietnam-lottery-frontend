import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './translations/en.json';
import vn from './translations/vn.json';

i18n.use(initReactI18next).init({
    lng: 'en',
    resources: {
        en: en,
        vn: vn,
    },
    react: {
        useSuspense: false,
    },
});

export default i18n;