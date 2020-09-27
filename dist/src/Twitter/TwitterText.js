import { __spreadArrays } from "tslib";
import React from "react";
import { Text, Linking } from "react-native";
import { getTheme } from "./theme";
var transformTextToAddColors = function (textContent, searchFor, replaceBy, argumentToLinkTo, linkTo, textColor) {
    if (!searchFor) {
        return textContent;
    }
    var copy = __spreadArrays(textContent);
    textContent.forEach(function (element, index) {
        if (typeof element === "string") {
            if (element.includes(searchFor)) {
                var arrayOfTwoString = element.split(searchFor);
                arrayOfTwoString.splice(1, 0, <Text style={{ color: "rgb(27, 149, 224)" }} onPress={function () {
                    linkTo(argumentToLinkTo);
                }}>
            {replaceBy}
          </Text>);
                copy[index] = __spreadArrays(arrayOfTwoString);
            }
        }
    });
    return copy.flat(1);
};
export var TwitterText = function (props) {
    var styles = props.styles, children = props.children, urls = props.urls, hashtags = props.hashtags, userMentions = props.userMentions, quoteUrlId = props.quoteUrlId, onHashTagPress = props.onHashTagPress, onLinkPress = props.onLinkPress, onUserMentionPress = props.onUserMentionPress, appearanceTheme = props.appearanceTheme;
    var transformedText = [children];
    var colors = getTheme(appearanceTheme);
    urls.forEach(function (url) {
        if (url.expanded_url.includes(quoteUrlId)) {
            transformedText = transformTextToAddColors(transformedText, url.url, "", url.expanded_url, onLinkPress, colors.postPressableText);
        }
        transformedText = transformTextToAddColors(transformedText, url.url, url.display_url, url.expanded_url, onLinkPress, colors.postPressableText);
    });
    hashtags.forEach(function (hashtag) {
        transformedText = transformTextToAddColors(transformedText, "#" + hashtag.text, "#" + hashtag.text, hashtag.text, onHashTagPress, colors.postPressableText);
    });
    userMentions.forEach(function (userMention) {
        transformedText = transformTextToAddColors(transformedText, "@" + userMention.screen_name, "@" + userMention.screen_name, userMention.screen_name, onUserMentionPress, colors.postPressableText);
    });
    return (<Text style={styles}>
      {transformedText.map(function (element, index) { return (<Text key={index}>{element}</Text>); })}
    </Text>);
};
TwitterText.defaultProps = {
    onHashTagPress: function (hashtag) {
        return Linking.openURL("https://twitter.com/search?q=%23" + hashtag + "&src=hashtag_click");
    },
    onLinkPress: function (link) { return Linking.openURL(link); },
    onUserMentionPress: function (userMention) {
        return Linking.openURL("https://twitter.com/" + userMention);
    },
};
