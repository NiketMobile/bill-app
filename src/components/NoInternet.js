import React, { useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { scale } from "../utils/appScale";
import { colors } from "../constant/colors";
import { fonts } from "../constant/fonts";

export default function NoInternet({ onRetry }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>No Internet Connection</Text>
            <TouchableOpacity style={styles.saveButton} onPress={onRetry}>
                <Text style={styles.saveButtonText}>Retry</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    text: {
        color: colors.red,
        fontSize: scale(20),
        fontFamily: fonts.medium,
        marginBottom: 20,
    },
    saveButton: {
        width: "45%",
        // backgroundColor: colors.blueTheme,
        borderRadius: 10,
        alignItems: "center",
        height: scale(40),
        justifyContent: "center"
    },
    saveButtonText: {
        color: colors.white,
        fontSize: scale(15),
        fontFamily: fonts.medium,
    },
});
