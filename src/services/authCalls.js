import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { isSuccessResponse, isErrorWithCode } from '@react-native-google-signin/google-signin';
import auth, { GoogleAuthProvider } from '@react-native-firebase/auth';

// export const configureGoogleSignIn = () => {
//     try {
//         GoogleSignin.configure({
//             webClientId: 'YOUR_WEB_CLIENT_ID', // required for iOS and web
//             offlineAccess: true,
//         });
//     } catch (error) {
//         console.log('GoogleSignin already configured');
//     }
// };

export const signInWithGoogle = async () => {
    try {

        await GoogleSignin.hasPlayServices();
        const response = await GoogleSignin.signIn();
        console.log('GoogleSignin->response->', JSON.stringify(response?.type, null, 2))
        // Create Firebase credential with the token // Sign in the user with Firebase
        const googleCredential = auth.GoogleAuthProvider.credential(response?.data?.idToken);
        const userCredential = await auth().signInWithCredential(googleCredential);
        const firebaseUser = userCredential?.user;
        const token = await firebaseUser?.getIdToken();
        // Safely extract providerData[0]
        const providerInfo = firebaseUser.providerData?.[0] || {};

        // Response object
        const responseData = {
            providerId: userCredential?.additionalUserInfo?.providerId || null,
            email: firebaseUser?.email,
            photoURL: firebaseUser?.photoURL,
            phoneNumber: firebaseUser?.phoneNumber,
            displayName: firebaseUser?.displayName,
            uid: firebaseUser?.uid,
            token,
        };
        console.log('responseData-->', JSON.stringify(responseData, null, 2))

        // Check if response is success
        if (isSuccessResponse(response)) {
            return { success: true, data: responseData };
        }

        // Check if response is success
        // if (isSuccessResponse(response)) {
        //     return { success: true, data: response.user || response.data };
        // }

        // Sign-in cancelled by user
        return { success: false, error: 'User cancelled the sign-in' };
    } catch (error) {
        if (isErrorWithCode(error)) {
            switch (error.code) {
                case statusCodes.SIGN_IN_CANCELLED:
                    return { success: false, error: 'Sign-in cancelled by user' };
                case statusCodes.IN_PROGRESS:
                    return { success: false, error: 'Sign-in already in progress' };
                case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                    return { success: false, error: 'Play services not available or outdated' };
                default:
                    return { success: false, error: error.message || 'Unknown Google Sign-In error' };
            }
        }
        return { success: false, error: error.message || 'Non-Google Sign-In error' };
    }
};

export const registerUserAction = async (email, password) => {
    try {
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        let message = "Something went wrong. Please try again.";
        switch (error.code) {
            case "auth/email-already-in-use":
                message = "That email address is already in use!";
                break;
            case "auth/invalid-email":
                message = "That email address is invalid!";
                break;
            case "auth/weak-password":
                message = "Password should be at least 6 characters.";
                break;
            default:
                console.error("Firebase Auth Error:", error);
        }
        return { success: false, message };
    }
};

export const loginUserAction = async (email, password) => {
    try {
        const userCredential = await auth().signInWithEmailAndPassword(email, password);

        console.log('userCredential', JSON.stringify(userCredential, null, 2))

        return { success: true, user: userCredential.user };
    } catch (error) {
        console.log('error--->', JSON.stringify(error, null, 2))
        let message = "Something went wrong. Please try again.";
        console.log('error?.code', JSON.stringify(error?.code, null, 2))
        switch (error?.code) {
            case "auth/user-not-found":
                message = "No account found with this email.";
                break;
            case "auth/wrong-password":
                message = "Incorrect password. Please try again.";
                break;
            case "auth/invalid-email":
                message = "That email address is invalid!";
                break;
            case "auth/too-many-requests":
                message = "Too many login attempts. Please try again later.";
                break;
            case "auth/invalid-credential":
                message = "That invalid credentials";
                break;
            default:
                console.error("Firebase Auth Error:", error);
        }
        return { success: false, message };
    }
};


export const sendOtpAction = async (phoneNumber) => {
    try {
        if (!phoneNumber) throw new Error("Phone number is required");

        const confirm = await auth().signInWithPhoneNumber(phoneNumber);
        return { success: true, confirm }; // `confirm` is needed for verifying OTP
    } catch (error) {
        console.error('sendOtpAction error:', error);
        let message = "Something went wrong. Please try again.";
        switch (error.code) {
            case "auth/invalid-phone-number":
                message = "The phone number entered is invalid.";
                break;
            case "auth/too-many-requests":
                message = "Too many requests. Please try again later.";
                break;
            default:
                console.error("Firebase Phone Auth Error:", error);
        }
        return { success: false, message };
    }
};


export const verifyOtpAction = async (confirm, otp) => {
    try {
        if (!otp) throw new Error("OTP is required");
        if (!confirm) throw new Error("Confirmation object is missing");

        const userCredential = await confirm?.confirm(otp);
        return { success: true, user: userCredential?.user };
    } catch (error) {
        console.error('verifyOtpAction error:', error);

        let message = "Invalid OTP. Please try again.";

        switch (error.code) {
            case "auth/invalid-verification-code":
                message = "The OTP entered is invalid.";
                break;
            case "auth/session-expired":
                message = "OTP has expired. Please request a new one.";
                break;
            default:
                console.error("Firebase Phone OTP Error:", error);
        }

        return { success: false, message };
    }
};