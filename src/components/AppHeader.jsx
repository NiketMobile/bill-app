import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { colors } from '../constant/colors';
import { fontScale, scale } from '../utils/appScale';
import { fonts } from '../constant/fonts';


export default function AppHeader({
  title = '',
  leftIcon,
  rightIcon,
  onLeftPress = () => { },
  onRightPress = () => { },
  containerStyle,
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity style={styles.side} onPress={onLeftPress}>
        {leftIcon ? (
          <Image source={leftIcon} style={styles.icon} tintColor={colors.themeColor} />
        ) : null}
      </TouchableOpacity>

      <View style={styles.center}>
        <Text numberOfLines={1} style={styles.title}>{title}</Text>
      </View>

      <TouchableOpacity style={styles.side} onPress={onRightPress}>
        {rightIcon ? (
          <Image source={rightIcon} style={styles.icon} tintColor={colors.black} />
        ) : null}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: scale(43),
    flexDirection: 'row',
    alignItems: 'center',
  },
  side: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: scale(40),
    width: scale(40),
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: fontScale(20),
    fontWeight: '600',
    color: colors.text,
    fontFamily: fonts.semiBold
  },
  icon: {
    width: scale(16),
    height: scale(16),
    resizeMode: 'contain',
    tintColor: colors.theme_v1,
  },
});
