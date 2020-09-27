export declare const getPostInformation: (id: string) => Promise<InstagramPostData>;
export interface InstagramPostData {
    width: number;
    height: number;
    likeCount: number;
    ownerName: string;
    ownerIsVerified: boolean;
    ownerPicture: string;
    text: string | null;
    timestamp: number;
    content: Array<{
        type: "image" | "photo";
        videoUrl: string | null;
        pictureUrl: string;
    }>;
}
