import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Platform } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import Wrapper from '../../components/wrapper'
import InputBox from '../../components/inputBox'
import { colors } from '../../constant/colors'
import { fonts } from '../../constant/fonts'
import { images } from '../../constant/images'
import { moderateScale, scale } from '../../utils/appScale'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native'
import StatesBottomSheet from '../../components/statesBottomSheet'
import { useSelector } from 'react-redux'
import Loader from '../../components/loader'
import { apiServices } from '../../services/apiService'
import showToast from '../../components/showMessage'



const track_id = "3"

const OnboardingC = () => {
    const navigation = useNavigation()
    const userInfo = useSelector((state) => state?.userInfo?.userData)
    const sheetRef = useRef(null);
    const [selectedState, setSelectedState] = useState(null)
    const [streetAddress, setStreetAddress] = useState("")
    const [apartment, setApartment] = useState("")
    const [city, setCity] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [loading, setLoading] = useState(false);

    const goBack = () => {
        navigation.goBack()
    }

    // callbacks
    const handleSheetChange = useCallback((index) => {
        console.log("handleSheetChange", index);
    }, []);

    const handleSnapPress = useCallback((index) => {
        sheetRef.current?.snapToIndex(index);
    }, []);

    const handleClosePress = useCallback(() => {
        sheetRef.current?.close();
    }, []);

    const handleCountrySelect = useCallback((country) => {
        setSelectedState(country?.name);
        console.log('country', JSON.stringify(country, null, 2))
        handleClosePress();
    }, []);

    const handleOpenModal = useCallback(() => {
        sheetRef.current?.snapToIndex(2);
    }, []);

    const handlewSlectState = () => {
        handleOpenModal()
    }


    const [isErrors, setIsErrors] = useState({
        field: "",
        message: ""
    })

    const isValid = () => {
        let newErrors = { field: "", message: "" };

        if (!streetAddress?.trim()) {
            newErrors = { field: "streetAddress", message: "Street Address is required" };
            setIsErrors(newErrors);
            return false;
        }

        if (!apartment?.trim()) {
            newErrors = { field: "apartment", message: "Apartment Address is required" };
            setIsErrors(newErrors);
            return false;
        }

        // Apartment is optional → no check
        if (!city?.trim()) {
            newErrors = { field: "city", message: "City is required" };
            setIsErrors(newErrors);
            return false;
        }

        if (!selectedState?.trim()) {
            newErrors = { field: "selectedState", message: "State is required" };
            setIsErrors(newErrors);
            return false;
        }

        if (!zipCode?.trim()) {
            newErrors = { field: "zipCode", message: "ZIP Code is required" };
            setIsErrors(newErrors);
            return false;
        }

        // Zip must be 5 digits
        if (!/^\d{5}$/.test(zipCode.trim())) {
            newErrors = { field: "zipCode", message: "ZIP Code must be 5 digits" };
            setIsErrors(newErrors);
            return false;
        }

        // ✅ Clear errors if everything is valid
        setIsErrors({ field: "", message: "" });
        return true;
    };



    const handleSubmit = async () => {
        const isValidated = isValid();
        console.log('isValidated', JSON.stringify(isValidated, null, 2))
        if (!isValidated) return;  // ⬅️ Stop execution if validation fails

        try {
            setLoading(true);
            const addressData = {
                state: selectedState || "",
                streetAddress: streetAddress || "",
                apartment: apartment || "",
                city: city || "",
                zipCode: zipCode || "",
            };
            const result = await apiServices.updateUserDoc(userInfo?.uid, {
                "address_data": addressData,
                track_id: track_id
            });

            if (result?.success) {
                showToast({
                    type: 'success',
                    title: 'Address has been added successfully.',
                });
                // navigation?.navigate('OnboardingD');
                navigation?.navigate('OnboardingE');
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
                    extraScrollHeight={Platform.select({ ios: 40, android: 140 })}
                    enableOnAndroid
                    enableAutomaticScroll
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ marginTop: scale(5) }}>
                        <TouchableOpacity onPress={goBack}>
                            <Image source={images.back_icon} style={styles.backIcon} />
                        </TouchableOpacity>
                        <Text style={styles.title}>Where do you live?</Text>
                        <Text style={styles.desc}>We’ll show you legislation that affects your state and community</Text>
                        <View style={{ flex: 1 }}>
                            <InputBox
                                value={streetAddress}
                                onChangeText={(t) => setStreetAddress(t)}
                                placeholder="Street Address"
                                rightElement={
                                    streetAddress?.length > 0 ? (
                                        <Image source={images.edit} style={styles.editIcons} />
                                    ) : null
                                }
                                error={isErrors.field === "streetAddress" ? isErrors.message : ""}
                            />
                            <InputBox
                                value={apartment}
                                onChangeText={(t) => setApartment(t)}
                                placeholder="Apartment/Suite (Optional)"
                                rightElement={
                                    apartment?.length > 0 ? (
                                        <Image source={images.edit} style={styles.editIcons} />
                                    ) : null
                                }
                                error={isErrors.field === "apartment" ? isErrors.message : ""}
                            />
                            <InputBox
                                value={city}
                                onChangeText={(t) => setCity(t)}
                                placeholder="City"
                                rightElement={
                                    city?.length > 0 ? (
                                        <Image source={images.edit} style={styles.editIcons} />
                                    ) : null
                                }
                                error={isErrors.field === "city" ? isErrors.message : ""}
                            />
                            <InputBox
                                value={selectedState}
                                onChangeText={(t) => { setSelectedState(t) }}
                                placeholder="States"
                                onRightElementPress={handlewSlectState}
                                rightElement={
                                    selectedState?.length > 0 ? (
                                        <Image source={images.edit} style={styles.editIcons} />
                                    ) : <Image source={images.down} style={styles.icons} />
                                }
                                error={isErrors.field === "selectedState" ? isErrors.message : ""}
                            />
                            <InputBox
                                value={zipCode}
                                onChangeText={(t) => setZipCode(t)}
                                placeholder="ZIP Code "
                                rightElement={
                                    zipCode?.length > 0 ? (
                                        <Image source={images.edit} style={styles.editIcons} />
                                    ) : null
                                }
                                error={isErrors.field === "zipCode" ? isErrors.message : ""}
                            />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
                <TouchableOpacity style={[styles.fab]} onPress={handleSubmit} >
                    <Image source={images.right} style={styles.rightIcon} />
                </TouchableOpacity>
                <StatesBottomSheet
                    ref={sheetRef}
                    onCountrySelect={handleCountrySelect}
                    snapPoints={["50%", "75%"]}
                />
            </View>
            {
                loading && <Loader />
            }
        </Wrapper>
    )
}

export default OnboardingC

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
        fontSize: moderateScale(15),
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
    }
})
