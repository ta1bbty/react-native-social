export declare type LanguageAvailableType = "en" | "de" | "es" | "fr" | "it" | "pt" | "ru";
export declare const getLocaleForDateFnsTranslation: (language: LanguageAvailableType) => any;
export declare const getPostDateFormatDaysAgo: (value: number, language: string) => string;
export declare const getPostDateFormatMinutesAgo: (value: number, language: string) => string;
export declare const getPostDateFormatHoursAgo: (value: number, language: string) => string;
export declare const getPostDateFormatThisYear: (language: string) => string;
export declare const getPostDateFormatPreviousYear: (language: string) => string;
export declare const getLikeTranslation: (likeNumber: string, language: string) => any;
