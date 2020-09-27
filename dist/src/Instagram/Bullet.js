import React from "react";
import { View, StyleSheet } from "react-native";
export var Bullet = function (props) {
    var numberOfBullets = props.numberOfBullets, itemIndexCurrentlyFocused = props.itemIndexCurrentlyFocused;
    var bulletsArray = Array(numberOfBullets).fill(0);
    return (<View style={styles.container}>
      {bulletsArray.map(function (_, index) {
        if (index === itemIndexCurrentlyFocused) {
            return <View style={styles.bulletFocused} key={index}/>;
        }
        else {
            return <View style={styles.bullet} key={index}/>;
        }
    })}
    </View>);
};
var styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
    },
    bullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 4,
        backgroundColor: "#A8A8A8",
    },
    bulletFocused: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 4,
        backgroundColor: "#0095F6",
    },
});
