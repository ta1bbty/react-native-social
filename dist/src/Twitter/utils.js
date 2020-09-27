import { 
// @ts-ignore
en, de, es, fr, it, pt, ru, } from "date-fns/locale";
export var formatLikeNumber = function (likes) {
    if (likes < 1000) {
        return likes.toString();
    }
    var suffix = likes > 1000000000 ? "Md" : likes > 1000000 ? "M" : "k";
    var numberToDisplay = likes > 1000000000
        ? likes / 1000000000
        : likes > 1000000
            ? likes / 1000000
            : likes / 1000;
    return ((Math.floor(numberToDisplay * 10) / 10).toString().replace(".", ",") +
        " " +
        suffix);
};
export var getFormattedTimeByLanguage = function (language) {
    switch (language) {
        case "de": {
            return {
                format: "HH:mm '-' d. MMM. yyyy",
                locale: de,
            };
        }
        case "es": {
            return {
                format: "H:mm '-' d MMM. yyyy",
                locale: es,
            };
        }
        case "fr": {
            return {
                format: "HH:mm '-' d MMM yyyy",
                locale: fr,
            };
        }
        case "it": {
            return {
                format: "HH:mm '-' d MMM yyyy",
                locale: it,
            };
        }
        case "pt": {
            return {
                format: "HH:mm '-' d 'de' MMM 'de' yyyy",
                locale: pt,
            };
        }
        case "ru": {
            return {
                format: "HH:mm '-' d MMM yyyy 'r.'",
                locale: ru,
            };
        }
        default: {
            return {
                format: "h:mm aa '-' MMM d, yyyy",
                locale: en,
            };
        }
    }
};
