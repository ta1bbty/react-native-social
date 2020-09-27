import { AppearanceTheme } from "./typings";
interface PropsType {
    url: string;
    onLinkPress: (value: string) => any;
    appearanceTheme: AppearanceTheme;
}
export declare const LinkPreview: {
    (props: PropsType): JSX.Element | null;
    defaultProps: {
        onLinkPress: (url: string) => Promise<any>;
    };
};
export {};
