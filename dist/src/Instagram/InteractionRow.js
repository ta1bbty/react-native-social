import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Linking, } from "react-native";
import { Bullet } from "./Bullet";
import { textColorDarkMode, textColorLightMode } from "./utils";
export var InteractionRow = function (props) {
    var numberOfBullets = props.numberOfBullets, itemIndexCurrentlyFocused = props.itemIndexCurrentlyFocused, darkMode = props.darkMode, id = props.id;
    var styles = stylings(darkMode);
    return (<TouchableOpacity activeOpacity={0.8} onPress={function () { return Linking.openURL("https://www.instagram.com/p/" + id + "/"); }}>
      <View style={styles.container}>
        {numberOfBullets ? (<View style={styles.bulletContainer}>
            <Bullet {...{ numberOfBullets: numberOfBullets, itemIndexCurrentlyFocused: itemIndexCurrentlyFocused }}/>
          </View>) : null}
        <View style={styles.socialInteractionContainer}>
          <View style={styles.leftContainer}>
            <Image source={require("./assets/heart.png")} style={styles.imageLeft}/>
            <Image source={require("./assets/discussion.png")} style={styles.imageLeft}/>
            <Image source={require("./assets/share.png")} style={styles.imageLeft}/>
          </View>
          <View>
            <Image source={require("./assets/bookmark.png")} style={styles.imageRight}/>
          </View>
        </View>
      </View>
    </TouchableOpacity>);
};
var stylings = function (darkMode) {
    return StyleSheet.create({
        container: {
            marginVertical: 16,
        },
        imageLeft: {
            height: 24,
            width: 24,
            marginRight: 16,
            tintColor: darkMode ? textColorDarkMode : textColorLightMode,
        },
        imageRight: {
            height: 24,
            width: 24,
            tintColor: darkMode ? textColorDarkMode : textColorLightMode,
        },
        bulletContainer: {
            position: "absolute",
            height: "100%",
            width: "100%",
        },
        leftContainer: {
            flexDirection: "row",
        },
        socialInteractionContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
        },
    });
};
