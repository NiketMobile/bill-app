import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Platform } from 'react-native'
import React, { useState } from 'react'
import Wrapper from '../../components/wrapper'
import InputBox from '../../components/inputBox'
import { colors } from '../../constant/colors'
import { fonts } from '../../constant/fonts'
import { images } from '../../constant/images'
import { moderateScale, scale } from '../../utils/appScale'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import showToast from '../../components/showMessage'
import { sendOtpAction } from '../../services/authCalls'
import Loader from '../../components/loader'
import { useKeyboard } from '../../hooks/useKeyboard'



const track_id = "4"

const OnboardingE = () => {
    const navigation = useNavigation()
    const { keyboardVisible } = useKeyboard();
    const userInfo = useSelector((state) => state?.userInfo?.userData)
    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("")

    const goBack = () => {
        navigation.goBack()
    }

    const handlewNext = () => {
        navigation?.navigate('OnboardingF');
    }

    const [isErrors, setIsErrors] = useState({
        field: "",
        message: ""
    });


    const isValid = () => {
        let newErrors = { field: "", message: "" };

        // ✅ Phone number validation
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneNumber?.trim()) {
            newErrors = {
                field: "phoneNumber",
                message: "Phone number is required",
            };
            setIsErrors(newErrors);
            return false;
        } else if (!phoneRegex.test(phoneNumber)) {
            newErrors = {
                field: "phoneNumber",
                message: "Enter a valid 10-digit phone number",
            };
            setIsErrors(newErrors);
            return false;
        }
        // ✅ No errors
        setIsErrors({ field: "", message: "" });
        return true;
    }



    const handleSubmit = async () => {
         const isValidated = isValid();
        console.log('isValidated', JSON.stringify(isValidated, null, 2));
        if (!isValidated) return; // Stop if validation fails
        navigation?.navigate('OnboardingF');

        // const isValidated = isValid();
        // console.log('isValidated', JSON.stringify(isValidated, null, 2));
        // if (!isValidated) return; // Stop if validation fails

        // try {
        //     setLoading(true);
        //     const USA = "+1";
        //     const INDIA = "+91";

        //     const countryCode = INDIA;
        //     const numberValue = `${countryCode}${phoneNumber}`;

        //     const { success, confirm, message } = await sendOtpAction(numberValue);

        //     console.log('confirm', JSON.stringify(confirm, null, 2))
        //     console.log('message', JSON.stringify(message, null, 2))

        //     if (!success) {
        //         showToast({
        //             type: 'error',
        //             title: message || "Failed to send OTP. Please try again.",
        //         });
        //         return;
        //     }
        //     navigation?.navigate('OnboardingF', { confirmData: confirm });

        //     showToast({
        //         type: 'success',
        //         title: "OTP sent successfully!",
        //     });

        // } catch (error) {
        //     console.error('handleSubmit error:', error);
        //     showToast({
        //         type: 'error',
        //         title: 'Unexpected error occurred.',
        //     });
        // } finally {
        //     setLoading(false);
        // }
    };





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
                        <Text style={styles.title}>Enter the phone number</Text>
                        <Text style={styles.desc}>We’ll send you a quick code to confirm it’s really you.</Text>

                        <View style={{ flexDirection: "row", width: "100%", }}>
                            {/* Left Button */}
                            <TouchableOpacity
                                style={[styles.leftbutton, {
                                    height: Platform.OS === "ios" ? scale(44) : scale(46)
                                }]}
                            >
                                <Image
                                    source={images.flag}
                                    style={styles.downIcon}
                                />
                            </TouchableOpacity>
                            <View style={{ flex: 1 }}>
                                <InputBox
                                    value={phoneNumber}
                                    onChangeText={(t) => setPhoneNumber(t?.replace(/[^0-9]/g, ''))}
                                    placeholder=""
                                    keyboardType='number-pad'
                                    error={isErrors.field === "phoneNumber" ? isErrors.message : ""}
                                // inputStyle={{
                                //     minHeight: Platform.OS === "ios" ? scale(44) : scale(46),
                                //     // borderTopLeftRadius: 0,
                                //     // borderBottomLeftRadius: 0,
                                //     backgroundColor: colors.white
                                // }}
                                />
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
                {!keyboardVisible &&
                    <TouchableOpacity style={[styles.fab]} onPress={handleSubmit} >
                        <Image source={images.right} style={styles.rightIcon} />
                    </TouchableOpacity>
                }
            </View>
            {
                loading && <Loader />
            }
        </Wrapper>
    )
}

export default OnboardingE

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
    icons: {
        width: scale(23),
        height: scale(23),
        resizeMode: "contain"
    },
    editIcons: {
        width: scale(25),
        height: scale(25),
        resizeMode: "contain"
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
    leftbutton: {
        width: scale(45),
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.theme_v2,
        marginRight: 10,
        borderRadius: scale(4),
    },
    downIcon: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    }
})
