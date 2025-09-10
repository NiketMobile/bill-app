import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Platform, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Wrapper from '../../components/wrapper'
import InputBox from '../../components/inputBox'
import { colors } from '../../constant/colors'
import { fonts } from '../../constant/fonts'
import { images } from '../../constant/images'
import { moderateVerticalScale, scale } from '../../utils/appScale'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native'
import { selectDisability, selectReligion } from '../../constant/dataJson'



const OnboardingM = () => {
    const navigation = useNavigation()
    const [selectedId, setSelectedId] = useState(null);
    const [otherValue, setOtherValue] = useState("");

    const goBack = () => {
        navigation.goBack()
    }

    const handlewNext = () => {
        navigation?.navigate('OnboardingN');
    }


    const renderItem = ({ item }) => (
        <View style={{ marginBottom: scale(5) }}>
            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.optionContainer}
                onPress={() => setSelectedId(item.id)}
            >
                <Text
                    style={[
                        styles.optionText,
                        {
                            color: selectedId == item.id ? colors.text : colors.theme_v1,
                        },
                    ]}
                >
                    {item.title}
                </Text>
                <View style={styles.radioOuter}>
                    {selectedId == item.id ? (
                        <Image source={images.radio_check} style={styles.radioInner} />
                    ) : (
                        <Image source={images.radio} style={styles.radioInner} />
                    )}
                </View>
            </TouchableOpacity>
            {item.id === 9 && selectedId === 9 && (
                <View style={{ marginTop: selectedId == item?.id ? scale(7) : 0 }}>
                    <InputBox
                        value={otherValue}
                        onChangeText={setOtherValue}
                        placeholder="Please specify"
                        multiline={true}
                        mainContainerStyle={{
                            marginBottom: 0,
                        }}
                        inputStyle={{
                            height: scale(65),
                            textAlignVertical: "top",
                            marginTop: scale(5),
                        }}
                    />
                </View>
            )}
        </View>
    );


    return (
        <Wrapper barStyle="dark-content" bgColor={colors.bg_v1}>
            <View style={styles.container}>
                <TouchableOpacity onPress={goBack}>
                    <Image source={images.back_icon} style={styles.backIcon} />
                </TouchableOpacity>
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
                        <Text style={styles.nameTitle}>Good going,,</Text>
                        <Text style={styles.title}>What is your religion?</Text>
                        <View style={{ flex: 1 }}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={selectReligion}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id}
                                ListFooterComponent={() => {
                                    return (
                                        <View style={{ height: scale(50) }} />
                                    )
                                }}
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

export default OnboardingM

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
        fontSize: moderateVerticalScale(14),
        fontFamily: fonts.light,
        fontWeight: "300",
        color: colors.text_v1,
        paddingTop: scale(6),
        paddingBottom: scale(3),
    },
    title: {
        fontSize: moderateVerticalScale(30),
        fontFamily: fonts.medium,
        fontWeight: "500",
        color: colors.black,
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
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        borderWidth: 1,
        borderRadius: scale(4),
        paddingHorizontal: scale(10),
        height: scale(46),
        borderColor: colors.theme_v2,
        backgroundColor: colors.white
    },
    radioInner: {
        width: scale(25),
        height: scale(25),
        resizeMode: "contain"
    },
    optionText: {
        fontSize: scale(14),
        fontFamily: fonts.regular,
        fontWeight: "400",
    },
    radioOuter: {
        width: scale(25),
        height: scale(25),
        justifyContent: "center",
        alignItems: "center",
    },
})
