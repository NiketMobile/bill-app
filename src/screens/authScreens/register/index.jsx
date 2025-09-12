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
import { registerUserAction, signInWithGoogle } from '../../../services/authCalls';
import { placeToken, placeUserData } from '../../../redux/reducers/userInfoReducer';
import { useDispatch, useSelector } from 'react-redux';
import showToast from '../../../components/showMessage';
import { getHitSlop } from '../../../utils/globalFunctions';
import Loader from '../../../components/loader';


const Register = () => {
    const isAndroid = Platform.OS === 'android';
    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state?.userInfo?.userData)
    const token = useSelector((state) => state?.userInfo?.isToken)
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const [email, setEmail] = useState(__DEV__ ? "test@gmail.com" : "");
    // const [password, setPassword] = useState(__DEV__ ? "test123" : "");

    const [isErrors, setIsErrors] = useState({
        field: "",
        message: ""
    })

    const toLogin = () => {
        navigation.navigate("Login")
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

        if (password?.trim()?.length < 6) {
            newErrors = {
                field: "password",
                message: "Password must be at least 6 characters long",
            };
            setIsErrors(newErrors);
            return false;
        }

        setIsErrors({ field: "", message: "" });
        return true;
    };


    const registerCall = async () => {
        try {
            setIsLoading(true);
            const result = await registerUserAction(email, password);
            console.log('result', JSON.stringify(result, null, 2))

            if (result?.success) {
                showToast({
                    type: 'success',
                    title: 'Signed in successfully!',
                });
                console.log("User registered:", result);
                // navigation.replace("TabsStack")
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
            registerCall()
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
                console.log("User info:", result?.data);
                console.log("result", JSON.stringify(result, null, 2));
                const userData = result?.data?.user
                const token = result?.data?.idToken
                dispatch(placeUserData(userData))
                dispatch(placeToken(token))
                // navigation.navigate('TabsStack');
            } else {
                showToast({
                    type: 'error',
                    title: result.error || 'Google Sign-In failed',
                });
                console.warn("Sign-In Error:", result.error);
            }
        } catch (error) {
            console.error("Unexpected error during sign-in:", error);
            showToast({
                type: 'error',
                title: error.message || 'Unexpected error during sign-in',
            });
        } finally {
            setIsLoading(false);
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
                    contentContainerStyle={styles.scrollContainer}
                    style={{ flexGrow: 1 }}
                    extraScrollHeight={5}
                    enableOnAndroid={true}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.innerContainer}>
                        <View style={styles.formContainer}>
                            <Text style={styles.title}>Register now</Text>
                            <Text style={styles.subTitle}>
                                Stay informed on policies that impact you!
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
                                <Text style={styles.socialTitle}>Register with</Text>
                                <View style={styles.socialRow}>
                                    <TouchableOpacity style={styles.socialBtn}>
                                        <Image source={images.facebook} style={styles.icons} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.socialBtn}>
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
                            }]}>You already have an account? </Text>
                            <TouchableOpacity onPress={toLogin}>
                                <Text style={[styles.linkText, {
                                    fontSize: isAndroid ? moderateScale(12.5) : moderateScale(14)
                                }]}>Login now.</Text>
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
        fontFamily: fonts.light,
        color: colors.themeColor,
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
