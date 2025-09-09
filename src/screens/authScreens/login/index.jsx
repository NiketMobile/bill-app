// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ImageBackground,
//   Image,
// } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import Wrapper from '../../../components/wrapper';
// import InputBox from '../../../components/inputBox';
// import { colors } from '../../../constant/colors';
// import { images } from '../../../constant/images';
// import { fonts } from '../../../constant/fonts';
// import { scale } from '../../../utils/appScale';
// import Button from '../../../components/button';
// import { useNavigation } from '@react-navigation/native';


// const Login = () => {
//   const navigation = useNavigation()
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const toRegister = () => {
//     navigation.navigate("Register")
//   }

//   const handlewPress = () => {
//     navigation.navigate("OnboardingA")
//   }


//   return (
//     <Wrapper barStyle="dark-content" isFullView={true}>
//       <ImageBackground
//         source={images.registerScreenBg}
//         imageStyle={styles.bgImage}
//         style={{ flex: 1 }}
//       >
//         <KeyboardAwareScrollView
//           style={{ flexGrow: 1 }}
//           contentContainerStyle={styles.scrollContainer}
//         >
//           <View style={styles.innerContainer}>
//             {/* Title */}
// <Text style={styles.title}>Login now</Text>
// <Text style={styles.subTitle}>
//   Welcome back! Swipe through the latest bills in your state.
// </Text>

//             {/* Input Fields */}
//             <InputBox
//               value={email}
//               onChangeText={setEmail}
//               placeholder="Email"
//               keyboardType="email-address"
//             />
//             <InputBox
//               value={password}
//               onChangeText={setPassword}
//               placeholder="Password"
//               isPassword={true}
//             />

//             {/* Register button */}
//             <Button
//               title="Login"
//               onPress={handlewPress}
//               loading={false}
//               disabled={false}
//             />

//             {/* OR divider */}
//             <View style={styles.orContainer}>
//               <View style={styles.line} />
//               <Text style={styles.orText}>or</Text>
//               <View style={styles.line} />
//             </View>

//             {/* Social login */}
//             <Text style={styles.socialTitle}>Login with</Text>
//             <View style={styles.socialRow}>
//               <TouchableOpacity style={[styles.socialBtn,]}>
//                 <Image source={images.facebook} style={styles.icons} />
//               </TouchableOpacity>
//               <TouchableOpacity style={[styles.socialBtn]}>
//                 <Image source={images.apple} style={styles.icons} />
//               </TouchableOpacity>
//               <TouchableOpacity style={[styles.socialBtn]}>
//                 <Image source={images.google} style={styles.icons} />
//               </TouchableOpacity>
//             </View>

//             {/* Bottom link */}
// <View style={styles.bottomRow}>
//   <Text style={styles.bottomText}>
//     You don’t have an account?{' '}
//   </Text>

//   <TouchableOpacity onPress={toRegister}>
//     <Text style={styles.linkText}>Register now.</Text>
//   </TouchableOpacity>
// </View>

//           </View>
//         </KeyboardAwareScrollView>
//       </ImageBackground>
//     </Wrapper>
//   );
// };

// export default Login;

// const styles = StyleSheet.create({
//   bgImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     paddingHorizontal: scale(15),
//     justifyContent: 'center',
//   },
//   innerContainer: {
//     width: '100%',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: scale(29),
//     fontFamily: fonts.regular,
//     color: colors.text,
//     textAlign: 'left',
//     fontWeight: '400',
//     width: '100%',
//   },
//   subTitle: {
//     marginBottom: scale(20),
//     marginTop: scale(10),
//     width: '100%',
//     textAlign: 'left',
//     color: colors.text_v1,
//     fontFamily: fonts.light,
//     fontSize: scale(14),
//   },
//   orContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: scale(45),
//     marginBottom: scale(5),
//     width: '100%',
//   },
//   line: {
//     flex: 1,
//     height: 1,
//     backgroundColor: colors.theme_v1,
//   },
//   orText: {
//     marginHorizontal: 10,
//     fontSize: scale(16),
//     fontFamily: fonts.regular,
//     fontWeight: "400",
//     color: colors.black,
//   },
//   socialTitle: {
//     fontSize: scale(15.5),
//     fontFamily: fonts.semiBold,
//     fontWeight: "600",
//     marginBottom: scale(15),
//     marginTop: scale(15),
//     color: colors.text,
//   },
//   socialRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   socialBtn: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: scale(5),
//   },
//   bottomRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingTop: scale(70),
//     justifyContent: 'center',
//   },
//   bottomText: {
//     fontSize: scale(14),
//     fontWeight: '300',
//     color: colors.text,
//     fontFamily: fonts.light,
//   },
//   linkText: {
//     color: colors.themeColor,
//     fontFamily: fonts.medium,
//     fontSize: scale(14),
//     fontWeight: '300',
//     borderBottomWidth: 1,
//     borderBottomColor: colors.themeColor,
//     paddingBottom: 2,
//   },
//   icons: {
//     width: scale(45),
//     height: scale(45),
//     resizeMode: "contain"
//   }
// });



import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Wrapper from '../../../components/wrapper';
import InputBox from '../../../components/inputBox';
import { colors } from '../../../constant/colors';
import { images } from '../../../constant/images';
import { fonts } from '../../../constant/fonts';
import { scale } from '../../../utils/appScale';
import Button from '../../../components/button';
import { useNavigation } from '@react-navigation/native';


const Register = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toRegister = () => {
    navigation.navigate("Register")
  }

  const handlewPress = () => {
    navigation.navigate("OnboardingA")
  }


  return (
    <Wrapper barStyle="dark-content" isFullView={true}>
      <ImageBackground
        source={images.registerScreenBg}
        imageStyle={styles.bgImage}
        style={{ flex: 1 }}
      >
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContainer}
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
              />
              <InputBox
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                isPassword={true}
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
                  <TouchableOpacity style={styles.socialBtn}>
                    <Image source={images.facebook} style={styles.icons} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialBtn}>
                    <Image source={images.apple} style={styles.icons} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialBtn}>
                    <Image source={images.google} style={styles.icons} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.bottomRow}>
              <Text style={styles.bottomText}>
                You don’t have an account?{' '}
              </Text>
              <TouchableOpacity onPress={toRegister}>
                <Text style={styles.linkText}>Register now.</Text>
              </TouchableOpacity>
            </View>

          </View>

        </KeyboardAwareScrollView>
      </ImageBackground>
    </Wrapper>
  );
};

export default Register;

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
    fontSize: scale(29),
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
    fontSize: scale(14),
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
    fontSize: scale(16),
    fontFamily: fonts.regular,
    fontWeight: "400",
    color: colors.black,
  },
  socialTitle: {
    fontSize: scale(15.5),
    fontFamily: fonts.semiBold,
    fontWeight: "600",
    marginBottom: scale(15),
    marginTop: scale(15),
    color: colors.text,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(5),
  },
  bottomText: {
    fontSize: scale(14),
    fontWeight: '300',
    color: colors.text,
    fontFamily: fonts.light,
  },
  linkText: {
    color: colors.themeColor,
    fontFamily: fonts.light,
    fontSize: scale(14),
    fontWeight: '300',
    borderBottomWidth: 1,
    borderBottomColor: colors.themeColor,
    paddingBottom: 2,
  },
  icons: {
    width: scale(45),
    height: scale(45),
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
    justifyContent: "flex-end",
    paddingTop: scale(40)

  },
});
