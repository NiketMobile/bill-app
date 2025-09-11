import React, { useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking, Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { scale } from "../utils/appScale";
import { colors } from "../constant/colors";
import { fonts } from "../constant/fonts";
import Button from "./button";

export default function NoInternet({ onRetry }) {

    const openSettings = () => {
        if (Platform.OS === "ios") {
            Linking.openSettings();
            // iOS: Opens the Settings app
            // Linking.openURL("App-Prefs:root=WIFI").catch(() => {
            //     Linking.openSettings(); // fallback to app settings
            // });
        } else {
            Linking.openSettings();
            // Android: open Wi-Fi settings using Intent
            // Linking.openURL("android.settings.WIFI_SETTINGS:").catch(() => {
            //     // fallback → app settings
            //     Linking.openSettings();
            // });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>No Internet Connection</Text>
            {/* <TouchableOpacity style={styles.saveButton} onPress={onRetry}>
                <Text style={styles.saveButtonText}>Retry</Text>
            </TouchableOpacity> */}
            <View style={{
                width: "75%",
            }}>
                <View style={{
                    marginBottom: scale(10)
                }}>
                    <Button
                        title="On retry"
                        onPress={onRetry}
                    />
                </View>
                <Button
                    title="Go to setting"
                    onPress={openSettings}
                />
            </View>
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
        color: colors.themeColor,
        fontSize: scale(15),
        fontFamily: fonts.medium,
    },
});
