import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';

const FocusAwareStatusBar = ({ barStyle, hidden }) => {
    const isFocused = useIsFocused();
    return isFocused ? (
        <StatusBar
            barStyle={barStyle}
            backgroundColor="transparent"
            // translucent
            animated
            showHideTransition="fade"
            hidden={hidden}
        />
    ) : null;
};

const Wrapper = ({ children, bgColor = '#fff', hideStatusBar = false, barStyle = 'dark-content' }) => {
    const insets = useSafeAreaInsets();
    const isAndroid = Platform.OS === 'android';

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: bgColor,
                    paddingTop: hideStatusBar ? 0 : insets.top, // top safe area
                    paddingBottom: isAndroid ? insets.bottom : 0, // handles iOS + Android safe bottom
                    paddingLeft: insets.left,
                    paddingRight: insets.right,
                },
            ]}
        >
            <FocusAwareStatusBar
                barStyle={barStyle}
                hidden={hideStatusBar}
            />
            {children}
        </View>
    );
};

export default Wrapper;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
