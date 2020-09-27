import { 
// @ts-ignore
en, af, id, ms, da, de, es, fil, fr, hr, it, hu, nl, nb, pl, pt, ro, sk, fi, sv, vi, tr, cs, el, bg, ru, uk, sr, } from "date-fns/locale";
export var getLocaleForDateFnsTranslation = function (language) {
    return {
        en: en,
        af: af,
        id: id,
        ms: ms,
        da: da,
        de: de,
        es: es,
        fil: fil,
        fr: fr,
        hr: hr,
        it: it,
        hu: hu,
        nl: nl,
        nb: nb,
        pl: pl,
        pt: pt,
        ro: ro,
        sk: sk,
        fi: fi,
        sv: sv,
        vi: vi,
        tr: tr,
        cs: cs,
        el: el,
        bg: bg,
        ru: ru,
        uk: uk,
        sr: sr,
    }[language];
};
export var getPostDateFormatDaysAgo = function (value, language) {
    var translations = {
        de: "Vor " + value + " Tagen",
        en: value + " days ago",
        es: "hace " + value + " d\u00EDas",
        fr: "il y a " + value + " jours",
        it: value + " giorni fa",
        pt: "h\u00E1 " + value + " dias",
        ru: value + " \u0434\u043D\u0435\u0439 \u043D\u0430\u0437\u0430\u0434",
    };
    // @ts-ignore
    return translations[language] || translations.en;
};
export var getPostDateFormatMinutesAgo = function (value, language) {
    var translations = {
        de: "Vor " + value + " Minuten",
        en: value + " minutes ago",
        es: "hace " + value + " minutos",
        fr: "il y a " + value + " minutes",
        it: value + " giorni fa",
        pt: "h\u00E1 " + value + " minutos",
        ru: value + " \u043C\u0438\u043D\u0443\u0442 \u043D\u0430\u0437\u0430\u0434",
    };
    // @ts-ignore
    return translations[language] || translations.en;
};
export var getPostDateFormatHoursAgo = function (value, language) {
    var translations = {
        de: "Vor " + value + " Stunden",
        en: value + " hours ago",
        es: "hace " + value + " horas",
        fr: "il y a " + value + " heures",
        it: value + " giorni fa",
        pt: "h\u00E1 " + value + " horas",
        ru: value + " \u0447\u0430\u0441\u043E\u0432 \u043D\u0430\u0437\u0430\u0434",
    };
    // @ts-ignore
    return translations[language] || translations.en;
};
export var getPostDateFormatThisYear = function (language) {
    var translations = {
        de: "d. MMMM",
        en: "MMMM d",
        es: "d 'de' MMMM",
        fr: "d MMMM",
        it: "d MMMM",
        pt: "d 'de' MMMM",
        ru: "d MMMM",
    };
    // @ts-ignore
    return translations[language] || translations.en;
};
export var getPostDateFormatPreviousYear = function (language) {
    var translations = {
        de: "d. MMMM yyyy",
        en: "MMMM d, yyyy",
        es: "d 'de' MMMM 'de' yyyy",
        fr: "d MMMM yyyy",
        it: "d MMMM yyyy",
        pt: "d 'de' MMMM 'de' yyyy",
        ru: "d MMMM yyyy 'r.'",
    };
    // @ts-ignore
    return translations[language] || translations.en;
};
export var getLikeTranslation = function (likeNumber, language) {
    var translations = {
        de: "Gef\u00E4llt " + likeNumber + " Mal",
        en: likeNumber + " likes",
        es: likeNumber + " Me gusta",
        fr: likeNumber + " J'aime",
        it: "Piace a " + likeNumber + " persone",
        pt: likeNumber + " curtidas",
        ru: likeNumber + " отметки Нравится",
    };
    // @ts-ignore
    return translations[language] || translations.en;
};
