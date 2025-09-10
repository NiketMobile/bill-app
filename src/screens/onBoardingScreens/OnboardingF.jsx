import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import Wrapper from '../../components/wrapper'
import InputBox from '../../components/inputBox'
import { colors } from '../../constant/colors'
import { fonts } from '../../constant/fonts'
import { images } from '../../constant/images'
import { moderateScale, moderateVerticalScale, scale } from '../../utils/appScale'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native'
import InputOtpComp from "../../components/InputOtpComp"
import Loader from '../../components/loader'
import MessageModal from '../../components/messageModal'



const OnboardingF = () => {
    const navigation = useNavigation()
    const [otp, setOtp] = useState("")
    const [isLoader, setIsLoader] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    const goBack = () => {
        navigation.goBack()
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoader(false)
        }, 2000);
    }, [isLoader])


    const handlewNext = () => {
        setIsVisible(true)
        // navigation?.navigate('Login');
    }

    const resendNow = () => {
        setIsLoader(true)
    }

    const onButtonPressed = () => {
        setIsVisible(false)
        navigation?.navigate('OnboardingG');
    }




    return (
        <Wrapper barStyle="dark-content" bgColor={colors.bg_v1}>
            <View style={styles.container}>
                <KeyboardAwareScrollView
                    style={{ flexGrow: 1 }}
                    contentContainerStyle={styles.scrollContainer}
                    extraScrollHeight={40}
                    enableOnAndroid={true}
                    showsVerticalScrollIndicator={false}
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
                        <View style={styles.resendTextView}>
                            <Text style={styles.textCode}>Didn’t get the code ? </Text>
                            <TouchableOpacity onPress={resendNow}>
                                <Text style={styles.resendText}>Resend now.</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
                <TouchableOpacity style={[styles.fab]} onPress={handlewNext} >
                    <Image source={images.right} style={styles.rightIcon} />
                </TouchableOpacity>
                {
                    isLoader && <Loader />
                }
                <MessageModal
                    isVisible={isVisible}
                    onClose={() => setIsVisible(false)}
                    onButtonPress={onButtonPressed}
                    title={"Verification Successful "}
                    message={"You have successfully verified your phone number. "}
                />
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
        fontSize: moderateScale(30),
        fontFamily: fonts.medium,
        fontWeight: "500",
        color: colors.black,
        paddingTop: scale(15),
    },
    desc: {
        fontSize: moderateScale(14),
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
    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },
    resendTextView: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        paddingTop: scale(26)
    },
    textCode: {
        fontSize: moderateVerticalScale(14),
        fontFamily: fonts.light,
        fontWeight: "300",
        color: colors.text_v1,
    },
    resendText: {
        fontSize: moderateVerticalScale(14),
        fontFamily: fonts.medium,
        fontWeight: "500",
        color: colors.themeColor,
    }
})
