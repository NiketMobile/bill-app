import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Wrapper from '../../components/wrapper'
import InputBox from '../../components/inputBox'
import { colors } from '../../constant/colors'
import { fonts } from '../../constant/fonts'
import { images } from '../../constant/images'
import { moderateScale, scale } from '../../utils/appScale'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native'
import { Calendar } from 'react-native-calendars';
import CustomCalendar from '../../components/customCalendar'
import { apiServices } from '../../services/apiService'
import { useSelector } from 'react-redux'
import Loader from '../../components/loader'
import showToast from '../../components/showMessage'




const { height } = Dimensions.get('window');

const track_id = "2"

const OnboardingB = () => {
    const navigation = useNavigation()
    const userInfo = useSelector((state) => state?.userInfo?.userData)
    const [dob, setDob] = useState('');
    const [loading, setLoading] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);

    const [isErrors, setIsErrors] = useState({
        field: "",
        message: ""
    })

    const goBack = () => {
        navigation.goBack()
    }

    const isValid = () => {
        let newErrors = { field: "", message: "" };
        if (!dob?.trim()) {
            newErrors = {
                field: "dob",
                message: "Dob is required",
            };
            setIsErrors(newErrors);
            return false;
        }
        setIsErrors({ field: "", message: "" });
        return true;
    };

    const handleSubmit = async () => {
        const isValidated = isValid();
        console.log('isValidated', JSON.stringify(isValidated, null, 2))
        if (!isValidated) return;  // ⬅️ Stop execution if validation fails

        try {
            setLoading(true);
            const result = await apiServices.updateUserDoc(userInfo?.uid, {
                "date_of_birth": dob,
                track_id: track_id
            });

            if (result?.success) {
                showToast({
                    type: 'success',
                    title: 'Date Of Birth has been added successfully.',
                });
                navigation?.navigate('OnboardingC');
            } else {
                showToast({
                    type: 'error',
                    title: 'Something went wrong. Please try again.',
                });
            }
        } catch (error) {
            console.error('Onboarding start error:', error);
            showToast({
                type: 'error',
                title: 'Unexpected error occurred.',
            });
        } finally {
            setLoading(false);
        }
    }




    return (
        <Wrapper barStyle="dark-content" bgColor={colors.bg_v1}>
            <View style={styles.container}>
                <KeyboardAwareScrollView
                    style={{ flexGrow: 1 }}
                    contentContainerStyle={styles.scrollContainer}
                >
                    <View style={{ marginTop: scale(5) }}>
                        <TouchableOpacity onPress={goBack}>
                            <Image source={images.back_icon} style={{
                                width: scale(40),
                                height: scale(40),
                                resizeMode: "contain"
                            }} />
                        </TouchableOpacity>
                        <Text style={styles.nameTitle}>Hello, Christian</Text>
                        <Text style={styles.title}>What’s your date of birth?</Text>
                        <InputBox
                            value={dob}
                            onChangeText={setDob}
                            placeholder="date of birth"
                            onRightElementPress={() => setShowCalendar(true)}
                            rightElement={
                                <Image source={images.calender} style={styles.icons} />}
                            error={isErrors.field === "dob" ? isErrors.message : ""}
                        />
                        <CustomCalendar
                            visible={showCalendar}
                            onClose={() => setShowCalendar(false)}
                            onSelected={(date) => setDob(date)}
                        />
                    </View>
                </KeyboardAwareScrollView>

                <TouchableOpacity
                    style={[
                        styles.fab,
                        !dob.trim() && { backgroundColor: colors.tab_disabled }, // disable look if empty
                    ]}
                    onPress={() => {
                        handleSubmit()
                    }}
                    disabled={!dob.trim()}
                >
                    <Image source={images.right} style={{
                        width: 18,
                        height: 18,
                        resizeMode: "contain"
                    }} />
                </TouchableOpacity>
            </View>
            {
                loading && <Loader />
            }
        </Wrapper>
    )
}

export default OnboardingB

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg_v1,
        paddingHorizontal: scale(15),
    },
    scrollContainer: {
        flexGrow: 1,
    },
    nameTitle: {
        fontSize: moderateScale(14),
        fontFamily: fonts.light,
        fontWeight: "300",
        color: colors.text_v1,
        paddingVertical: scale(15),
    },
    title: {
        fontSize: moderateScale(30),
        fontFamily: fonts.medium,
        fontWeight: "500",
        color: colors.black,
        marginBottom: scale(15),
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
        width: scale(22),
        height: scale(22),
        resizeMode: "contain"
    }
})
