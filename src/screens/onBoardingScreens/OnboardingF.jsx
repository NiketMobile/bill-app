import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Platform } from 'react-native'
import React, { useState } from 'react'
import Wrapper from '../../components/wrapper'
import InputBox from '../../components/inputBox'
import { colors } from '../../constant/colors'
import { fonts } from '../../constant/fonts'
import { images } from '../../constant/images'
import { scale } from '../../utils/appScale'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native'
import InputOtpComp from "../../components/InputOtpComp"



const OnboardingF = () => {
    const navigation = useNavigation()
    const [otp, setOtp] = useState("")

    const goBack = () => {
        navigation.goBack()
    }

    const handlewNext = () => {
        navigation?.navigate('Login');
    }



    return (
        <Wrapper barStyle="dark-content" bgColor={colors.bg_v1}>
            <View style={styles.container}>
                <KeyboardAwareScrollView
                    style={{ flexGrow: 1 }}
                    contentContainerStyle={styles.scrollContainer}
                    extraScrollHeight={40}
                    enableOnAndroid={true}
                >
                    <View style={{ marginTop: scale(5) }}>
                        <TouchableOpacity onPress={goBack}>
                            <Image source={images.back_icon} style={styles.backIcon} />
                        </TouchableOpacity>
                        <Text style={styles.title}>Enter the verification code we sent you</Text>
                        <Text style={styles.desc}> Check your messages for the 6-digit code</Text>

                        <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                            <InputOtpComp
                                onChange={(text) => setOtp(text)}
                                onComplete={(text) => console.log("OTP Entered:", text)}
                            />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
                <TouchableOpacity style={[styles.fab]} onPress={handlewNext} >
                    <Image source={images.right} style={styles.rightIcon} />
                </TouchableOpacity>
            </View>
        </Wrapper>
    )
}

export default OnboardingF

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg_v1,
        paddingHorizontal: scale(15),
    },
    scrollContainer: {
        flexGrow: 1,
    },
    title: {
        fontSize: scale(30),
        fontFamily: fonts.medium,
        fontWeight: "500",
        color: colors.black,
        paddingTop: scale(15),
    },
    desc: {
        fontSize: scale(14),
        fontFamily: fonts.light,
        fontWeight: "300",
        color: colors.text_v1,
        paddingTop: scale(10),
        paddingBottom: scale(15),
    },
    fab: {
        position: 'absolute',
        right: scale(30),
        bottom: scale(60),
        width: scale(50),
        height: scale(50),
        borderRadius: scale(50),
        backgroundColor: colors.themeColor,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3, // shadow Android
        shadowColor: '#000', // shadow iOS
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    rightIcon: {
        width: scale(18),
        height: scale(18),
        resizeMode: "contain"
    },
    backIcon: {
        width: scale(40),
        height: scale(40),
        resizeMode: "contain"
    },
    borderStyleBase: {
        width: 30,
        height: 45
    },
    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
})
