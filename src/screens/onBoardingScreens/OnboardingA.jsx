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
import { apiServices } from "../../services/apiService"
import { useSelector } from 'react-redux'
import Loader from '../../components/loader'
import showToast from '../../components/showMessage'


const { height } = Dimensions.get('window');

const track_id = "1"

const OnboardingA = () => {
    const navigation = useNavigation()
    const userInfo = useSelector((state) => state?.userInfo?.userData)
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [isErrors, setIsErrors] = useState({
        field: "",
        message: ""
    })

    const isValid = () => {
        let newErrors = { field: "", message: "" };
        if (!name?.trim()) {
            newErrors = {
                field: "name",
                message: "Name is required",
            };
            setIsErrors(newErrors);
            return false;
        }
        if (name?.trim()?.length < 5) {
            newErrors = {
                field: "name",
                message: "Name must be at least 5 characters long",
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
            const result = await apiServices.createUserDoc(userInfo?.uid, {
                name: name,
                track_id: track_id
            });
            if (result?.success) {
                showToast({
                    type: 'success',
                    title: 'Name has been added successfully.',
                });
                navigation?.navigate('OnboardingB');
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
    };





    return (
        <Wrapper barStyle="dark-content" bgColor={colors.bg_v1}>
            <View style={styles.container}>
                <KeyboardAwareScrollView
                    style={{ flexGrow: 1 }}
                    contentContainerStyle={styles.scrollContainer}
                >
                    <View style={{ marginTop: height / 15 - scale(10) }}>
                        <Text style={styles.title}>What should we call you?</Text>
                        <InputBox
                            value={name}
                            onChangeText={setName}
                            placeholder="Name"
                            error={isErrors.field === "name" ? isErrors.message : ""}
                        />
                    </View>
                </KeyboardAwareScrollView>
                <TouchableOpacity
                    style={[
                        styles.fab,
                        (!name.trim()) && { backgroundColor: colors.tab_disabled },
                    ]}
                    onPress={() => {
                        handleSubmit();
                    }}
                    disabled={!name.trim()}
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

export default OnboardingA

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
})
