import { __assign } from "tslib";
import React from "react";
// import Video from "react-native-video";
import { Video } from 'expo-av';

import { TouchableWithoutFeedback, View, StyleSheet, Image, } from "react-native";
export var TwitterVideo = function (props) {
    var source = props.source, aspectRatio = props.aspectRatio, poster = props.poster;
    var _a = React.useState(0), pauseNumber = _a[0], setPauseNumber = _a[1];
    var isPaused = pauseNumber % 2 === 0;
    var hasNotUnpausedYet = pauseNumber === 0;
    return (<TouchableWithoutFeedback onPress={function () { return setPauseNumber(pauseNumber + 1); }}>
      <View>
        <Image 
    // this image is when adding this content to a FlatList. It will allow when pausing and then scrolling and then coming back to not see the white background of the twitter content behind
    style={{
        width: "100%",
        aspectRatio: aspectRatio,
        position: "absolute",
    }} source={{ uri: poster }}/>
        <Video source={{ uri: source }} style={{
        width: "100%",
        aspectRatio: aspectRatio,
    }} paused={isPaused} resizeMode={"contain"} repeat/>
        <View style={styles.overlay}>
          <Image style={{
        opacity: hasNotUnpausedYet ? 1 : 0,
        width: "100%",
        aspectRatio: aspectRatio,
    }} source={{ uri: poster }}/>
        </View>
        <View style={styles.playContainer}>
          <Image style={{
        opacity: isPaused ? 1 : 0,
        width: 50,
        height: 50,
        backgroundColor: "#3AA1E0",
        borderRadius: 25,
        tintColor: "white",
    }} source={require("./assets/play.png")}/>
        </View>
      </View>
    </TouchableWithoutFeedback>);
};
var styles = StyleSheet.create({
    overlay: __assign(__assign({}, StyleSheet.absoluteFillObject), { backgroundColor: "transparent" }),
    playContainer: __assign(__assign({}, StyleSheet.absoluteFillObject), { backgroundColor: "transparent", justifyContent: "center", alignItems: "center" }),
});
