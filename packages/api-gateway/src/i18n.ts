// i18n setup with i18next
import i18next from 'i18next';

i18next.init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: { translation: { welcome: 'Welcome!' } },
    fr: { translation: { welcome: 'Bienvenue!' } },
  },
});

export default i18next;
