import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Wrapper from '../../components/wrapper'
import InputBox from '../../components/inputBox'
import { colors } from '../../constant/colors'
import { fonts } from '../../constant/fonts'
import { images } from '../../constant/images'
import { scale } from '../../utils/appScale'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native'
import { Calendar } from 'react-native-calendars';
import CustomCalendar from '../../components/customCalendar'




const { height } = Dimensions.get('window');

const OnboardingC = () => {
    const navigation = useNavigation()
    const [name, setName] = useState('');



    const goBack = () => {
        navigation.goBack()
    }

    const handlewNext = () => {
        navigation?.navigate('OnboardingC', { name });
    }



    return (
        <Wrapper barStyle="dark-content">
            <View style={styles.container}>
                <KeyboardAwareScrollView
                    style={{ flexGrow: 1 }}
                    contentContainerStyle={styles.scrollContainer}
                    extraHeight={200}
                    extraScrollHeight={200}
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
                                value={name}
                                onChangeText={setName}
                                placeholder="Street Address"
                            />
                            <InputBox
                                value={name}
                                onChangeText={setName}
                                placeholder="Apartment/Suite (Optional)"
                            />
                            <InputBox
                                value={name}
                                onChangeText={setName}
                                placeholder="City"
                            />
                            <InputBox
                                value={name}
                                onChangeText={setName}
                                placeholder="States"
                                onRightElementPress={() => setShowCalendar(true)}
                                rightElement={
                                    <Image source={images.down} style={styles.icons} />}
                            />
                            <InputBox
                                value={name}
                                onChangeText={setName}
                                placeholder="ZIP Code "
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

export default OnboardingC

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
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
        color: colors.black,
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
