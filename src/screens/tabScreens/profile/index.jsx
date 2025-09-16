import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../../constant/colors'
import Wrapper from '../../../components/wrapper'
import { fontScale, scale } from '../../../utils/appScale'
import { images } from '../../../constant/images'
import AppHeader from '../../../components/AppHeader'
import CommonSwitch from '../../../components//CommonSwitch'
import { useNavigation } from '@react-navigation/native'
import { fonts } from '../../../constant/fonts'
import { clearAppStorage } from '../../../utils/globalFunctions'
import { placeToken, placeUserData } from '../../../redux/reducers/userInfoReducer'
import { useDispatch } from 'react-redux'




const Profile = () => {
  const navigation = useNavigation();
   const dispatch = useDispatch()
  const [isRequired, setIsRequired] = useState(false)



  const logoutPress = async () => {
    navigation.navigate('Splash');
    await clearAppStorage()
    dispatch(placeToken(null));
    dispatch(placeUserData({}));
  }



  return (
    <Wrapper barStyle="dark-content" bgColor={colors.bg_v1}>
      <View style={styles.containerView}>
        <AppHeader
          title="User"
          leftIcon={images.back_2}
          onLeftPress={() => navigation.goBack()}
        />
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.card}>
            <TouchableOpacity style={styles.row} activeOpacity={0.7}
              onPress={() => navigation.navigate("StackScreens", { screen: 'EditProfile' })}>
              <Image source={images.newuser} style={styles.leftIcon} />
              <Text style={styles.itemText}>Edit profile</Text>
              <Image source={images.right_arrow} style={styles.rightIcon} />
            </TouchableOpacity>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Image source={images.notifications} style={styles.leftIcon} />
              <Text style={styles.itemText}>Notifications</Text>
              <View style={{
                marginRight: 10
              }}>
                <CommonSwitch
                  value={isRequired}
                  onToggle={setIsRequired}
                  backgroundActive="#007AFF"
                  circleSize={26}
                />
              </View>
            </View>
          </View>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={[styles.card, {
            marginTop: scale(10),
          }]}>
            <TouchableOpacity style={styles.row} activeOpacity={0.7}
              onPress={() => navigation.navigate("StackScreens", { screen: 'PrivacySettings' })}>
              <Image source={images.shield} style={styles.leftIcon} />
              <Text style={styles.itemText}>Privacy settings</Text>
              <Image source={images.right_arrow} style={styles.rightIcon} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.row} activeOpacity={0.7}>
              <Image source={images.help} style={styles.leftIcon} />
              <Text style={styles.itemText}>Help center</Text>
              <Image source={images.right_arrow} style={styles.rightIcon} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.row} activeOpacity={0.7}
              onPress={() => navigation.navigate("StackScreens", { screen: 'AboutUs' })}>
              <Image source={images.info} style={styles.leftIcon} />
              <Text style={styles.itemText}>About us</Text>
              <Image source={images.right_arrow} style={styles.rightIcon} />
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* Logout */}
        <TouchableOpacity style={[styles.logoutBtn]} onPress={logoutPress} activeOpacity={0.7}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>

      </View>
    </Wrapper>
  )
}

export default Profile

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: colors.bg_v1,
    paddingHorizontal: scale(15),
  },
  container: {
    flex: 1,
    backgroundColor: colors.bg_v1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(15),
    paddingVertical: scale(12),
    justifyContent: 'space-between',
  },
  backBtn: {
    width: scale(24),
    height: scale(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: scale(20),
    height: scale(20),
    tintColor: colors.text,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  scroll: {
    paddingBottom: scale(20),
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 6,
    marginTop: scale(20),
    paddingVertical: scale(4),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: scale(45),
  },
  leftIcon: {
    width: scale(25),
    height: scale(25),
    marginRight: scale(10),
    tintColor: colors.text_v1,
    resizeMode: 'contain',
    marginLeft: scale(14)
  },
  rightIcon: {
    width: scale(27),
    height: scale(27),
    marginRight: scale(10),
    tintColor: colors.text,
    resizeMode: 'contain',
    marginRight: scale(10),
  },
  itemText: {
    flex: 1,
    fontSize: fontScale(14.5),
    color: colors.text_v1,
    fontFamily: fonts.medium,
    fontWeight: '500',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border_v1,
  },
  sectionTitle: {
    marginTop: scale(10),
    fontSize: fontScale(16),
    color: colors.black,
    fontFamily: fonts.medium,
    fontWeight: '500',
  },
  logoutBtn: {
    marginTop: scale(40),
    backgroundColor: "#EDDEDD",
    borderRadius: 6,
    alignItems: 'center',
    paddingVertical: scale(14),
    marginBottom: scale(20),
  },
  logoutText: {
    color: '#D3312B',
    fontWeight: '600',
    fontSize: fontScale(15),
    fontFamily: fonts.regular,
    fontWeight: '400',
  },
})