import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from "../constant/colors";
import { scale } from "../utils/appScale";
import { fonts } from "../constant/fonts";
import { images } from '../constant/images';


const NewsDetails = ({ data }) => {
    return (
        <View style={{ flex: 1, paddingHorizontal: scale(15), backgroundColor: colors.white }}>
            <Text style={styles.title}>{"The On the Dot Award"}</Text>
            <View style={styles.metaRow}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image source={images.calender} style={styles.icon} />
                    <Text style={styles.meta}>{"'5th December, 1990'"}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image source={images.calender} style={styles.icon} />
                    <Text style={styles.meta}>{"Richard Blumenthal"}</Text>
                </View>
            </View>
            <Text style={styles.desc}>
                To amend the Department of Agriculture program for research and extension
                grants to increase participation by women and underrepresented minorities in
                the fields of science, technology, engineering, and mathematics to redesignate
                the program as the "Jeannette Rankin Women and Minorities in STEM Fields
                Program".
            </Text>
        </View>
    )
}

export default NewsDetails

const styles = StyleSheet.create({
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginBottom: 6,
    },
    title: {
        fontSize: scale(20),
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
        lineHeight: 16,
        fontSize: scale(13),
        fontWeight: '400',
        fontFamily: fonts.light,
        marginTop: scale(5),
    },

})