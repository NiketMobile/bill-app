import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { isSuccessResponse, isErrorWithCode } from '@react-native-google-signin/google-signin';


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
        // Ensure Google Play Services are available
        await GoogleSignin.hasPlayServices();

        // Perform the sign-in
        const response = await GoogleSignin.signIn();

        // Check if response is success
        if (isSuccessResponse(response)) {
            return { success: true, data: response.user || response.data };
        }

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
