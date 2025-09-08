import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet, Platform, } from 'react-native';
import { colors } from '../constant/colors';
import { fonts } from '../constant/fonts';
import { scale } from '../utils/appScale';
import { images } from '../constant/images';


const InputBox = ({
    value,
    onChangeText,
    placeholder = '',
    keyboardType = 'default',
    autoCapitalize = 'none',
    multiline = false,
    numberOfLines = 1,
    isPassword = false,
    error = '',
    leftIcon = null,
    rightElement = null,
    containerStyle = {},
    inputStyle = {},
    onBlur = () => { },
    onFocus = () => { },
    editable = true,
    placeholderTextColor = colors.theme_v1,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [secure, setSecure] = useState(Boolean(isPassword));

    const handleFocus = (e) => {
        setIsFocused(true);
        onFocus(e);
    };

    const handleBlur = (e) => {
        setIsFocused(false);
        onBlur(e);
    };

    return (
        <View style={[styles.wrapper, containerStyle]}>
            <View
                style={[
                    styles.inputContainer,
                    {
                        // borderColor: error
                        //     ? colors.danger
                        //     : isFocused
                        //         ? colors.primary
                        //         : colors.border,
                        backgroundColor: editable ? colors.white : colors.inputDisabledBg,
                    },
                ]}
            >
                {leftIcon ? (
                    <Image source={leftIcon} style={styles.leftIcon} resizeMode="contain" />
                ) : null}

                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    secureTextEntry={secure}
                    style={[styles.input, inputStyle]}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    editable={editable}
                    underlineColorAndroid="transparent"
                    accessibilityLabel={placeholder}
                />

                {/* right custom element (e.g. clear button) */}
                {rightElement ? (
                    <View style={styles.rightElementWrapper}>{rightElement}</View>
                ) : null}

                {/* password toggle */}
                {isPassword && !rightElement ? (
                    <TouchableOpacity
                        onPress={() => setSecure((s) => !s)}
                        style={styles.passwordToggle}
                        accessibilityLabel={secure ? 'Show password' : 'Hide password'}
                    >
                        <Image source={secure ? images.eye_off : images.eye} style={{
                            width: scale(22),
                            height: scale(22),
                            tintColor: colors.tab_disabled
                        }} />
                    </TouchableOpacity>
                ) : null}
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
};

export default InputBox;

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        marginBottom: scale(14),
        // borderColor: colors.theme_v1,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: scale(4),
        paddingHorizontal: 12,
        minHeight: Platform.OS === 'ios' ? scale(44) : scale(46),
        borderColor: colors.theme_v1,
    },
    leftIcon: {
        width: scale(22),
        height: scale(22),
        marginRight: 8,
        tintColor: colors.text,
    },
    input: {
        flex: 1,
        fontSize: scale(15),
        color: colors.text,
        paddingVertical: Platform.OS === 'ios' ? 10 : 8,
        fontFamily: fonts.regular || undefined,
    },
    rightElementWrapper: {
        marginLeft: 8,
    },
    passwordToggle: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        marginLeft: 8,
    },
    toggleText: {
        fontSize: scale(11),
        fontFamily: fonts.medium || undefined,
        color: colors.primary,
    },
    errorText: {
        marginTop: 6,
        color: colors.danger,
        fontSize: scale(12.6),
        fontFamily: fonts.regular || undefined,
    },
});
