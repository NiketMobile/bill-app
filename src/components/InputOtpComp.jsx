import React from "react";
import { StyleSheet } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { colors } from "../constant/colors";
import { scale } from "../utils/appScale";
import { fonts } from "../constant/fonts";



const InputOtpComp = ({
    numberOfDigits = 6,
    autoFocus = false,
    onChange,
    onComplete,
    disabled = false,
}) => {
    return (
        <OtpInput
            numberOfDigits={numberOfDigits}
            focusColor={colors.black}
            autoFocus={autoFocus}
            hideStick={false}
            placeholder=""
            blurOnFilled={true}
            disabled={disabled}
            type="numeric"
            secureTextEntry={false}
            focusStickBlinkingDuration={500}
            onFocus={() => console.log("Focused")}
            onBlur={() => console.log("Blurred")}
            onTextChange={onChange}
            onFilled={onComplete}
            textInputProps={{
                accessibilityLabel: "One-Time Password",
            }}
            textProps={{
                accessibilityRole: "text",
                accessibilityLabel: "OTP digit",
                allowFontScaling: false,
            }}
            theme={{
                containerStyle: styles.container,
                pinCodeContainerStyle: styles.pinCodeContainer,
                pinCodeTextStyle: styles.pinCodeText,
                focusStickStyle: styles.focusStick,
                focusedPinCodeContainerStyle: styles.activePinCodeContainer,
                placeholderTextStyle: styles.placeholderText,
                filledPinCodeContainerStyle: styles.filledPinCodeContainer,
                disabledPinCodeContainerStyle: styles.disabledPinCodeContainer,
            }}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-evenly",
        alignItems: "center",
        // marginVertical: 20,
    },
    pinCodeContainer: {
        borderWidth: 1,
        borderRadius: 8,
        width: scale(48),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
        borderRadius: scale(4),
        height: scale(48),
    },
    activePinCodeContainer: {
        borderColor: colors.seleted_text_v1,
        borderWidth: 1,
        borderRadius: scale(4),
    },
    pinCodeText: {
        fontSize: scale(20),
        color: colors.themeColor,
        fontFamily: fonts.bold,
        fontWeight: "700"
    },
    focusStick: {
        backgroundColor: colors.black,
    },
    placeholderText: {
        color: "#aaa",
    },
    filledPinCodeContainer: {
        borderColor: colors.theme_v2,
    },
    disabledPinCodeContainer: {
        backgroundColor: "#f2f2f2",
    },
});

export default InputOtpComp;
