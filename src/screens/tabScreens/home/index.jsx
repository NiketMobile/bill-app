import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Wrapper from '../../../components/wrapper'
import { clearAppStorage } from '../../../utils/globalFunctions'
import Button from '../../../components/button'
import { useNavigation } from '@react-navigation/native'
import { placeToken, placeUserData } from '../../../redux/reducers/userInfoReducer'
import { useDispatch } from 'react-redux'

const Home = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const logoutPress = async () => {
    navigation.navigate('Splash');
    await clearAppStorage()
    dispatch(placeToken(null));
    dispatch(placeUserData({}));
  }


  return (
    <Wrapper barStyle="dark-content">
      <View style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        paddingHorizontal: 20
      }}>
        <Text>Home screen</Text>
        <Button onPress={logoutPress} title="Logout" />
      </View>
    </Wrapper>
  )
}

export default Home

const styles = StyleSheet.create({})