import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Platform,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Wrapper from '../../../components/wrapper';
import InputBox from '../../../components/inputBox';
import { colors } from '../../../constant/colors';
import { images } from '../../../constant/images';
import { fonts } from '../../../constant/fonts';
import { moderateScale, scale } from '../../../utils/appScale';
import Button from '../../../components/button';
import { useNavigation } from '@react-navigation/native';
import { loginUserAction, signInWithGoogle } from '../../../services/authCalls';
import { clearAppStorage, getHitSlop } from '../../../utils/globalFunctions';
import Loader from '../../../components/loader'
import { useDispatch, useSelector } from 'react-redux';
import { placeToken, placeUserData } from '../../../redux/reducers/userInfoReducer';
import showToast from '../../../components/showMessage';
import { apiServices } from '../../../services/apiService';
import firestore from '@react-native-firebase/firestore';
import { selectGender, selectSexualOrientation } from '../../../constant/dataJson';



const Login = () => {
  const isAndroid = Platform.OS === 'android';
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state?.userInfo?.userData)
  const token = useSelector((state) => state?.userInfo?.isToken)
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const [email, setEmail] = useState(__DEV__ ? "test10@gmail.com" : "");
  // const [password, setPassword] = useState(__DEV__ ? "test@test" : "");

  const [isErrors, setIsErrors] = useState({
    field: "",
    message: ""
  })

  const logoutPress = async () => {
    // navigation.navigate('Splash');
    await clearAppStorage()
    dispatch(placeToken(null));
    dispatch(placeUserData({}));
  }


  const toRegister = () => {
    navigation.navigate("Register")
  }


  const isValid = () => {
    let newErrors = { field: "", message: "" };

    if (!email?.trim()) {
      newErrors = {
        field: "email",
        message: "Email is required",
      };
      setIsErrors(newErrors);
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors = {
        field: "email",
        message: "Please enter a valid email address",
      };
      setIsErrors(newErrors);
      return false;
    }

    if (!password?.trim()) {
      newErrors = {
        field: "password",
        message: "Password is required",
      };
      setIsErrors(newErrors);
      return false;
    }

    setIsErrors({ field: "", message: "" });
    return true;
  };


  const checkUserProgressFinalNavigate = async (uid, response) => {
    try {
      if (!uid) throw new Error("UID is required");

      console.log('response--->', JSON.stringify(response, null, 2))
      console.log('uid--->', JSON.stringify(uid, null, 2))

      // ✅ Check if user already registered
      const userDoc = await apiServices.getUserDoc(uid);
      console.log('userDoc', JSON.stringify(userDoc, null, 2))

      const userData = response
      const token = response?.token

      dispatch(placeUserData(userData))
      // dispatch(placeToken(token))

      // if (!userDoc?.track_id) {
      //   // If no track_id → start onboarding from first screen
      //   navigation.navigate('OnboardingA');
      //   return;
      // }
      // const trackId = userDoc?.track_id;

      // if (trackId == 1) navigation.navigate('OnboardingA');
      // else if (trackId == 2) navigation.navigate('OnboardingB');
      // else if (trackId == 3) navigation.navigate('OnboardingC');

      // // track_id = "4"
      // // phonescreen is OnboardingE
      // else if (trackId == 4) navigation.navigate('OnboardingE');
      // // const track_id = "5"
      // // otpScreen is  OnboardingF
      // else if (trackId == 5) navigation.navigate('OnboardingF');

      // else if (trackId == 6) navigation.navigate('OnboardingG');
      // else if (trackId == 7) navigation.navigate('OnboardingH');
      // else if (trackId == 8) navigation.navigate('OnboardingI');
      // else if (trackId == 9) navigation.navigate('OnboardingJ');
      // else if (trackId == 10) navigation.navigate('OnboardingK');
      // else if (trackId == 11) navigation.navigate('OnboardingL');
      // else if (trackId == 12) navigation.navigate('OnboardingM');
      // else if (trackId == 13) navigation.navigate('OnboardingN');
      // else if (trackId == 14) navigation.navigate('OnboardingO');

      if (!userDoc?.track_id) {
        // If no track_id → start onboarding from first screen
        navigation.navigate('OnboardingA');
        return;
      }
      const trackId = userDoc?.track_id;

      if (trackId == 1) navigation.navigate('OnboardingB');
      else if (trackId == 2) navigation.navigate('OnboardingC');
      else if (trackId == 3) navigation.navigate('OnboardingE');

      // track_id = "4"
      // phonescreen is OnboardingE
      else if (trackId == 4) navigation.navigate('OnboardingF');
      // const track_id = "5"
      // otpScreen is  OnboardingF
      else if (trackId == 5) navigation.navigate('OnboardingG');

      else if (trackId == 6) navigation.navigate('OnboardingH');
      else if (trackId == 7) navigation.navigate('OnboardingI');
      else if (trackId == 8) navigation.navigate('OnboardingJ');
      else if (trackId == 9) navigation.navigate('OnboardingK');
      else if (trackId == 10) navigation.navigate('OnboardingL');
      else if (trackId == 11) navigation.navigate('OnboardingM');
      else if (trackId == 12) navigation.navigate('OnboardingN');
      else if (trackId == 13) navigation.navigate('OnboardingO');
      else if (trackId == 14) navigation.navigate('OnboardingO');

      else if (trackId == "true" && token) {
        navigation.navigate('TabsStack')
        dispatch(placeToken(token));
      }
      else {
        navigation.navigate('LogIn');
      }

    } catch (error) {
      console.error('Error checking user progress:', error);
      showToast({
        type: 'error',
        title: 'Unable to fetch user progress. Please try again.',
      });
    }
  };


  const loginCall = async () => {
    try {
      setIsLoading(true);

      const result = await loginUserAction(email, password);
      console.log('result', JSON.stringify(result, null, 2))

      if (result?.success) {
        showToast({
          type: 'success',
          title: 'Login in successfully!',
        });
        const firebaseUser = result?.user;
        const firebaseToken = await firebaseUser.getIdToken();

        const responseData = {
          providerId: firebaseUser?.providerData?.[0]?.providerId || null,
          email: firebaseUser?.email || null,
          photoURL: firebaseUser?.photoURL || null,
          phoneNumber: firebaseUser?.phoneNumber || null,
          displayName: firebaseUser?.displayName || null,
          uid: firebaseUser?.uid || null,
          token: firebaseToken,
        };
        console.log("result--->", JSON.stringify(responseData, null, 2));

        checkUserProgressFinalNavigate(firebaseUser?.uid, responseData)

        // const userData = responseData
        // const token = responseData?.token
        // dispatch(placeUserData(userData))
        // dispatch(placeToken(token))
        // navigation.navigate('TabsStack');

      } else {
        showToast({
          type: 'error',
          title: result?.message,
        });
      }
    } catch (error) {
      console.log("Register call failed:", error);
      showToast({
        type: 'error',
        title: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };


  const handlewPress = () => {
    // navigation.navigate("OnboardingA")
    const isValidated = isValid();
    console.log('isValidated', JSON.stringify(isValidated, null, 2))
    if (isValidated) {
      loginCall()
      // navigation.navigate("OnboardingA")
    }
  }


  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithGoogle();
      if (result?.success) {
        showToast({
          type: 'success',
          title: 'Signed in successfully!',
        });
        // console.log("User info:", result);
        console.log("result--->", JSON.stringify(result?.data, null, 2));

        const userData = result?.data
        const token = result?.data?.token
        console.log('token--->', JSON.stringify(token, null, 2))

        checkUserProgressFinalNavigate(userData?.uid, userData)
        // dispatch(placeUserData(userData))
        // dispatch(placeToken(token))
        // navigation.navigate('TabsStack');

      } else {
        showToast({
          type: 'error',
          title: result.error || 'Google Sign-In failed',
        });
        console.warn("Sign-In Error:", result.error);
      }
    } catch (error) {
      console.log("Unexpected error during sign-in:", error);
      showToast({
        type: 'error',
        title: error.message || 'Unexpected error during sign-in',
      });
    } finally {
      setIsLoading(false);
    }
  };



  const uploadStatesToFirestore = async () => {
    try {
      const batch = firestore().batch(); // Use batch for better performance

      const Datasss = [
        { id: "01", name: "Yes" },
        { id: "02", name: "No" },
        { id: "03", name: "Prefer not to answer" },
      ];

      Datasss.forEach(state => {
        // Create a document with ID equal to state.id
        const docRef = firestore().collection('Veteran').doc(state.id.toString());
        batch.set(docRef, state); // add the whole state object
      });

      await batch.commit();
      console.log('All states uploaded successfully!');
    } catch (error) {
      console.error('Error uploading states:', error);
    }
  };




  return (
    <Wrapper barStyle="dark-content" isFullView={true}>
      <ImageBackground
        source={images.registerScreenBg}
        imageStyle={styles.bgImage}
        style={{ flex: 1 }}
      >
        <KeyboardAwareScrollView
          // style={{ flex: 1 }}
          // contentContainerStyle={styles.scrollContainer}
          contentContainerStyle={styles.scrollContainer}
          style={{ flexGrow: 1 }}
          extraScrollHeight={5}
          enableOnAndroid={true}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.innerContainer}>
            <View style={styles.formContainer}>
              <Text style={styles.title}>Login now</Text>
              <Text style={styles.subTitle}>
                Welcome back! Swipe through the latest bills in your state.
              </Text>
              <InputBox
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
                error={isErrors.field == "email" ? isErrors?.message : ""}
              />
              <InputBox
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                isPassword={true}
                error={isErrors.field == "password" ? isErrors?.message : ""}
              />
              <Button
                title="Register"
                onPress={handlewPress}
                loading={false}
                disabled={false}
              />
              <View style={styles.orContainer}>
                <View style={styles.line} />
                <Text style={styles.orText}>or</Text>
                <View style={styles.line} />
              </View>

              <View style={styles.socialContainer}>
                <Text style={styles.socialTitle}>Login with</Text>
                <View style={styles.socialRow}>
                  <TouchableOpacity style={styles.socialBtn} hitSlop={getHitSlop(10)} onPress={uploadStatesToFirestore}>
                    <Image source={images.facebook} style={styles.icons} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialBtn} hitSlop={getHitSlop(10)} onPress={logoutPress}>
                    <Image source={images.apple} style={styles.appleIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialBtn} onPress={handleSignIn} hitSlop={getHitSlop(10)}>
                    <Image source={images.google} style={styles.icons} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.bottomRow}>
              <Text style={[styles.bottomText, {
                fontSize: isAndroid ? moderateScale(12.5) : moderateScale(14)
              }]}>
                You don’t have an account?{' '}
              </Text>
              <TouchableOpacity onPress={toRegister}>
                <Text style={[styles.linkText, {
                  fontSize: isAndroid ? moderateScale(12.5) : moderateScale(14)
                }]}>Register now.</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
      {
        isLoading && <Loader />
      }
    </Wrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  bgImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: scale(15),
    justifyContent: 'center',
    justifyContent: "center",
    paddingTop: scale(55)
  },
  title: {
    fontSize: moderateScale(29),
    fontFamily: fonts.regular,
    color: colors.text,
    textAlign: 'left',
    fontWeight: '400',
    width: '100%',
  },
  subTitle: {
    marginBottom: scale(20),
    marginTop: scale(10),
    width: '100%',
    textAlign: 'left',
    color: colors.text_v1,
    fontFamily: fonts.light,
    fontSize: moderateScale(14),
    fontWeight: "300"
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: scale(45),
    width: '100%',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.theme_v1,
  },
  orText: {
    marginHorizontal: 10,
    fontSize: moderateScale(16),
    fontFamily: fonts.regular,
    fontWeight: "400",
    color: colors.black,
  },
  socialTitle: {
    fontSize: moderateScale(15.5),
    fontFamily: fonts.semiBold,
    fontWeight: "600",
    marginBottom: scale(15),
    marginTop: scale(15),
    color: colors.text,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: scale(17),
  },
  socialBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(5),
  },
  bottomText: {
    fontSize: moderateScale(14),
    fontWeight: '300',
    color: colors.text,
    fontFamily: fonts.light,
  },
  linkText: {
    color: colors.themeColor,
    fontFamily: fonts.light,
    fontSize: moderateScale(14),
    fontWeight: '300',
    borderBottomWidth: 1,
    borderBottomColor: colors.themeColor,
    paddingBottom: 2,
  },
  icons: {
    width: scale(33),
    height: scale(33),
    resizeMode: "contain"
  },
  appleIcon: {
    width: scale(37),
    height: scale(37),
    resizeMode: "contain"
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  socialContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: scale(20),
    marginBottom: scale(23),
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // justifyContent: "flex-end",
    flexWrap: "wrap",
    width: "100%",
    paddingTop: scale(40),
    // backgroundColor:'pink'
  },
});
