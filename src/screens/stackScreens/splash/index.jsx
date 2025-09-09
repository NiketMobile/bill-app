import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Wrapper from '../../../components/wrapper'
import { colors } from '../../../constant/colors'
import { images } from '../../../constant/images'
import { useNavigation } from '@react-navigation/native'
import { scale } from '../../../utils/appScale'

const Splash = () => {
  const navigation = useNavigation()
  const [isToken, setIsToken] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('AuthStack', { screen: 'Login' });
    }, 1400);

    return () => clearTimeout(timer);
  }, [navigation]);


  return (
    <Wrapper bgColor={colors.white} hideStatusBar >
      <View style={{ flex: 1 }}>
        <Image
          source={images.splash}
          style={{ width: '100%', height: '100%', position: 'absolute' }}
          resizeMode='cover'
        />
        <View style={styles.centerContent}>
          <Image source={images.logo} style={{
            width: scale(270),
            height: scale(170),
            resizeMode: 'contain'
          }} />
        </View>
      </View>
    </Wrapper>
  )
}

export default Splash

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})