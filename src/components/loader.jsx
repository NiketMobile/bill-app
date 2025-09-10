// import React, { useEffect, useRef } from "react";
// import { View, ActivityIndicator, StyleSheet, StatusBar } from "react-native";
// import { colors } from "../constant/Colors";
// import { RFValue } from "react-native-responsive-fontsize";
// import LottieView from "lottie-react-native";

// const Loader = () => {

//     return (
//         <View style={styles.container}>
//             <View style={styles.loaderBox}>
//                 <LottieView
//                     source={require('../assets/AnimationLoader.json')}
//                     style={{ width: RFValue(90), height: RFValue(90) }}
//                     autoPlay
//                     loop
//                 />
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         position: "absolute",
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "rgba(0, 0, 0, 0.6)",
//         zIndex: 999,
//     },
//     loaderBox: {
//         width: RFValue(125),
//         height: RFValue(125),
//         backgroundColor: colors.white,
//         borderRadius: 10,
//         justifyContent: "center",
//         alignItems: "center",
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.3,
//         shadowRadius: 4,
//         elevation: 5,
//     },
// });

// export default Loader;


import React from 'react';
import {
    View,
    StyleSheet,
    Modal,
    StatusBar,
    Platform,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { colors } from '../constant/colors';
import { scale } from '../utils/appScale';

const Loader = ({ visible = true }) => {
    if (!visible) return null;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
        // statusBarTranslucent
        >
            <View style={styles.container}>
                <View style={styles.loaderBox}>
                    <LottieView
                        source={require('../assets/animation.json')}
                        style={{ width: scale(70), height: scale(70) }}
                        autoPlay
                        loop
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderBox: {
        width: scale(125),
        height: scale(125),
        backgroundColor: colors.white,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
});

export default Loader;
