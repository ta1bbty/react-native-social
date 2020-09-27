declare function findOGTags(content: any, url: any): {};
declare function findHTMLMetaTags(content: any, url: any): {};
declare function extractMeta(textContent?: string, options?: {
    fallbackOnHTMLTags: boolean;
}): Promise<{}>;
export declare const openGraphTool: {
    extractMeta: typeof extractMeta;
    findOGTags: typeof findOGTags;
    findHTMLMetaTags: typeof findHTMLMetaTags;
};
export {};
