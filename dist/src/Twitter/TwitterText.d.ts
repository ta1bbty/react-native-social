import { UserMention, AppearanceTheme } from "./typings";
interface PropsType {
    children: string;
    urls: Array<{
        url: string;
        expanded_url: string;
        display_url: string;
        indices: [number, number];
    }>;
    userMentions: UserMention[];
    hashtags: Array<{
        text: string;
        indices: [number, number];
    }>;
    quoteUrlId: string;
    onHashTagPress: (hashtag: string) => void;
    onUserMentionPress: (userMention: string) => void;
    onLinkPress: (link: string) => void;
    styles?: any;
    appearanceTheme: AppearanceTheme;
}
export declare const TwitterText: {
    (props: PropsType): JSX.Element;
    defaultProps: {
        onHashTagPress: (hashtag: string) => Promise<any>;
        onLinkPress: (link: string) => Promise<any>;
        onUserMentionPress: (userMention: string) => Promise<any>;
    };
};
export {};
