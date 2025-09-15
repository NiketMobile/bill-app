import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import React, { forwardRef, useMemo } from 'react'
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { colors } from '../constant/colors';
import { fonts } from '../constant/fonts';
import { scale } from '../utils/appScale';



const BillDetailsBottomSheet = forwardRef(({ children }, ref) => {
    const snapPoints = useMemo(() => ["70%", "85%", "92%"], []);


    const closeKeyBoard = () => {
        Keyboard.dismiss();
    }

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
                <BottomSheetScrollView
                    keyboardShouldPersistTaps='always'
                    style={{
                        paddingBottom: scale(80)
                    }}>
                    <TouchableWithoutFeedback onPress={() => closeKeyBoard()}>
                        {children}
                    </TouchableWithoutFeedback>
                </BottomSheetScrollView>
            </View>
        </BottomSheet>
    )
})

export default BillDetailsBottomSheet

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
        // paddingHorizontal: scale(15),
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