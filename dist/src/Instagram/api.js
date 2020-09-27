import { __awaiter, __generator } from "tslib";
export var getPostInformation = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var getInstagramPostData, instagramPostData, shortcode_media;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, fetch("https://www.instagram.com/p/" + id + "/?__a=1")];
            case 1:
                getInstagramPostData = _d.sent();
                return [4 /*yield*/, getInstagramPostData.json()];
            case 2:
                instagramPostData = _d.sent();
                shortcode_media = instagramPostData.graphql.shortcode_media;
                return [2 /*return*/, {
                        width: shortcode_media.dimensions.width,
                        height: shortcode_media.dimensions.height,
                        likeCount: shortcode_media.edge_media_preview_like.count,
                        ownerName: shortcode_media.owner.username,
                        ownerIsVerified: shortcode_media.owner.is_verified,
                        ownerPicture: shortcode_media.owner.profile_pic_url,
                        text: ((_c = (_b = (_a = shortcode_media.edge_media_to_caption.edges) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.node) === null || _c === void 0 ? void 0 : _c.text) || null,
                        timestamp: shortcode_media.taken_at_timestamp,
                        // @ts-ignore
                        content: shortcode_media.__typename === "GraphSidecar"
                            ? shortcode_media.edge_sidecar_to_children.edges.map(function (element) { return ({
                                type: element.node.__typename === "GraphImage" ? "image" : "video",
                                pictureUrl: element.node.display_url,
                                videoUrl: element.node.video_url || null,
                            }); })
                            : [
                                {
                                    type: shortcode_media.__typename === "GraphImage" ? "image" : "video",
                                    pictureUrl: shortcode_media.display_url,
                                    videoUrl: shortcode_media.video_url || null,
                                },
                            ],
                    }];
        }
    });
}); };
