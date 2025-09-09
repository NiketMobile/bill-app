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


const { height } = Dimensions.get('window');

const OnboardingA = () => {
    const navigation = useNavigation()
    const [name, setName] = useState('');

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
                        />
                    </View>
                </KeyboardAwareScrollView>

                <TouchableOpacity
                    style={[
                        styles.fab,
                        // !name.trim() && { backgroundColor: colors.tab_disabled }, // disable look if empty
                    ]}
                    onPress={() => {
                        navigation?.navigate('OnboardingB');
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
})
