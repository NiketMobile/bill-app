// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { colors } from '../../../constant/colors'
// import Wrapper from '../../../components/wrapper'
// import { scale } from '../../../utils/appScale'




// const SearchScreen = () => {
//     return (
//         <Wrapper barStyle="dark-content" bgColor={colors.bg_v1}>
//             <View style={styles.container}>

//                 <Text>SearchScreen</Text>
//             </View>
//         </Wrapper>
//     )
// }

// export default SearchScreen

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: colors.bg_v1,
//         paddingHorizontal:scale(15)
//     },
// })


import {
    FlatList,
    Image,
    Keyboard,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import { colors } from '../../../constant/colors'
import Wrapper from '../../../components/wrapper'
import { fontScale, scale } from '../../../utils/appScale'
import { images } from "../../../constant/images";
import { fonts } from "../../../constant/fonts";
import { useNavigation } from "@react-navigation/native";



const bills = [
    {
        id: 1,
        name: "100 Years of Women in Act",
        description: "100 Years of Women in Act",
        status: "Approved",
        image: images.liked,
    },
    {
        id: 2,
        name: "100 Years of Women in Act",
        description: "100 Years of Women in Act",
        status: "Rejected",
        image: images.disliked,
    },
    {
        id: 3,
        name: "100 Years of Women in Act",
        description: "100 Years of Women in Act",
        status: "Approved",
        image: images.nutral,
    },
    {
        id: 4,
        name: "100 Years of Women in Act",
        description: "100 Years of Women in Act",
        status: "Approved",
        image: images.nutral,
    },
    {
        id: 5,
        name: "100 Years of Women in Act",
        description: "100 Years of Women in Act",
        status: "Success",
        image: images.nutral,
    },
    {
        id: 6,
        name: "100 Years of Women in Act",
        description: "100 Years of Women in Act",
        status: "Approved",
        image: images.nutral,
    },
    {
        id: 7,
        name: "100 Years of Women in Act",
        description: "100 Years of Women in Act",
        status: "Success",
        image: images.nutral,
    },
    {
        id: 8,
        name: "100 Years of Women in Act",
        description: "100 Years of Women in Act",
        status: "Approved",
        image: images.nutral,
    },
    {
        id: 9,
        name: "100 Years of Women in Act",
        description: "100 Years of Women in Act",
        status: "Rejected",
        image: images.nutral,
    },
];

const Search = () => {
    const navigation = useNavigation()



    return (
        <Wrapper barStyle="dark-content" bgColor={colors.bg_v1}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <View style={styles.searchContainer}>
                        <TouchableOpacity onPress={() => {
                            navigation.goBack()
                        }}
                            style={styles.backContainer}
                        >
                            <Image source={images.back_2} style={styles.searchIcon} />
                        </TouchableOpacity>
                        <View
                            style={styles.searchGradient}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 10,
                                    backgroundColor: "#fff",
                                    borderRadius: 25,
                                    paddingHorizontal: 12,
                                }}
                            >
                                <TextInput placeholder="Search" style={styles.searchInput} placeholderTextColor={colors.theme_v1} />
                                <Image source={images.search} style={styles.searchIcon} />
                            </View>
                        </View>

                    </View>
                    <View style={styles.billContainer}>
                        <FlatList
                            data={bills}
                            renderItem={({ item, index }) => (
                                <View style={styles.tickContainer} key={index}>
                                    <View
                                        style={[
                                            styles.tickIconContainer,
                                            {
                                                backgroundColor:
                                                    item.status === "Approved"
                                                        ? "#F5F6FA"
                                                        : item.status === "Rejected"
                                                            ? "#FAF5F5"
                                                            : "#F6FAF6",
                                            },
                                        ]}
                                    >
                                        <Image source={item?.image} style={[styles.tickIcon]} />
                                    </View>
                                    <View style={styles.billDetails}>
                                        <Text style={styles.billName}>{item.name}</Text>
                                        <Text style={styles.billDescription}>{item.description}</Text>
                                    </View>
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={() => (
                                <View style={{ height: 1.5, backgroundColor: "#A7ACC54D" }} />
                            )}
                        />
                        {/* <TouchableOpacity onPress={() => router.push("/bill/searchedBills")}>
                    <LinearGradient
                        colors={["#EAEEF4", "#EEB8B9"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradientBorder}
                    >
                        <LinearGradient
                            colors={["#A1B1FF80", "#E1E6EF", "#EEB8B9"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.gradientButton}
                        >
                            <Text style={styles.gradientButtonText}>View All</Text>
                        </LinearGradient>
                    </LinearGradient>
                </TouchableOpacity> */}
                    </View>
                </View>

            </TouchableWithoutFeedback>

        </Wrapper>
    );
};

export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg_v1,
        paddingHorizontal: scale(15)
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    },
    searchIcon: {
        width: scale(17),
        height: scale(17),
        resizeMode: "contain",
        marginRight: 1,
    },
    backContainer: {
        borderRadius: 50,
        width: scale(40),
        height: scale(40),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white
    },
    searchGradient: {
        borderRadius: 25,
        padding: 1.5,
        flex: 1,
        borderColor: colors.theme_v2,
        borderWidth: 0.7
    },
    searchInput: {
        width: "90%",
        fontSize: 16,
        color: "#000",
        height: scale(38),
        paddingLeft: 5
    },
    billContainer: {
        // flex: 1,
        marginTop: 20,
        backgroundColor: "#fff",
        borderRadius: 12,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    tickIcon: {
        height: 40,
        width: 40,
        resizeMode: "contain",
        // marginRight: 1,
    },
    tickContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        gap: 10,
    },
    billName: {
        fontSize: fontScale(16),
        fontFamily: fonts.regular,
        fontWeight: "400",
        color: colors.text
    },
    billDescription: {
        fontSize: fontScale(14),
        fontFamily: fonts.light,
        fontWeight: "300",
        color: colors.text
    },
    billDetails: {
        gap: 3,
    },
    gradientBorder: {
        borderRadius: 6,
        padding: 1.5,
        alignSelf: "center",
        marginBottom: 15,
        marginTop: 10,
    },
    gradientButton: {
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 25,
        alignSelf: "center",
    },
    gradientButtonText: {
        color: "#050A20",
        fontSize: 16,
        fontWeight: "500",
    },
    tickIconContainer: {
        borderRadius: 50,
        padding: 5,
        borderWidth: 0.4,
        borderColor: colors.theme_v2
    },
});
