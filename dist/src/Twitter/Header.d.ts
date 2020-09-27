import { AppearanceTheme } from "./typings";
interface PropsType {
    posterImageUrl: string;
    posterDisplayName: string;
    posterUniqueName: string;
    isPosterVerified: boolean;
    appearanceTheme: AppearanceTheme;
}
export declare const Header: (props: PropsType) => JSX.Element;
interface HeaderQuotePropsType {
    isPosterVerified: boolean;
    posterUniqueName: string;
    posterImageUrl: string;
    posterDisplayName: string;
    appearanceTheme: AppearanceTheme;
}
export declare const HeaderQuote: (props: HeaderQuotePropsType) => JSX.Element;
export {};
