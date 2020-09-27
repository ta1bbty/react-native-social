import { parse, format, differenceInDays, differenceInHours, differenceInMinutes, isSameYear, } from 'date-fns';
import { getLocaleForDateFnsTranslation, getPostDateFormatDaysAgo, getPostDateFormatHoursAgo, getPostDateFormatMinutesAgo, getPostDateFormatThisYear, getPostDateFormatPreviousYear, } from './translations';
export var numberWithSpace = function (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};
export var getPostTime = function (timestamp, language) {
    var today = Date.now();
    var instagramPostDate = parse(timestamp + '', 't', today);
    var daysDifference = differenceInDays(today, instagramPostDate);
    var hoursDifference = differenceInHours(today, instagramPostDate);
    var minutesDifference = differenceInMinutes(today, instagramPostDate);
    if (daysDifference > 7) {
        if (isSameYear(today, instagramPostDate)) {
            return format(instagramPostDate, getPostDateFormatThisYear(language), {
                locale: getLocaleForDateFnsTranslation(language),
            });
        }
        else {
            return format(instagramPostDate, getPostDateFormatPreviousYear(language), {
                locale: getLocaleForDateFnsTranslation(language),
            });
        }
    }
    else if (daysDifference >= 1) {
        return getPostDateFormatDaysAgo(daysDifference, language);
    }
    else if (hoursDifference >= 1) {
        return getPostDateFormatHoursAgo(hoursDifference, language);
    }
    else if (minutesDifference >= 1) {
        return getPostDateFormatMinutesAgo(minutesDifference, language);
    }
    else {
        return null;
    }
};
export var textColorLightMode = 'rgb(38, 38, 38)';
export var textColorDarkMode = 'white';
export var backgroundColorDarkMode = 'black';
export var backgroundColorLightMode = 'white';
