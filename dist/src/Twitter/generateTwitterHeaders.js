// @ts-ignore
import oauthSignature from "oauth-signature";
/*
 * generate the current timestamp.
 * it allows twitter api to know if the request is stale or not
 * */
var generateOAuthTimestamp = function () { return Math.floor(Date.now() / 1000); };
/*
 * generate a random unique string for the request so Twitter can approve this request has never been sent before
 * */
var generateOAuthNonce = function () {
    var array = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUV".split("");
    var result = "";
    for (var i = 0; i <= 42; i++) {
        var rand = Math.floor(Math.random() * 62);
        result = result + array[rand];
    }
    return result;
};
export var generateFetchRequestHeaders = function (url, consumerKey, consumerSecret, httpMethod) {
    if (httpMethod === void 0) { httpMethod = "GET"; }
    var myHeaders = new Headers();
    var oauth_nonce = generateOAuthNonce();
    var oauth_timestamp = generateOAuthTimestamp();
    var parameters = {
        oauth_consumer_key: consumerKey,
        oauth_nonce: oauth_nonce,
        oauth_timestamp: oauth_timestamp,
        oauth_signature_method: "HMAC-SHA1",
        oauth_version: "1.0",
        tweet_mode: "extended",
    };
    var encodedSignature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret);
    myHeaders.append("Authorization", "OAuth oauth_consumer_key=\"" + consumerKey + "\",oauth_signature_method=\"HMAC-SHA1\",oauth_timestamp=\"" + oauth_timestamp + "\",oauth_nonce=\"" + oauth_nonce + "\",oauth_version=\"1.0\",oauth_signature=\"" + encodedSignature + "\"");
    return {
        method: httpMethod,
        headers: myHeaders,
        redirect: "follow",
    };
};
