interface PropsType {
    id: string;
    consumerKey: string;
    consumerSecret: string;
    language?: "en" | "fr" | "es" | "pt" | "it" | "de" | "ru";
    onHashTagPress?: (hashtag: string) => void;
    onUserMentionPress?: (userMention: string) => void;
    onLinkPress?: (link: string) => void;
    cornerRadius?: "small" | "big";
    darkMode?: boolean;
    containerBorderRadius: number;
    onTweetPress: (tweetId: string) => any;
    useCustomTweetExtendedData?: any;
}
export declare const Twitter: {
    (props: PropsType): JSX.Element | null;
    defaultProps: {
        cornerRadius: string;
        borderRadius: number;
        onTweetPress: (tweetId: string) => Promise<any>;
    };
};
export {};
