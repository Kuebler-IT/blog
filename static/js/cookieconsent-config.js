// cookieconsent-config.js

import * as CookieConsent from '/js/cookieconsent.esm.js';

const CAT_NECESSARY = "necessary";
const CAT_ANALYTICS = "analytics";
const CAT_ADVERTISEMENT = "advertisement";
const CAT_FUNCTIONALITY = "functionality";
const CAT_SECURITY = "security";

const SERVICE_AD_STORAGE = 'ad_storage'
const SERVICE_AD_USER_DATA = 'ad_user_data'
const SERVICE_AD_PERSONALIZATION = 'ad_personalization'
const SERVICE_ANALYTICS_STORAGE = 'analytics_storage'
const SERVICE_FUNCTIONALITY_STORAGE = 'functionality_storage'
const SERVICE_PERSONALIZATION_STORAGE = 'personalization_storage'
const SERVICE_SECURITY_STORAGE = 'security_storage'

// Define dataLayer and the gtag function.
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

// Set default consent to 'denied' (this should happen before changing any other dataLayer)
gtag('consent', 'default', {
    [SERVICE_AD_STORAGE]: 'denied',
    [SERVICE_AD_USER_DATA]: 'denied',
    [SERVICE_AD_PERSONALIZATION]: 'denied',
    [SERVICE_ANALYTICS_STORAGE]: 'denied',
    [SERVICE_FUNCTIONALITY_STORAGE]: 'denied',
    [SERVICE_PERSONALIZATION_STORAGE]: 'denied',
    [SERVICE_SECURITY_STORAGE]: 'denied',
});

/** 
 * Update gtag consent according to the users choices made in CookieConsent UI
 */
function updateGtagConsent() {
    gtag('consent', 'update', {
        [SERVICE_ANALYTICS_STORAGE]: CookieConsent.acceptedService(SERVICE_ANALYTICS_STORAGE, CAT_ANALYTICS) ? 'granted' : 'denied',
        //[SERVICE_AD_STORAGE]: CookieConsent.acceptedService(SERVICE_AD_STORAGE, CAT_ADVERTISEMENT) ? 'granted' : 'denied',
        //[SERVICE_AD_USER_DATA]: CookieConsent.acceptedService(SERVICE_AD_USER_DATA, CAT_ADVERTISEMENT) ? 'granted' : 'denied',
        //[SERVICE_AD_PERSONALIZATION]: CookieConsent.acceptedService(SERVICE_AD_PERSONALIZATION, CAT_ADVERTISEMENT) ? 'granted' : 'denied',
        //[SERVICE_FUNCTIONALITY_STORAGE]: CookieConsent.acceptedService(SERVICE_FUNCTIONALITY_STORAGE, CAT_FUNCTIONALITY) ? 'granted' : 'denied',
        //[SERVICE_PERSONALIZATION_STORAGE]: CookieConsent.acceptedService(SERVICE_PERSONALIZATION_STORAGE, CAT_FUNCTIONALITY) ? 'granted' : 'denied',
        //[SERVICE_SECURITY_STORAGE]: CookieConsent.acceptedService(SERVICE_SECURITY_STORAGE, CAT_SECURITY) ? 'granted' : 'denied',
    });
}

CookieConsent.run({
    // See: https://cookieconsent.orestbida.com/reference/configuration-reference.html#guioptions
    guiOptions: {
        consentModal: {
            layout: 'cloud inline',
            position: 'bottom center'
        }
    },

    // Trigger consent update when user choices change
    onFirstConsent: () => {
        updateGtagConsent();
    },
    onConsent: () => {
        updateGtagConsent();
    },
    onChange: () => {
        updateGtagConsent();
    },

    // Configure categories and services
    categories: {
        //[CAT_NECESSARY]: {
        //    enabled: true,  // this category is enabled by default
        //    readOnly: true,  // this category cannot be disabled
        //},
        [CAT_ANALYTICS]: {
            autoClear: {
                cookies: [
                    {
                        name: /^_ga/,   // regex: match all cookies starting with '_ga'
                    },
                    {
                        name: '_gid',   // string: exact cookie name
                    }
                ]
            },
            // See: https://cookieconsent.orestbida.com/reference/configuration-reference.html#category-services
            services: {
                [SERVICE_ANALYTICS_STORAGE]: {
                    label: 'Enables storage (such as cookies) related to analytics e.g. visit duration.',
                }
            }
        },
        //[CAT_ADVERTISEMENT]: {
        //    enabled: false,
        //    services: {
        //        [SERVICE_AD_STORAGE]: {
        //            label: 'Enables storage (such as cookies) related to advertising.',
        //        },
        //        [SERVICE_AD_USER_DATA]: {
        //            label: 'Sets consent for sending user data related to advertising to Google.',
        //        },
        //        [SERVICE_AD_PERSONALIZATION]: {
        //            label: 'Sets consent for personalized advertising.',
        //        },
        //    }
        //},
        //[CAT_FUNCTIONALITY]: {
        //    services: {
        //        [SERVICE_FUNCTIONALITY_STORAGE]: {
        //            label: 'Enables storage that supports the functionality of the website or app e.g. language settings.',
        //        },
        //        [SERVICE_PERSONALIZATION_STORAGE]: {
        //            label: 'Enables storage related to personalization e.g. video recommendations.',
        //        },
        //    }
        //},
        //[CAT_SECURITY]: {
        //    services: {
        //        [SERVICE_SECURITY_STORAGE]: {
        //            label: 'Enables storage related to security such as authentication functionality, fraud prevention, and other user protection.',
        //        },
        //    }
        //}
    },

    language: {
        default: 'de',
        autoDetect: 'document',
        translations: {
            // See: https://support.google.com/tagmanager/answer/10718549?hl=en
            'en': '/data/cookie-consent.en.json',
            'de': '/data/cookie-consent.de.json'
        }
    }
});