import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import Wrapper from '../../components/wrapper'
import InputBox from '../../components/inputBox'
import { colors } from '../../constant/colors'
import { fonts } from '../../constant/fonts'
import { images } from '../../constant/images'
import { scale } from '../../utils/appScale'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native'
import StatesBottomSheet from '../../components/statesBottomSheet'




const OnboardingC = () => {
    const navigation = useNavigation()
    const sheetRef = useRef(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [name, setName] = useState('');
    const [streetAddress, setStreetAddress] = useState("")
    const [apartment, setApartment] = useState("")
    const [city, setCity] = useState("")
    const [zipCode, setZipCode] = useState("")

    const goBack = () => {
        navigation.goBack()
    }

    const handlewNext = () => {
        navigation?.navigate('OnboardingD', { name });
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
        setSelectedCountry(country?.name);
        console.log('country', JSON.stringify(country, null, 2))
        handleClosePress();
    }, []);

    const handleOpenModal = useCallback(() => {
        sheetRef.current?.snapToIndex(2);
    }, []);

    const handlewSlectState = () => {
        handleOpenModal()
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
                            />
                            <InputBox
                                value={selectedCountry}
                                onChangeText={(t) => { setSelectedCountry(t) }}
                                placeholder="States"
                                onRightElementPress={handlewSlectState}
                                rightElement={
                                    selectedCountry?.length > 0 ? (
                                        <Image source={images.edit} style={styles.editIcons} />
                                    ) : <Image source={images.down} style={styles.icons} />
                                }
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
                            />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
                <TouchableOpacity style={[styles.fab]} onPress={handlewNext} >
                    <Image source={images.right} style={styles.rightIcon} />
                </TouchableOpacity>
                <StatesBottomSheet
                    ref={sheetRef}
                    onCountrySelect={handleCountrySelect}
                    snapPoints={["50%", "75%"]}
                />
            </View>
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
        fontSize: scale(30),
        fontFamily: fonts.medium,
        fontWeight: "500",
        color: colors.black,
        paddingTop: scale(15),
    },
    desc: {
        fontSize: scale(15),
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
