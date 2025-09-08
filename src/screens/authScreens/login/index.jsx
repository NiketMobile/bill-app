import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Wrapper from '../../../components/wrapper'
import { colors } from '../../../constant/colors'
import { images } from '../../../constant/images'


const Login = () => {
  return (
    <Wrapper barStyle='dark-content' isFullView={true}>
      <ImageBackground source={images.registerScreenBg} imageStyle={{
        width: '100%',
        height: '100%',
        objectFit: "fill"
      }} style={{ flex: 1, }}>

      </ImageBackground>
    </Wrapper>
  )
}

export default Login

const styles = StyleSheet.create({})