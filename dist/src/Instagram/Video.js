import { __assign } from "tslib";
import React from "react";
import Video from "react-native-video";
import { TouchableWithoutFeedback, View, StyleSheet, Image, } from "react-native";
export var InstagramVideo = function (props) {
    var source = props.source, aspectRatio = props.aspectRatio, poster = props.poster, hasFocus = props.hasFocus;
    var _a = React.useState(0), pauseNumber = _a[0], setPauseNumber = _a[1];
    var isPaused = pauseNumber % 2 === 0;
    var hasNotUnpausedYet = pauseNumber === 0;
    return (<TouchableWithoutFeedback onPress={function () { return setPauseNumber(pauseNumber + 1); }}>
      <View style={{ flex: 1 }}>
        <Video source={{ uri: source }} style={{
        flex: 1,
        aspectRatio: aspectRatio,
    }} paused={isPaused || !hasFocus} resizeMode={"contain"} repeat/>
        <View style={styles.overlay}>
          <Image style={__assign(__assign({}, StyleSheet.absoluteFillObject), { opacity: hasNotUnpausedYet ? 1 : 0 })} source={{ uri: poster }}/>
        </View>
        <View style={styles.playContainer}>
          <Image style={{
        opacity: isPaused ? 1 : 0,
        width: 50,
    }} source={require("./assets/play.png")} resizeMode="contain"/>
        </View>
      </View>
    </TouchableWithoutFeedback>);
};
var styles = StyleSheet.create({
    overlay: __assign(__assign({}, StyleSheet.absoluteFillObject), { backgroundColor: "transparent" }),
    playContainer: __assign(__assign({}, StyleSheet.absoluteFillObject), { backgroundColor: "transparent", justifyContent: "center", alignItems: "center" }),
});
