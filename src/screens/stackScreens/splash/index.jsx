import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Wrapper from '../../../components/wrapper'
import { colors } from '../../../constant/colors'
import { images } from '../../../constant/images'
import { useNavigation } from '@react-navigation/native'

const Splash = () => {
  const navigation = useNavigation()
  const [isToken, setIsToken] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('AuthStack', { screen: 'Login' });
    }, 1000);

    return () => clearTimeout(timer); 
  }, [navigation]);


  return (
    <Wrapper bgColor={colors.white} hideStatusBar >
      <View style={{ flex: 1 }}>
        <Image source={images.splash} style={{ width: '100%', height: '100%' }} resizeMode='cover' />
      </View>
    </Wrapper>
  )
}

export default Splash

const styles = StyleSheet.create({})