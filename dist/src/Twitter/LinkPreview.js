import React from "react";
import { View, Image, Text, TouchableOpacity, Linking } from "react-native";
import { openGraphTool } from "./OpenGraphParser";
import { getTheme } from "./theme";
var getDomain = function (url) {
    var match = url.match(/^(?:https?:)?(?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im);
    return (match === null || match === void 0 ? void 0 : match[1]) || (match === null || match === void 0 ? void 0 : match[0]);
};
export var LinkPreview = function (props) {
    var url = props.url, onLinkPress = props.onLinkPress, appearanceTheme = props.appearanceTheme;
    var _a = React.useState(null), data = _a[0], setData = _a[1];
    var styles = getTheme(appearanceTheme);
    React.useEffect(function () {
        openGraphTool
            .extractMeta(url)
            // @ts-ignore
            .then(function (response) { return setData(response[0]); });
    }, [setData]);
    if (!data) {
        return null;
    }
    var domain = getDomain(data.url);
    return (<TouchableOpacity onPress={function () { return onLinkPress(data.url); }} activeOpacity={0.8} disabled={!onLinkPress}>
      <View>
        {(data === null || data === void 0 ? void 0 : data.image) ? (<Image source={{ uri: data === null || data === void 0 ? void 0 : data.image }} style={{ width: "100%", aspectRatio: 600 / 314 }} resizeMode={"cover"}/>) : null}
        <View style={{ paddingHorizontal: 12, paddingVertical: 10 }}>
          {(data === null || data === void 0 ? void 0 : data.title) ? (<Text numberOfLines={1} style={{
        color: styles.mainTextColor,
        fontSize: 14,
        fontWeight: "700",
        marginBottom: 2,
    }}>
              {data.title}
            </Text>) : null}
          {(data === null || data === void 0 ? void 0 : data.description) ? (<Text numberOfLines={2} style={{
        color: styles.mainTextColor,
        fontSize: 14,
        lineHeight: 18,
    }}>
              {data.description.replace("\n", "")}
            </Text>) : null}
          {domain ? (<Text numberOfLines={1} style={{ color: styles.grey, fontSize: 14 }}>
              {domain}
            </Text>) : null}
        </View>
      </View>
    </TouchableOpacity>);
};
LinkPreview.defaultProps = {
    onLinkPress: function (url) { return Linking.openURL(url); },
};
