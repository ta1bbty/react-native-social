import { LanguageAvailableType } from "./translations";
interface PropsType {
    id: string;
    language?: LanguageAvailableType;
    darkMode: boolean;
    containerBorderRadius: number;
}
export declare const Instagram: {
    (props: PropsType): JSX.Element | null;
    defaultProps: {
        language: string;
        darkMode: boolean;
        borderRadius: number;
    };
};
export {};
