import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { forwardRef, useCallback, useEffect, useMemo, useState } from 'react'
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { STATES } from '../constant/dataJson';
import InputBox from './inputBox';
import { colors } from '../constant/colors';
import { fonts } from '../constant/fonts';
import { scale } from '../utils/appScale';
import { images } from '../constant/images';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStatesAction } from '../redux/actions/getStatesAction';
import Loader from './loader';
import { useFocusEffect } from '@react-navigation/native';



const StatesBottomSheet = forwardRef(({ onCountrySelect }, ref) => {
    const snapPoints = useMemo(() => ["70%", "85%", "98%"], []);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const dispatch = useDispatch()
    const { data, loading, error } = useSelector((state) => state?.statesReducer)

    useEffect(() => {
        dispatch(getAllStatesAction({ collectionName: "States" }));
    }, [])

    // Filter countries based on search query
    const filteredCountries = useMemo(() => {
        if (!searchQuery) return data;
        return data?.filter(country =>
            country?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            country?.code.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, data]);

    const handleCountrySelect = useCallback((country) => {
        setSelectedCountry(country);
        onCountrySelect?.(country);
    }, [onCountrySelect]);

    const renderCountryItem = useCallback(({ item }) => (
        <TouchableOpacity
            style={[
                styles.countryItem,
            ]}
            onPress={() => handleCountrySelect(item)}
        >
            <Text style={styles.countryName}>{item.name}</Text>
            {
                selectedCountry?.code === item.code && (
                    <Image source={images.check} style={styles.checkIcon} />
                )
            }
        </TouchableOpacity>
    ), [selectedCountry, handleCountrySelect]);


    return (
        <BottomSheet
            ref={ref}
            index={-1}
            snapPoints={snapPoints}
            enableDynamicSizing={false}
            enablePanDownToClose={true}
            style={styles.bottomSheetCont}
            handleIndicatorStyle={{
                backgroundColor: colors.thumb,
                width: scale(50)
            }}

        >
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>States</Text>
                <InputBox
                    leftIcon={images.search}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search.."
                    containerStyle={styles.searchContainer}
                />
                {
                    loading ?
                        <ActivityIndicator size="small" color={colors.themeColor} style={{ marginTop: 20 }} />
                        : (
                            <FlatList
                                data={filteredCountries}
                                keyExtractor={(item) => item.code}
                                renderItem={renderCountryItem}
                                style={styles.countryList}
                                contentContainerStyle={styles.countryListContent}
                                showsVerticalScrollIndicator={false}
                            />
                        )
                }
            </View>
        </BottomSheet>
    )
})

export default StatesBottomSheet

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomSheetCont: {
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        borderTopRightRadius: scale(20),
        borderTopLeftRadius: scale(20),
    },
    searchContainer: {
        backgroundColor: colors.input_v1,
    },
    modalContent: {
        flex: 1,
        paddingHorizontal: scale(15),
    },
    modalTitle: {
        fontSize: scale(16),
        fontWeight: fonts.semiBold,
        fontWeight: "600",
        marginBottom: scale(23),
        marginTop: scale(3),
        textAlign: 'center',
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    countryList: {
        flex: 1,
    },
    countryListContent: {
        paddingBottom: 20,
    },
    countryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 0.6,
        borderBottomColor: colors.border_v1,
    },
    selectedCountryItem: {
        backgroundColor: '#e3f2fd',
        borderRadius: 8,
    },
    countryName: {
        fontSize: scale(16),
        fontFamily: fonts.medium,
        fontWeight: '500',
        flex: 1,
    },
    checkIcon: {
        width: scale(22),
        height: scale(22),
        resizeMode: 'contain',
    }
})