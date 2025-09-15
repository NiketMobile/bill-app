// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import Wrapper from '../../../components/wrapper'
// import AppHeader from '../../../components/AppHeader'
// import { colors } from '../../../constant/colors'
// import { images } from '../../../constant/images'
// import { useNavigation } from '@react-navigation/native'
// import { scale } from '../../../utils/appScale'

// const FilterScreen = () => {
//     const navigation = useNavigation()



//     return (
//         <Wrapper barStyle="dark-content" bgColor={colors.bg_v1}>
//             <View style={styles.containerView}>
//                 <AppHeader
//                     title="Filter"
//                     leftIcon={images.back_2}
//                     onLeftPress={() => navigation.goBack()}
//                 />



//                 <Text>FilterScreen</Text>
//             </View>
//         </Wrapper>
//     )
// }

// export default FilterScreen

// const styles = StyleSheet.create({
//     containerView: {
//         flex: 1,
//         backgroundColor: colors.bg_v1,
//         paddingHorizontal: scale(15),
//     },
// })


import React, { useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Platform,
} from "react-native";
import { colors } from "../../../constant/colors";
import { fontScale, scale } from "../../../utils/appScale";
import Wrapper from "../../../components/wrapper";
import AppHeader from "../../../components/AppHeader";
import { images } from "../../../constant/images";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "../../../constant/fonts";
// import Icon from "react-native-vector-icons/Ionicons";

const Chip = ({ label, selected, onPress }) => (
    <TouchableOpacity
        style={[styles.chip, selected ? styles.chipSelected : null]}
        onPress={onPress}
        activeOpacity={0.8}
    >
        <Text style={[styles.chipText, selected ? styles.chipTextSelected : null]}>
            {label}
        </Text>
    </TouchableOpacity>
);



const Radio = ({ label, subtitle, selected, onPress }) => (
    <TouchableOpacity style={styles.radioRow} onPress={onPress} activeOpacity={0.8}>
        <View style={styles.radioTextWrap}>
            <Text style={styles.radioLabel}>{label}</Text>
            {subtitle ? <Text style={styles.radioSubtitle}>{subtitle}</Text> : null}
        </View>
        <View style={[styles.radioOuter, selected ? styles.radioOuterSelected : null]}>
            {selected ? <View style={styles.radioInner} /> : null}
        </View>
    </TouchableOpacity>
);


export default function FilterScreen() {
    const navigation = useNavigation()
    const [selectedStates, setSelectedStates] = useState(["All States", "Arizona"]);
    const [selectedAges, setSelectedAges] = useState(["18-25"]);
    const [selectedSort, setSelectedSort] = useState(null); // 'recent'|'approved'|'popularity'
    const [selectedReligion, setSelectedReligion] = useState([]);
    const [selectedRace, setSelectedRace] = useState([]);
    const [selectedGender, setSelectedGender] = useState(["Male"]);

    const toggleArray = (value, setter, arr) => {
        if (arr.includes(value)) {
            setter(arr.filter((v) => v !== value));
        } else {
            setter([...arr, value]);
        }
    };




    return (
        <Wrapper barStyle="dark-content" bgColor={colors.bg_v1}>
            <View style={styles.containerView}>
                <AppHeader
                    title="Filter"
                    leftIcon={images.back_2}
                    onLeftPress={() => navigation.goBack()}
                />
                <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                    <View style={styles.card}>
                        {/* <Text style={styles.sectionTitle}>Search in:</Text>
                        <View style={styles.rowWrap}>
                            {["All States", "Arizona", "New York", "New Jersey", "California"].map((s) => (
                                <Chip
                                    key={s}
                                    label={s}
                                    selected={selectedStates.includes(s)}
                                    onPress={() =>
                                        toggleArray(s, setSelectedStates, selectedStates)
                                    }
                                />
                            ))}
                        </View> */}


                        <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Sort by:</Text>
                        <Radio
                            label="Recent"
                            subtitle="From newest to old"
                            selected={selectedSort === "recent"}
                            onPress={() => setSelectedSort("recent")}
                        />
                        <Radio
                            label="Approved"
                            subtitle="From newest to old"
                            selected={selectedSort === "approved"}
                            onPress={() => setSelectedSort("approved")}
                        />
                        <Radio
                            label="Popularity"
                            subtitle="From higher to lower"
                            selected={selectedSort === "popularity"}
                            onPress={() => setSelectedSort("popularity")}
                        />

                        <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Demographics:</Text>

                        <Text style={styles.subHeading}>Participants age</Text>
                        <Text style={styles.smallHint}>From lower to higher</Text>
                        <View style={styles.rowWrap}>
                            {["18-25", "26-36", "37-45", "45-60"].map((a) => (
                                <Chip
                                    key={a}
                                    label={a}
                                    selected={selectedAges.includes(a)}
                                    onPress={() => setSelectedAges([a])} // single-select for ages in screenshot
                                />
                            ))}
                        </View>

                        <Text style={styles.subHeading}>Most Participants Religion</Text>
                        <Text style={styles.smallHint}>From newest to old</Text>
                        <View style={styles.rowWrap}>
                            {["Christians", "Muslims", "Hindus", "Others"].map((r) => (
                                <Chip
                                    key={r}
                                    label={r}
                                    selected={selectedReligion.includes(r)}
                                    onPress={() => toggleArray(r, setSelectedReligion, selectedReligion)}
                                />
                            ))}
                        </View>

                        <Text style={styles.subHeading}>Most Participants Race</Text>
                        <Text style={styles.smallHint}>From newest to old</Text>
                        <View style={styles.rowWrap}>
                            {["White", "Black", "Asian", "Other"].map((r) => (
                                <Chip
                                    key={r}
                                    label={r}
                                    selected={selectedRace.includes(r)}
                                    onPress={() => toggleArray(r, setSelectedRace, selectedRace)}
                                />
                            ))}
                        </View>

                        <Text style={styles.subHeading}>Most Participants Gender</Text>
                        <Text style={styles.smallHint}>From newest to old</Text>
                        <View style={styles.rowWrap}>
                            {["Male", "Female", "Others"].map((g) => (
                                <Chip
                                    key={g}
                                    label={g}
                                    selected={selectedGender.includes(g)}
                                    onPress={() => setSelectedGender([g])}
                                />
                            ))}
                        </View>

                        <View style={{ height: 28 }} />
                    </View>
                </ScrollView>

            </View>
        </Wrapper>


    );
}

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        backgroundColor: colors.bg_v1,
        paddingHorizontal: scale(15),
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1f2f3a",
    },
    container: {
        paddingBottom: 40,
    },
    sectionTitle: {
        fontSize: fontScale(20),
        fontWeight: "600",
        fontFamily: fonts.semiBold,
        color: colors.text,
        // marginBottom: 8,
    },

    subHeading: {
        marginTop: scale(15),
        fontSize: fontScale(16),
        fontWeight: "600",
        fontFamily: fonts.semiBold,
        color: colors.text,
    },

    smallHint: {
        fontSize: fontScale(14),
        fontWeight: "400",
        fontFamily: fonts.regular,
        color: colors.text_v1,
        marginTop: 4,
        marginBottom: 8,
    },

    rowWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        // gap isn't supported on RN below 0.71; use margins on chips below
    },

    chip: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#CFE9D6",
        backgroundColor: colors.white,
        marginRight: 8,
    },
    chipSelected: {
        backgroundColor: colors.white,
        borderColor: colors.themeColor,
    },
    chipText: {
        fontSize: fontScale(14),
        fontWeight: "400",
        fontFamily: fonts.regular,
        color: colors.text_v1,
    },
    chipTextSelected: {
        color: colors.text_v1,
    },
    radioRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        justifyContent: "space-between",
        borderBottomWidth: 0,
    },
    radioTextWrap: {
        flex: 1,
    },
    radioLabel: {
        fontSize: fontScale(16),
        fontWeight: "600",
        fontFamily: fonts.semiBold,
        color: colors.text,
    },
    radioSubtitle: {
        fontSize: fontScale(14),
        fontWeight: "400",
        fontFamily: fonts.regular,
        color: colors.text_v1,
        marginTop: 4,
    },
    radioOuter: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: colors.tab_disabled,
        alignItems: "center",
        justifyContent: "center",
    },
    radioOuterSelected: {
        borderColor: colors.themeColor,
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.themeColor,
    },
});