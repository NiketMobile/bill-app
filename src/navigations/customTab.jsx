import React from 'react';
import { View, Image, TouchableOpacity, } from 'react-native';
import { images } from '../constant/images';
import { colors } from '../constant/colors';
import { scale } from "../utils/appScale";



export function CustomTab({ state, descriptors, navigation }) {

    return (
        <View
            style={{
                flexDirection: 'row',
                backgroundColor: colors.white,
                // borderTopWidth: 0.2,
                borderTopColor: colors.border,
                height: scale(78), // 👈 fixed height
                paddingBottom: scale(27), // spacing for iOS bottom safe area
                paddingTop: scale(7),
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: -2,
                },
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 4,
                paddingHorizontal: scale(7)
            }}
        >
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                let iconSource;
                if (route.name === 'Home') {
                    iconSource = images.home;
                } else if (route.name === 'Article') {
                    iconSource = images.article;
                } else if (route.name === 'Bill') {
                    iconSource = images.solar_bill;
                } else if (route.name === 'Liked') {
                    iconSource = images.heart;
                } else if (route.name === 'Profile') {
                    iconSource = images.user;
                }

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            // height: 50
                        }}
                    >
                        <Image
                            source={iconSource}
                            style={{
                                width: scale(27),
                                height: scale(27),
                                tintColor: isFocused ? colors.themeColor : colors.tab_disabled,
                                // marginBottom: 2,
                            }}
                            resizeMode="contain"
                        />
                        {/* <Text
                            style={{
                                color: isFocused ? colors.black : colors.black,
                                fontSize: 12,
                                fontFamily: fonts.medium,
                            }}
                        >
                            {label}
                        </Text> */}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
