import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Platform, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Wrapper from '../../components/wrapper'
import InputBox from '../../components/inputBox'
import { colors } from '../../constant/colors'
import { fonts } from '../../constant/fonts'
import { images } from '../../constant/images'
import { moderateVerticalScale, scale } from '../../utils/appScale'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native'
import { selectDisability, selectIncomeRange } from '../../constant/dataJson'
import { apiServices } from '../../services/apiService'
import showToast from '../../components/showMessage'
import Loader from '../../components/loader'
import { useDispatch, useSelector } from 'react-redux'
import { getCollectionAction } from '../../redux/actions/getCollectionsAction'


const track_id = "11"

const OnboardingL = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state?.userInfo?.userData)
    const [loading, setLoading] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const { data, loading: loader, error } = useSelector((state) => state?.collectionReducer)


    useEffect(() => {
        dispatch(getCollectionAction({ collectionName: "IncomeRange" }));
    }, [])

    const goBack = () => {
        navigation.goBack()
    }

    const [isErrors, setIsErrors] = useState({
        field: "",
        message: ""
    })

    const isValid = () => {
        let newErrors = { field: "", message: "" };

        if (!selectedId) {
            newErrors = {
                field: "sexualOrientation",
                message: "Select Income range is required",
            };
            showToast({
                type: 'error',
                title: 'Select income range, is required',
            });
            setIsErrors(newErrors);
            return false;
        }
        setIsErrors({ field: "", message: "" });
        return true;
    };



    const handleSubmit = async () => {
        const isValidated = isValid();
        console.log('isValidated', JSON.stringify(isValidated, null, 2))
        if (!isValidated) return;  // ⬅️ Stop execution if validation fails
        try {
            setLoading(true);
            const result = await apiServices.updateUserDoc(userInfo?.uid, {
                "income_range_id": selectedId,
                track_id: track_id
            });
            if (result?.success) {
                showToast({
                    type: 'success',
                    title: 'Income range has been added successfully.',
                });
                navigation?.navigate('OnboardingM');
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
                    {item.name}
                </Text>
                <View style={styles.radioOuter}>
                    {selectedId == item.id ? (
                        <Image source={images.radio_check} style={styles.radioInner} />
                    ) : (
                        <Image source={images.radio} style={styles.radioInner} />
                    )}
                </View>
            </TouchableOpacity>
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
                    extraScrollHeight={20}
                    enableOnAndroid={true}
                    showsVerticalScrollIndicator={false} >
                    <View style={{ marginTop: scale(5) }}>
                        <Text style={styles.nameTitle}>Good going,</Text>
                        <Text style={styles.title}>What is your income range</Text>
                        <View style={{ flex: 1 }}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                // data={selectIncomeRange}
                                data={data}
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
                <TouchableOpacity style={[styles.fab]} onPress={handleSubmit} >
                    <Image source={images.right} style={styles.rightIcon} />
                </TouchableOpacity>
            </View>
            {
                (loader || loading) && <Loader />
            }
        </Wrapper>
    )
}

export default OnboardingL

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
        fontSize: moderateVerticalScale(14),
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
