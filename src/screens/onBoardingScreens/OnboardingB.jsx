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

const OnboardingB = () => {
    const navigation = useNavigation()
    const [name, setName] = useState('');
    const [isDate, setIsDate] = useState(false)
    const [selectDate, setSelectDate] = useState("")

    const [dob, setDob] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);


    const goBack = () => {
        navigation.goBack()
    }


    console.log('dob', JSON.stringify(dob, null, 2))



    return (
        <Wrapper barStyle="dark-content">
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
                        // !name.trim() && { backgroundColor: colors.tab_disabled }, // disable look if empty
                    ]}
                    onPress={() => {
                        navigation?.navigate('OnboardingB', { name });
                        // if (name.trim()) {
                        //     navigation?.navigate('OnboardingB', { name });
                        // }
                    }}
                // disabled={!name.trim()}
                >
                    <Image source={images.right} style={{
                        width: 18,
                        height: 18,
                        resizeMode: "contain"
                    }} />
                </TouchableOpacity>

            </View>
        </Wrapper>
    )
}

export default OnboardingB

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: scale(15),
    },
    scrollContainer: {
        flexGrow: 1,
    },
    nameTitle: {
        fontSize: scale(14),
        fontFamily: fonts.light,
        fontWeight: "300",
        color: colors.text_v1,
        paddingVertical: scale(15),
    },
    title: {
        fontSize: scale(30),
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
