import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";
import { images } from "../constant/images";
import { moderateVerticalScale, scale } from "../utils/appScale";
import { colors } from "../constant/colors";
import { fonts } from "../constant/fonts";
import Button from "./button";



const MessageModal = ({ isVisible, onClose, title, message, onButtonPress }) => {
    return (
        <Modal
            isVisible={isVisible}
            animationIn="fadeInUpBig"
            animationOut="fadeOutDownBig"
            backdropOpacity={0.5}
            onBackdropPress={onClose}
            useNativeDriver
        >
            <View style={styles.modalContent}>
                <View style={styles.iconWrapper}>
                    <Image source={images.right_check} style={styles.checkIcon} />
                </View>
                <Text style={styles.titleText}>{title}</Text>
                <Text style={styles.subtitle}>
                    {message}
                </Text>
                <Button
                    title="Continue"
                    onPress={onButtonPress}
                    loading={false}
                    disabled={false}
                    style={{ marginTop: scale(20), height: scale(40) }}
                />
            </View>
        </Modal>
    );
};

export default MessageModal;

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: colors.bg_v1,
        padding: scale(20),
        borderRadius: scale(10),
        alignItems: "center",
    },
    iconWrapper: {
        backgroundColor: colors.themeColor,
        alignItems: "center",
        justifyContent: "center",
        width: scale(53),
        height: scale(53),
        borderRadius: 50,
        marginBottom: scale(15),
    },
    titleText: {
        fontSize: moderateVerticalScale(22),
        fontFamily: fonts.semiBold,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: scale(6),
        color: colors.text
    },
    subtitle: {
        fontSize: moderateVerticalScale(14),
        fontWeight: "400",
        fontFamily: fonts.regular,
        color: colors.text_v1,
        textAlign: "center",
        marginBottom: 20,
    },
    checkIcon: {
        width: scale(22),
        height: scale(22),
        resizeMode: 'contain',
    }
});
