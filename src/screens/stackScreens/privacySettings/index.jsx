import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
    ScrollView,
} from "react-native";
import { colors } from '../../../constant/colors'
import { scale } from '../../../utils/appScale'
import { useNavigation } from '@react-navigation/native'
import AppHeader from '../../../components/AppHeader'
import { images } from '../../../constant/images'
import Wrapper from '../../../components/wrapper'
import { fonts } from "../../../constant/fonts";




const ProfileRow = ({ leftIcon, title, subtitle, onEdit, children, showEdit = true, showOther = false, onShowOther }) => {
    return (
        <View style={styles.rowContainer}>
            <View style={styles.leftIconWrap}>
                {typeof leftIcon == "string" ? (
                    null
                ) : (
                    leftIcon
                )}
            </View>
            <View style={styles.textWrap}>
                <Text style={styles.rowTitle}>{title}</Text>
                {subtitle ? <Text style={styles.rowSubtitle}>{subtitle}</Text> : null}
            </View>
            <View style={styles.rightWrap}>
                {children}
                {showEdit ? (
                    <TouchableOpacity onPress={onEdit} style={styles.editBtn}>
                        <Image source={images.edit} style={styles.editIcons} />
                    </TouchableOpacity>
                ) : null}
                {
                    showOther ? (
                        <TouchableOpacity onPress={onShowOther} style={styles.editBtn}>
                            {showOther}
                        </TouchableOpacity>
                    ) : null
                }
            </View>
        </View>
    );
};


export default function EditProfileScreen() {
    const navigation = useNavigation()
    const [isVeteran, setIsVeteran] = useState(false);

    const user = {
        name: "Christian Taylor",
        dob: "20 December, 1990",
        username: "syedahari",
        email: "justanemail@mail.com",
        memberSince: "Jan 2025",
        gender: "(412) 369-7453",
        sexualOrientation: "(412) 369-7453",
        verified: "Verified",
    };

    const onEdit = (field) => {
        Alert.alert("Edit", `Open editor for: ${field}`);
    };




    return (
        <Wrapper barStyle="dark-content" bgColor={colors.bg_v1}>
            <View style={styles.containerView}>
                <AppHeader
                    title="Privacy settings"
                    leftIcon={images.back_2}
                    onLeftPress={() => navigation.goBack()}
                />
                <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                    <View style={styles.cardOuter}>
                        <View style={styles.card}>

                            <Text style={styles.mainTitle}>Frequently asked questions</Text>

                            <ProfileRow
                                leftIcon={
                                    <Image source={images.disability} style={styles.avatar} tintColor={colors.themeColor} />
                                }
                                title="Phone"
                                subtitle={user.sexualOrientation}
                                onEdit={() => onEdit("Sexual orientation")}
                            />
                            <View style={styles.sep} />
                            <ProfileRow
                                leftIcon={
                                    <Image source={images.compaign} style={styles.avatar} tintColor={colors.themeColor} />
                                }
                                title="Password"
                                subtitle={user.gender}
                                onEdit={() => onEdit("Sexual orientation")}
                            />
                            <View style={styles.sep} />
                            <ProfileRow
                                leftIcon={
                                    <Image source={images.verified_new} style={styles.avatar} tintColor={colors.themeColor} />
                                }
                                title="Verification status"
                                subtitle={user.verified}
                                onEdit={() => onEdit("Sexual orientation")}
                                showEdit={false}
                                showOther={
                                    <Image source={images.check} style={styles.avatar} tintColor={colors.themeColor} />
                                }
                                onShowOther={() => onEdit("Sexual orientation")}
                            />
                            <View style={styles.sep} />

                        </View>
                    </View>
                </ScrollView>
            </View>
        </Wrapper>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: "#f0f2f5",
    },
    containerView: {
        flex: 1,
        backgroundColor: colors.bg_v1,
        paddingHorizontal: scale(15),
    },
    header: {
        height: 56,
        paddingHorizontal: 12,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    backBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        elevation: 1,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1f2f50",
    },
    container: {
        alignItems: "center",
        paddingBottom: scale(50),
        marginTop: scale(10),
    },
    cardOuter: {
        width: "99.5%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    card: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingVertical: 6,
        paddingHorizontal: 6,
        marginTop: 10,
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 10,
    },
    leftIconWrap: {
        width: scale(44),
        height: scale(44),
        borderRadius: 22,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f3f8ff",
        marginRight: 12,
    },
    leftIcon: {
        color: "#2f6fbf",
    },

    avatar: {
        width: scale(24),
        height: scale(24),
        resizeMode: "contain"
    },
    textWrap: {
        flex: 1,
        justifyContent: "center",
    },
    rowTitle: {
        fontSize: scale(16),
        fontWeight: "500",
        color: colors.text,
        fontFamily: fonts.medium
    },
    rowSubtitle: {
        fontSize: scale(14),
        fontWeight: "400",
        fontFamily: fonts.regular,
        color: colors.theme_v1,
        marginTop: 4,
    },
    mainTitle: {
        fontSize: scale(16),
        fontWeight: "500",
        fontFamily: fonts.medium,
        color: colors.text,
        paddingTop: scale(10),
        paddingLeft: scale(10)
    },
    rightWrap: {
        flexDirection: "row",
        alignItems: "center",
    },
    editBtn: {
        marginLeft: 10,
        padding: 6,
        borderRadius: 6,
    },
    sep: {
        height: 1,
        backgroundColor: "#B5B5B533",
        marginHorizontal: 8,
    },
    editIcons: {
        width: scale(25),
        height: scale(25),
        resizeMode: "contain"
    },
});