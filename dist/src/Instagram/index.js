import React from "react";
import { View, StyleSheet, Image, Text, ScrollView } from "react-native";
import { InstagramVideo } from "./Video";
import { getPostInformation } from "./api";
import { numberWithSpace, getPostTime, backgroundColorDarkMode, backgroundColorLightMode, textColorDarkMode, textColorLightMode, } from "./utils";
import { InteractionRow } from "./InteractionRow";
import { getLikeTranslation } from "./translations";
export var Instagram = function (props) {
    var id = props.id, language = props.language, darkMode = props.darkMode, containerBorderRadius = props.containerBorderRadius;
    var _a = React.useState(null), instagramPostData = _a[0], setInstagramPostData = _a[1];
    var _b = React.useState(0), carouselCurrentIndex = _b[0], setCarouselCurrentIndex = _b[1];
    var styles = stylings(darkMode);
    React.useEffect(function () {
        getPostInformation(id).then(function (response) { return setInstagramPostData(response); });
    }, [id]);
    if (!instagramPostData) {
        return null;
    }
    var numberOfItems = instagramPostData.content.length;
    var isCarousel = numberOfItems > 1;
    return (<View style={styles.container(containerBorderRadius)}>
      <View style={styles.header}>
        <Image source={{ uri: instagramPostData.ownerPicture }} style={styles.profilePicture}/>
        <Text style={styles.headerUsername}>{instagramPostData.ownerName}</Text>
        {instagramPostData.ownerIsVerified ? (<Image source={require("./assets/verified.png")} style={styles.verified}/>) : null}
      </View>
      <ScrollView horizontal contentContainerStyle={{
        width: instagramPostData.content.length * 100 + "%",
    }} showsHorizontalScrollIndicator={false} bounces={isCarousel} onMomentumScrollEnd={function (_a) {
        var nativeEvent = _a.nativeEvent;
        setCarouselCurrentIndex(Math.round((nativeEvent.contentOffset.x / nativeEvent.contentSize.width) *
            numberOfItems));
    }} decelerationRate="fast" disableIntervalMomentum pagingEnabled>
        {instagramPostData.content.map(function (element, index) {
        if (element.type === "image") {
            return (<Image source={{ uri: element.pictureUrl }} key={element.pictureUrl} style={styles.postImage(instagramPostData.width, instagramPostData.height)}/>);
        }
        else {
            return (<InstagramVideo 
            // @ts-ignore
            source={element.videoUrl} key={element.pictureUrl} poster={element.pictureUrl} aspectRatio={instagramPostData.width / instagramPostData.height} hasFocus={index === carouselCurrentIndex}/>);
        }
    })}
      </ScrollView>
      <View style={styles.footer}>
        <InteractionRow numberOfBullets={isCarousel ? numberOfItems : null} itemIndexCurrentlyFocused={carouselCurrentIndex} darkMode={darkMode} id={id}/>
        <Text style={styles.like}>
          {getLikeTranslation(numberWithSpace(instagramPostData.likeCount), 
    // @ts-ignore
    language)}
        </Text>
        <Text>
          <Text style={styles.footerOwnerName}>
            {instagramPostData.ownerName + " "}
          </Text>
          <Text style={styles.text}>
            {instagramPostData.text ? instagramPostData.text : ""}
          </Text>
        </Text>
        <Text style={styles.date}>
          {getPostTime(instagramPostData.timestamp, 
    // @ts-ignore
    language) || ""}
        </Text>
      </View>
    </View>);
};
Instagram.defaultProps = {
    language: "en",
    darkMode: false,
    borderRadius: 0,
};
var stylings = function (darkMode) {
    return StyleSheet.create({
        // @ts-ignore
        container: function (containerBorderRadius) { return ({
            backgroundColor: darkMode
                ? backgroundColorDarkMode
                : backgroundColorLightMode,
            borderRadius: containerBorderRadius,
        }); },
        header: {
            margin: 16,
            flexDirection: "row",
            alignItems: "center",
        },
        headerUsername: {
            marginLeft: 16,
            fontSize: 16,
            fontWeight: "700",
            color: darkMode ? textColorDarkMode : textColorLightMode,
        },
        profilePicture: {
            width: 32,
            height: 32,
            borderRadius: 16,
        },
        verified: {
            width: 16,
            height: 16,
            marginLeft: 8,
        },
        footer: {
            marginHorizontal: 16,
            marginBottom: 16,
        },
        like: {
            color: darkMode ? textColorDarkMode : textColorLightMode,
            fontSize: 16,
            fontWeight: "700",
            marginBottom: 8,
        },
        footerOwnerName: {
            color: darkMode ? textColorDarkMode : textColorLightMode,
            fontSize: 16,
            fontWeight: "700",
        },
        text: {
            color: darkMode ? textColorDarkMode : textColorLightMode,
            lineHeight: 22,
            fontSize: 16,
        },
        date: {
            color: "rgb(142, 142, 142)",
            marginTop: 10,
            fontSize: 14,
        },
        // @ts-ignore wrong react-native typings
        postImage: function (width, height) { return ({
            flex: 1,
            aspectRatio: width / height,
        }); },
    });
};
