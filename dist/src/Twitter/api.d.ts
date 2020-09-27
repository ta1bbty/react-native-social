import { TwitterPostApiResponse, UserMention } from "./typings";
export declare const getPostData: (postId: string, consumerKey: string, consumerSecret: string) => Promise<ITwitterPost | null>;
export declare const adapter: (data: TwitterPostApiResponse) => ITwitterPost;
export interface ITwitterPost {
    createdAt: string;
    id: number;
    posterImageUrl: string;
    posterDisplayName: string;
    posterUniqueName: string;
    isPosterVerified: boolean;
    retweetNumber: number;
    likeNumber: number;
    textContent: string;
    isQuote: boolean;
    quotedTweet: any;
    quoteUrlId: string;
    urlList: Array<{
        url: string;
        expanded_url: string;
        display_url: string;
        indices: [number, number];
    }>;
    hashtagList: Array<{
        text: string;
        indices: [number, number];
    }>;
    userMentionList: UserMention[];
    media: Array<{
        type: string;
        aspectRatio: number;
        url: string;
        twitterShortlink: string;
        posterUrl: string;
    }>;
}
