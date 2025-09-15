import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppHeader from '../../../components/AppHeader'
import Wrapper from '../../../components/wrapper'
import { colors } from '../../../constant/colors'
import { images } from '../../../constant/images'
import { useNavigation } from '@react-navigation/native'
import { scale } from '../../../utils/appScale'
import { fonts } from '../../../constant/fonts'

const AboutUs = () => {
    const navigation = useNavigation();


    return (
        <Wrapper barStyle="dark-content" bgColor={colors.bg_v1}>
            <View style={styles.containerView}>
                <AppHeader
                    title="About us"
                    leftIcon={images.back_2}
                    onLeftPress={() => navigation.goBack()}
                />
                <ScrollView style={{
                    flex: 1,
                    paddingHorizontal: scale(15),
                    backgroundColor: colors.white,
                    paddingVertical: scale(15),
                    borderRadius: 10,
                    marginTop: scale(15)
                }}>
                    <Text style={styles.title}>{"The On the Dot Award"}</Text>
                    <Text style={styles.desc}>
                        To amend the Department of Agriculture program for research and extension
                        grants to increase participation by women and underrepresented minorities in
                        the fields of science, technology, engineering, and mathematics to redesignate
                        the program as the "Jeannette Rankin Women and Minorities in STEM Fields
                        Program".
                    </Text>
                </ScrollView>

            </View>
        </Wrapper>
    )
}

export default AboutUs

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        backgroundColor: colors.bg_v1,
        paddingHorizontal: scale(15),
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginBottom: 6,
    },
    title: {
        fontSize: scale(16),
        fontWeight: '600',
        fontFamily: fonts.semiBold,
        color: colors.text,
        marginBottom: scale(5),
    },
    icon: {
        width: scale(14),
        height: scale(14),
        tintColor: colors.theme_v1,
        marginRight: 4,
    },
    meta: {
        fontSize: scale(12),
        fontWeight: '400',
        fontFamily: fonts.regular,
        color: colors.theme_v1,
    },
    dot: {
        marginHorizontal: 6,
        color: colors.text_v3,
    },
    desc: {
        color: colors.text_v1,
        lineHeight: 18,
        fontSize: scale(13),
        fontWeight: '400',
        fontFamily: fonts.light,
        marginTop: scale(5),
    },
})