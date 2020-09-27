import React from "react";
import { View, Image, StyleSheet, Text, TouchableWithoutFeedback, Linking, } from "react-native";
import { getPostData, adapter } from "./api";
import { parse, format } from "date-fns";
import { Header, HeaderQuote } from "./Header";
import { formatLikeNumber, getFormattedTimeByLanguage } from "./utils";
import { ImageGallery } from "./ImageGallery";
import { TwitterText } from "./TwitterText";
import { TwitterVideo } from "./Video";
import { LinkPreview } from "./LinkPreview";
import { getTheme } from "./theme";
export var Twitter = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    var id = props.id, language = props.language, onHashTagPress = props.onHashTagPress, onLinkPress = props.onLinkPress, onUserMentionPress = props.onUserMentionPress, consumerKey = props.consumerKey, consumerSecret = props.consumerSecret, cornerRadius = props.cornerRadius, darkMode = props.darkMode, containerBorderRadius = props.containerBorderRadius, onTweetPress = props.onTweetPress, useCustomTweetExtendedData = props.useCustomTweetExtendedData;
    var appearance = darkMode ? "dark" : "light";
    var _q = React.useState(null), data = _q[0], setData = _q[1];
    React.useEffect(function () {
        if (!useCustomTweetExtendedData) {
            getPostData(id, consumerKey, consumerSecret).then(function (response) {
                setData(response);
            });
        }
        else {
            if(useCustomTweetExtendedData && typeof useCustomTweetExtendedData != 'undefined'){
                setData(adapter(useCustomTweetExtendedData));
            }
        }
    }, [setData]);
    if (!data || typeof data == 'undefined') {
        return null;
    }
    if (useCustomTweetExtendedData) {
        id = useCustomTweetExtendedData.id_str;
    }
    var styles = evaluateTheme(appearance);
    return (<TouchableWithoutFeedback onPress={function () { return onTweetPress(id); }}>
      <View style={styles.container(containerBorderRadius)}>
        {data ? (<>
            <Header posterImageUrl={data.posterImageUrl} posterDisplayName={data.posterDisplayName} posterUniqueName={data.posterUniqueName} isPosterVerified={data.isPosterVerified} appearanceTheme={appearance}/>
            <View style={styles.headerSeparator}/>
            <View>
              <TwitterText styles={styles.mainContentText} urls={data.urlList} hashtags={data.hashtagList} userMentions={data.userMentionList} quoteUrlId={data.quoteUrlId} appearanceTheme={appearance}>
                {data.textContent}
              </TwitterText>
            </View>
            {((_b = (_a = data === null || data === void 0 ? void 0 : data.media) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.type) === "video" ? (<View style={styles.embedContainer(cornerRadius)}>
                <TwitterVideo source={data.media[0].url} aspectRatio={data.media[0].aspectRatio} poster={data.media[0].posterUrl}/>
              </View>) : ((_d = (_c = data === null || data === void 0 ? void 0 : data.media) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.type) === "photo" ? (<View style={styles.embedContainer(cornerRadius)}>
                <ImageGallery medias={data.media}/>
              </View>) : ((_e = data === null || data === void 0 ? void 0 : data.urlList) === null || _e === void 0 ? void 0 : _e[0]) && !(data === null || data === void 0 ? void 0 : data.isQuote) ? (<View style={styles.embedContainer(cornerRadius)}>
                <LinkPreview url={(_g = (_f = data === null || data === void 0 ? void 0 : data.urlList) === null || _f === void 0 ? void 0 : _f[0]) === null || _g === void 0 ? void 0 : _g.expanded_url} onLinkPress={onLinkPress} appearanceTheme={appearance}/>
              </View>) : null}
            {(data === null || data === void 0 ? void 0 : data.isQuote) ? (<View style={styles.embedContainer(cornerRadius)}>
                <View style={{ margin: 10 }}>
                  <HeaderQuote isPosterVerified={data.quotedTweet.isPosterVerified} posterUniqueName={data.quotedTweet.posterUniqueName} posterImageUrl={data.quotedTweet.posterImageUrl} posterDisplayName={data.quotedTweet.posterDisplayName} appearanceTheme={appearance}/>
                  <TwitterText urls={data.quotedTweet.urlList} hashtags={data.quotedTweet.hashtagList} userMentions={data.quotedTweet.userMentionList} quoteUrlId={data.quotedTweet.quoteUrlId} {...{ onHashTagPress: onHashTagPress, onLinkPress: onLinkPress, onUserMentionPress: onUserMentionPress }} styles={styles.quotedContentText} appearanceTheme={appearance}>
                    {data.quotedTweet.textContent}
                  </TwitterText>
                </View>
                {((_k = (_j = (_h = data === null || data === void 0 ? void 0 : data.quotedTweet) === null || _h === void 0 ? void 0 : _h.media) === null || _j === void 0 ? void 0 : _j[0]) === null || _k === void 0 ? void 0 : _k.type) === "video" ? (<TwitterVideo source={data.quotedTweet.media[0].url} aspectRatio={data.quotedTweet.media[0].aspectRatio} poster={data.quotedTweet.media[0].posterUrl}/>) : ((_o = (_m = (_l = data === null || data === void 0 ? void 0 : data.quotedTweet) === null || _l === void 0 ? void 0 : _l.media) === null || _m === void 0 ? void 0 : _m[0]) === null || _o === void 0 ? void 0 : _o.type) === "photo" ? (<ImageGallery medias={(_p = data === null || data === void 0 ? void 0 : data.quotedTweet) === null || _p === void 0 ? void 0 : _p.media}/>) : null}
              </View>) : null}
            <View style={styles.metadataRowContainer}>
              {/* <Image source={require("./assets/heart.png")} style={styles.heart}/>
              <Text style={styles.metadataRowText}>
                {formatLikeNumber(data === null || data === void 0 ? void 0 : data.likeNumber) +
        "    " +
        format(parse(data === null || data === void 0 ? void 0 : data.createdAt, "EEE MMM dd HH:mm:ss xx yyyy", new Date()), getFormattedTimeByLanguage(language).format, { locale: getFormattedTimeByLanguage(language).locale })}
              </Text> */}
            </View>
          </>) : null}
      </View>
    </TouchableWithoutFeedback>);
};
Twitter.defaultProps = {
    cornerRadius: "small",
    borderRadius: 0,
    onTweetPress: function (tweetId) {
        return Linking.openURL("https://twitter.com/post/status/" + tweetId);
    },
};
var evaluateTheme = function (appearance) {
    var colors = getTheme(appearance);
    return StyleSheet.create({
        // @ts-ignore
        container: function (containerBorderRadius) { return ({
            width: "100%",
            backgroundColor: colors.postBackgroundColor,
            paddingHorizontal: 20,
            borderRadius: containerBorderRadius,
        }); },
        topRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
        },
        profilePicture: {
            width: 36,
            height: 36,
            borderRadius: 18,
        },
        profileBanner: {
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
        },
        displayNameText: {
            color: colors.mainTextColor,
            fontSize: 16,
            fontWeight: "700",
        },
        uniqueNameText: {
            color: colors.grey,
            fontSize: 14,
            fontWeight: "400",
        },
        nameContainer: {
            marginLeft: 10,
            justifyContent: "space-between",
        },
        headerSeparator: {
            height: 12,
        },
        mainContentText: {
            color: colors.mainTextColor,
            fontSize: 16,
            lineHeight: 22,
        },
        quotedContentText: {
            color: colors.mainTextColor,
            fontSize: 14,
            lineHeight: 19,
        },
        metadataRowText: {
            color: colors.grey,
            fontSize: 14,
        },
        metadataRowContainer: {
            marginVertical: 10,
            flexDirection: "row",
            alignItems: "center",
        },
        heart: {
            tintColor: colors.grey,
            width: 18,
            height: 18,
            marginRight: 4,
        },
        // @ts-ignore wrong react-native style
        embedContainer: function (cornerRadius) { return ({
            borderColor: "rgb(204, 214, 221)",
            borderWidth: 0.7,
            borderRadius: cornerRadius === "big" ? 12 : 4,
            marginTop: 10,
            overflow: "hidden",
        }); },
    });
};
