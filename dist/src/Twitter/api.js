import { __awaiter, __generator } from "tslib";
import { generateFetchRequestHeaders } from "./generateTwitterHeaders";
export var getPostData = function (postId, consumerKey, consumerSecret) { return __awaiter(void 0, void 0, void 0, function () {
    var url, requestOptions, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://api.twitter.com/1.1/statuses/show/" + postId + ".json";
                requestOptions = generateFetchRequestHeaders(url, consumerKey, consumerSecret);
                return [4 /*yield*/, fetch(url + "?tweet_mode=extended", requestOptions)
                        .then(function (response) { return response.json(); })
                        .then(function (value) { return adapter(value); })
                        .catch(function (error) {
                        console.log(error);
                        return null;
                    })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
export var adapter = function (data) {
    var _a, _b, _c, _d, _e, _f;
    var response = {
        createdAt: data.created_at,
        id: data.id,
        posterImageUrl: data.user.profile_image_url_https.replace("_normal", ""),
        posterDisplayName: data.user.name,
        posterUniqueName: data.user.screen_name,
        isPosterVerified: data.user.verified,
        retweetNumber: data.retweet_count,
        likeNumber: data.favorite_count,
        textContent: data.full_text.replace("&amp;", "&"),
        isQuote: data === null || data === void 0 ? void 0 : data.is_quote_status,
        urlList: (_a = data === null || data === void 0 ? void 0 : data.entities) === null || _a === void 0 ? void 0 : _a.urls,
        hashtagList: (_b = data === null || data === void 0 ? void 0 : data.entities) === null || _b === void 0 ? void 0 : _b.hashtags,
        userMentionList: (_c = data === null || data === void 0 ? void 0 : data.entities) === null || _c === void 0 ? void 0 : _c.user_mentions,
        quotedTweet: (data === null || data === void 0 ? void 0 : data.is_quote_status) ? adapter(data === null || data === void 0 ? void 0 : data.quoted_status) : null,
        quoteUrlId: data === null || data === void 0 ? void 0 : data.quoted_status_id_str,
        media: (_e = (_d = data.extended_entities) === null || _d === void 0 ? void 0 : _d.media) === null || _e === void 0 ? void 0 : _e.map(function (element) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            if ((element === null || element === void 0 ? void 0 : element.type) === "video" || (element === null || element === void 0 ? void 0 : element.type) === "animated_gif") {
                return {
                    type: "video",
                    aspectRatio: ((_b = (_a = element === null || element === void 0 ? void 0 : element.video_info) === null || _a === void 0 ? void 0 : _a.aspect_ratio) === null || _b === void 0 ? void 0 : _b[0]) / ((_d = (_c = element === null || element === void 0 ? void 0 : element.video_info) === null || _c === void 0 ? void 0 : _c.aspect_ratio) === null || _d === void 0 ? void 0 : _d[1]),
                    url: (_g = (_f = (_e = element === null || element === void 0 ? void 0 : element.video_info) === null || _e === void 0 ? void 0 : _e.variants) === null || _f === void 0 ? void 0 : _f[0]) === null || _g === void 0 ? void 0 : _g.url,
                    posterUrl: element === null || element === void 0 ? void 0 : element.media_url_https,
                    twitterShortlink: element === null || element === void 0 ? void 0 : element.url,
                };
            }
            if ((element === null || element === void 0 ? void 0 : element.type) === "photo") {
                if (((_j = (_h = data.extended_entities) === null || _h === void 0 ? void 0 : _h.media) === null || _j === void 0 ? void 0 : _j.length) === 1) {
                    return {
                        type: element === null || element === void 0 ? void 0 : element.type,
                        aspectRatio: element.sizes.thumb.w / element.sizes.thumb.h,
                        url: element.media_url_https,
                        twitterShortlink: element === null || element === void 0 ? void 0 : element.url,
                    };
                }
                else {
                    return {
                        type: element === null || element === void 0 ? void 0 : element.type,
                        aspectRatio: element.sizes.small.w / element.sizes.small.h,
                        url: element.media_url_https,
                        twitterShortlink: element === null || element === void 0 ? void 0 : element.url,
                    };
                }
            }
            return null;
        }),
    };
    (_f = response === null || response === void 0 ? void 0 : response.media) === null || _f === void 0 ? void 0 : _f.forEach(function (element) {
        if (element === null)
            return;
        response.textContent = response.textContent.replace(element === null || element === void 0 ? void 0 : element.twitterShortlink, "");
    });
    // @ts-ignore
    return response;
};
