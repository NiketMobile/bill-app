import React from 'react';
import {
    TouchableOpacity,
    Text,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import { colors } from '../constant/colors';
import { fonts } from '../constant/fonts';
import { scale } from '../utils/appScale';

const Button = ({
    title = 'Button',
    onPress = () => { },
    loading = false,
    disabled = false,
    style = {},
    textStyle = {},
}) => {
    const isDisabled = disabled || loading;

    return (
        <TouchableOpacity
            style={[
                styles.button,
                isDisabled && styles.disabledButton,
                style,
            ]}
            onPress={onPress}
            activeOpacity={0.7}
            disabled={isDisabled}
        >
            {loading ? (
                <ActivityIndicator color={colors.white} size="small" />
            ) : (
                <Text style={[styles.title, textStyle]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

export default Button;

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.themeColor,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        height: scale(45)
    },
    disabledButton: {
        backgroundColor: colors.gray,
    },
    title: {
        color: colors.white,
        fontSize: scale(15),
        fontFamily: fonts.regular,
        fontWeight: "400"
    },
});
