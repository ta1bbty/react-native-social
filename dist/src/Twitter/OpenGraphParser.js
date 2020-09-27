import { __assign, __awaiter, __generator } from "tslib";
// @ts-nocheck
// copied from https://github.com/Osedea/react-native-opengraph-kit/blob/master/OpenGraphParser.js
import { AllHtmlEntities } from "html-entities";
var entities = new AllHtmlEntities();
function findOGTags(content, url) {
    var metaTagOGRegex = /<meta[^>]*(?:property=[ '"]*og:([^'"]*))?[^>]*(?:content=["]([^"]*)["])?[^>]*>/gi;
    var matches = content.match(metaTagOGRegex);
    var meta = {};
    if (matches) {
        var metaPropertyRegex = /<meta[^>]*property=[ "]*og:([^"]*)[^>]*>/i;
        var metaContentRegex = /<meta[^>]*content=[ "]([^"]*)[^>]*>/i;
        for (var i = matches.length; i--;) {
            var propertyMatch = void 0;
            var contentMatch = void 0;
            var metaName = void 0;
            var metaValue = void 0;
            try {
                propertyMatch = metaPropertyRegex.exec(matches[i]);
                contentMatch = metaContentRegex.exec(matches[i]);
                if (!propertyMatch || !contentMatch) {
                    continue;
                }
                metaName = propertyMatch[1].trim();
                metaValue = contentMatch[1].trim();
                if (!metaName || !metaValue) {
                    continue;
                }
            }
            catch (error) {
                if (__DEV__) {
                    console.log(error);
                }
                continue;
            }
            if (metaValue.length > 0) {
                if (metaValue[0] === "/") {
                    if (metaValue.length <= 1 || metaValue[1] !== "/") {
                        if (url[url.length - 1] === "/") {
                            metaValue = url + metaValue.substring(1);
                        }
                        else {
                            metaValue = url + metaValue;
                        }
                    }
                    else {
                        // handle protocol agnostic meta URLs
                        if (url.indexOf("https://") === 0) {
                            metaValue = "https:" + metaValue;
                        }
                        else if (url.indexOf("http://") === 0) {
                            metaValue = "http:" + metaValue;
                        }
                    }
                }
            }
            else {
                continue;
            }
            meta[metaName] = entities.decode(metaValue);
        }
    }
    return meta;
}
function findHTMLMetaTags(content, url) {
    var metaTagHTMLRegex = /<meta(?:[^>]*(?:name|itemprop)=[ '"]([^'"]*))?[^>]*(?:[^>]*content=["]([^"]*)["])?[^>]*>/gi;
    var matches = content.match(metaTagHTMLRegex);
    var meta = {};
    if (matches) {
        var metaPropertyRegex = /<meta[^>]*(?:name|itemprop)=[ "]([^"]*)[^>]*>/i;
        var metaContentRegex = /<meta[^>]*content=[ "]([^"]*)[^>]*>/i;
        for (var i = matches.length; i--;) {
            var propertyMatch = void 0;
            var contentMatch = void 0;
            var metaName = void 0;
            var metaValue = void 0;
            try {
                propertyMatch = metaPropertyRegex.exec(matches[i]);
                contentMatch = metaContentRegex.exec(matches[i]);
                if (!propertyMatch || !contentMatch) {
                    continue;
                }
                metaName = propertyMatch[1].trim();
                metaValue = contentMatch[1].trim();
                if (!metaName || !metaValue) {
                    continue;
                }
            }
            catch (error) {
                if (__DEV__) {
                    console.log(error);
                }
                continue;
            }
            if (metaValue.length > 0) {
                if (metaValue[0] === "/") {
                    if (metaValue.length <= 1 || metaValue[1] !== "/") {
                        if (url[url.length - 1] === "/") {
                            metaValue = url + metaValue.substring(1);
                        }
                        else {
                            metaValue = url + metaValue;
                        }
                    }
                    else {
                        // handle protocol agnostic meta URLs
                        if (url.indexOf("https://") === 0) {
                            metaValue = "https:" + metaValue;
                        }
                        else if (url.indexOf("http://") === 0) {
                            metaValue = "http:" + metaValue;
                        }
                    }
                }
            }
            else {
                continue;
            }
            meta[metaName] = entities.decode(metaValue);
        }
        if (!meta.title) {
            var titleRegex = /<title>([^>]*)<\/title>/i;
            var titleMatch = content.match(titleRegex);
            if (titleMatch) {
                meta.title = entities.decode(titleMatch[1]);
            }
        }
    }
    return meta;
}
function parseMeta(html, url, options) {
    var meta = findOGTags(html, url);
    if (options.fallbackOnHTMLTags) {
        try {
            meta = __assign(__assign({}, findHTMLMetaTags(html, url)), meta);
        }
        catch (error) {
            if (__DEV__) {
                console.log("Error in fallback", error);
            }
        }
    }
    return meta;
}
function fetchHtml(urlToFetch, forceGoogle) {
    if (forceGoogle === void 0) { forceGoogle = false; }
    return __awaiter(this, void 0, void 0, function () {
        var result, userAgent, responseOrError_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.50 Safari/537.36";
                    if (forceGoogle) {
                        userAgent =
                            "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch(urlToFetch, {
                            method: "GET",
                            headers: {
                                "user-agent": userAgent,
                            },
                        })];
                case 2:
                    result = _a.sent();
                    if (result.status >= 400) {
                        throw result;
                    }
                    return [2 /*return*/, result.text().then(function (resultParsed) { return resultParsed; })];
                case 3:
                    responseOrError_1 = _a.sent();
                    if (responseOrError_1.message && __DEV__) {
                        if (responseOrError_1.message === "Network request failed") {
                            console.log(urlToFetch, "could not be fetched");
                        }
                        else {
                            console.log(responseOrError_1);
                        }
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, responseOrError_1.text().then(function (error) {
                            if (__DEV__) {
                                console.log("An error has occured while fetching url content", error);
                            }
                            return null;
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function fetchJSON(urlToFetch, urlOfVideo) {
    return __awaiter(this, void 0, void 0, function () {
        var result, resultParsed, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(urlToFetch, { method: "GET" })];
                case 1:
                    result = _a.sent();
                    if (result.status >= 400) {
                        throw result;
                    }
                    return [4 /*yield*/, result.json()];
                case 2:
                    resultParsed = _a.sent();
                    return [2 /*return*/, {
                            title: resultParsed.title,
                            image: resultParsed.thumbnail_url,
                            url: urlOfVideo,
                        }];
                case 3:
                    error_1 = _a.sent();
                    if (__DEV__) {
                        console.log(error_1);
                    }
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getUrls(contentToMatch) {
    var regexp = /(?:(?=[\s`!()\[\]{};:'".,<>?«»“”‘’])|\b)((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/|[a-z0-9.\-]+[.](?:com|org|net))(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))*(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]|\b))/gi;
    var urls = contentToMatch.match(regexp);
    var urlsToReturn = [];
    if (urls && urls.length) {
        urls.forEach(function (url) {
            if (url.toLowerCase().indexOf("http") === 0) {
                urlsToReturn.push(url);
            }
            else {
                urlsToReturn.push("http://" + url);
            }
        });
    }
    else {
        if (__DEV__) {
            console.log("Could not find an html link");
        }
    }
    return urlsToReturn;
}
function extractMeta(textContent, options) {
    if (textContent === void 0) { textContent = ""; }
    if (options === void 0) { options = { fallbackOnHTMLTags: true }; }
    return __awaiter(this, void 0, void 0, function () {
        var urls_1, metaData, i_1, _a, _b, _c, _d, e_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 7, , 8]);
                    urls_1 = getUrls(textContent);
                    metaData = [];
                    i_1 = 0;
                    _e.label = 1;
                case 1:
                    if (!(i_1 < urls_1.length)) return [3 /*break*/, 6];
                    if (!(urls_1[i_1].indexOf("youtube.com") >= 0)) return [3 /*break*/, 3];
                    _b = (_a = metaData).push;
                    return [4 /*yield*/, fetchJSON("https://www.youtube.com/oembed?url=" + urls_1[i_1] + "&format=json", urls_1[i_1])];
                case 2:
                    _b.apply(_a, [_e.sent()]);
                    return [3 /*break*/, 5];
                case 3:
                    /* eslint-disable no-loop-func */
                    _d = (_c = metaData).push;
                    return [4 /*yield*/, fetchHtml(urls_1[i_1]).then(function (html) { return (__assign(__assign({}, (html ? parseMeta(html, urls_1[i_1], options) : {})), { url: urls_1[i_1] })); })];
                case 4:
                    /* eslint-disable no-loop-func */
                    _d.apply(_c, [_e.sent()]);
                    _e.label = 5;
                case 5:
                    i_1++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/, metaData];
                case 7:
                    e_1 = _e.sent();
                    console.log(e_1);
                    return [2 /*return*/, {}];
                case 8: return [2 /*return*/];
            }
        });
    });
}
export var openGraphTool = {
    extractMeta: extractMeta,
    // Exporting for testing
    findOGTags: findOGTags,
    findHTMLMetaTags: findHTMLMetaTags,
};
// For testing
