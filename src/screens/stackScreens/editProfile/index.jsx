import React, { useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Switch,
    Alert,
    ScrollView,
    Platform,
} from "react-native";
import { colors } from '../../../constant/colors'
import { scale } from '../../../utils/appScale'
import { useNavigation } from '@react-navigation/native'
import AppHeader from '../../../components/AppHeader'
import { images } from '../../../constant/images'
import Wrapper from '../../../components/wrapper'
import { fonts } from "../../../constant/fonts";


const avatarPlaceholder =
    "https://www.gravatar.com/avatar/?d=mp&s=120"; // replace with real user avatar if available

const ProfileRow = ({ leftIcon, title, subtitle, onEdit, children, showEdit = true }) => {
    return (
        <View style={styles.rowContainer}>
            <View style={styles.leftIconWrap}>
                {typeof leftIcon === "string" ? (
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
            </View>
        </View>
    );
};


export default function EditProfileScreen() {
    const navigation = useNavigation()
    const [isVeteran, setIsVeteran] = useState(false);

    // Sample user data
    const user = {
        name: "Christian Taylor",
        dob: "20 December, 1990",
        username: "syedahari",
        email: "justanemail@mail.com",
        memberSince: "Jan 2025",
        gender: "Male",
        sexualOrientation: "Heterosexual",
    };

    const onEdit = (field) => {
        Alert.alert("Edit", `Open editor for: ${field}`);
    };




    return (
        <Wrapper barStyle="dark-content" bgColor={colors.bg_v1}>
            <View style={styles.containerView}>
                <AppHeader
                    title="Edit Profile"
                    leftIcon={images.back_2}
                    onLeftPress={() => navigation.goBack()}
                />
                <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                    <View style={styles.cardOuter}>
                        <View style={styles.card}>

                            <ProfileRow
                                leftIcon={
                                    <Image source={images.user} style={styles.avatar} />
                                }
                                title="Name"
                                subtitle={user.name}
                                onEdit={() => onEdit("Name")}
                            />
                            <View style={styles.sep} />

                            <ProfileRow
                                leftIcon={
                                    <Image source={images.dates} style={styles.avatar} />
                                }
                                title="Date of birth"
                                subtitle={user.dob}
                                onEdit={() => onEdit("Date of birth")}
                            />

                            <View style={styles.sep} />

                            <ProfileRow
                                leftIcon={
                                    <Image source={images.email_user} style={styles.avatar} tintColor={colors.themeColor} />
                                }
                                title="Username"
                                subtitle={user.username}
                                onEdit={() => onEdit("Username")}
                            />

                            <View style={styles.sep} />

                            <ProfileRow
                                leftIcon={
                                    <Image source={images.datetime} style={styles.avatar} tintColor={colors.themeColor} />
                                }
                                title="Email address"
                                subtitle={user.email}
                                onEdit={() => onEdit("Email address")}
                            />

                            <View style={styles.sep} />

                            <ProfileRow
                                leftIcon={
                                    <Image source={images.datetime} style={styles.avatar} tintColor={colors.themeColor} />
                                }
                                title="Member since"
                                subtitle={user.memberSince}
                                onEdit={() => onEdit("Member since")}
                            />

                            <View style={styles.sep} />

                            <ProfileRow
                                leftIcon={
                                    <Image source={images.gender_male} style={styles.avatar} tintColor={colors.themeColor} />
                                }
                                title="Gender"
                                subtitle={user.gender}
                                onEdit={() => onEdit("Gender")}
                            />

                            <View style={styles.sep} />

                            <ProfileRow
                                leftIcon={
                                    <Image source={images.gender_trans} style={styles.avatar} tintColor={colors.themeColor} />
                                }
                                title="Sexual orientation"
                                subtitle={user.sexualOrientation}
                                onEdit={() => onEdit("Sexual orientation")}
                            />

                            <View style={styles.sep} />

                            <ProfileRow
                                leftIcon={
                                    <Image source={images.carbon_badge} style={styles.avatar} tintColor={colors.themeColor} />
                                }
                                title="Veteran"
                                subtitle="Are you a veteran?"
                                onEdit={() => onEdit("Veteran")}
                                showEdit={false}
                            >
                                <Switch
                                    value={isVeteran}
                                    onValueChange={(val) => setIsVeteran(val)}
                                    trackColor={{ false: "#d6d6d6", true: colors.themeColor }}
                                    thumbColor={isVeteran ? "#fff" : "#fff"}
                                />
                            </ProfileRow>
                            <View style={styles.sep} />

                            <ProfileRow
                                leftIcon={
                                    <Image source={images.money_bag} style={styles.avatar} tintColor={colors.themeColor} />
                                }
                                title="Income range"
                                subtitle={user.sexualOrientation}
                                onEdit={() => onEdit("Sexual orientation")}
                            />
                            <View style={styles.sep} />

                            <ProfileRow
                                leftIcon={
                                    <Image source={images.oui_users} style={styles.avatar} tintColor={colors.themeColor} />
                                }
                                title="Ethnicity"
                                subtitle={user.sexualOrientation}
                                onEdit={() => onEdit("Sexual orientation")}
                            />
                            <View style={styles.sep} />
                            <ProfileRow
                                leftIcon={
                                    <Image source={images.gem_ring} style={styles.avatar} tintColor={colors.themeColor} />
                                }
                                title="Marital status"
                                subtitle={user.sexualOrientation}
                                onEdit={() => onEdit("Sexual orientation")}
                            />
                            <View style={styles.sep} />
                            <ProfileRow
                                leftIcon={
                                    <Image source={images.religion_cross} style={styles.avatar} tintColor={colors.themeColor} />
                                }
                                title="Religion"
                                subtitle={user.sexualOrientation}
                                onEdit={() => onEdit("Sexual orientation")}
                            />
                            <View style={styles.sep} />
                            <ProfileRow
                                leftIcon={
                                    <Image source={images.disability} style={styles.avatar} tintColor={colors.themeColor} />
                                }
                                title="Disability"
                                subtitle={user.sexualOrientation}
                                onEdit={() => onEdit("Sexual orientation")}
                            />
                            <View style={styles.sep} />
                            <ProfileRow
                                leftIcon={
                                    <Image source={images.compaign} style={styles.avatar} tintColor={colors.themeColor} />
                                }
                                title="Political affiliation"
                                subtitle={user.sexualOrientation}
                                onEdit={() => onEdit("Sexual orientation")}
                            />
                            <View style={styles.sep} />
                            <ProfileRow
                                leftIcon={
                                    <Image source={images.verified_new} style={styles.avatar} tintColor={colors.themeColor} />
                                }
                                title="Political affiliation"
                                subtitle={user.sexualOrientation}
                                onEdit={() => onEdit("Sexual orientation")}
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