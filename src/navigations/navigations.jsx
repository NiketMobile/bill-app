import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/tabScreens/home';
import News from '../screens/tabScreens/news';
import Bills from '../screens/tabScreens/bills';
import Liked from '../screens/tabScreens/liked';
import Profile from '../screens/tabScreens/profile';
import { CustomTab } from './customTab';
import Login from '../screens/authScreens/login';
import Splash from '../screens/stackScreens/splash';
import EditProfile from '../screens/stackScreens/editProfile';
import PrivacySettings from '../screens/stackScreens/privacySettings';
import FilterScreen from '../screens/stackScreens/filterScreen';
import AboutUs from '../screens/stackScreens/aboutUs';
import SearchScreen from '../screens/stackScreens/searchScreen';
import Register from "../screens/authScreens/register";
import OnboardingA from "../screens/onBoardingScreens/OnboardingA"
import OnboardingB from "../screens/onBoardingScreens/OnboardingB"
import OnboardingC from "../screens/onBoardingScreens/OnboardingC"
import OnboardingD from "../screens/onBoardingScreens/OnboardingD"
import OnboardingE from "../screens/onBoardingScreens/OnboardingE"
import OnboardingF from "../screens/onBoardingScreens/OnboardingF"
import OnboardingG from "../screens/onBoardingScreens/OnboardingG"
import OnboardingH from "../screens/onBoardingScreens/OnboardingH"
import OnboardingI from "../screens/onBoardingScreens/OnboardingI"
import OnboardingJ from "../screens/onBoardingScreens/OnboardingJ"
import OnboardingK from "../screens/onBoardingScreens/OnboardingK"
import OnboardingL from "../screens/onBoardingScreens/OnboardingL"
import OnboardingM from "../screens/onBoardingScreens/OnboardingM"
import OnboardingN from "../screens/onBoardingScreens/OnboardingN"
import OnboardingO from "../screens/onBoardingScreens/OnboardingO"
import EditName from "../screens/editScreensStacks/EditName"
import EditDob from "../screens/editScreensStacks/EditDob"
import EditAddress from "../screens/editScreensStacks/EditAddress"
import EditGender from "../screens/editScreensStacks/EditGender"
import EditOrientation from "../screens/editScreensStacks/EditOrientation"
import EditVeteran from "../screens/editScreensStacks/EditVeteran"
import EditIncomeRange from "../screens/editScreensStacks/EditIncomeRange"
import EditMaritalStatus from "../screens/editScreensStacks/EditMaritalStatus"
import EditReligion from "../screens/editScreensStacks/EditReligion"
import EditDisability from "../screens/editScreensStacks/EditDisability"
import EditPoliticalAffiliation from "../screens/editScreensStacks/EditPoliticalAffiliation"
import NoInternet from "../components/NoInternet"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';



const springConfig = {
    animation: "spring",
    config: {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabsStack() {

    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBar={(props) => <CustomTab {...props} />}
            screenOptions={{
                headerShown: false,
            }} >
            <Tab.Screen name="Bills" component={Bills} />
            <Tab.Screen name="News" component={News} />
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Liked" component={Liked} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    )
}


function StackScreens() {
    return (
        <Stack.Navigator
            initialRouteName="TabsStack"
            screenOptions={({ route }) => ({
                headerShown: false,
            })} >
            <Stack.Screen name="TabsStack" component={TabsStack} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="PrivacySettings" component={PrivacySettings} />
            <Stack.Screen name="FilterScreen" component={FilterScreen} />
            <Stack.Screen name="AboutUs" component={AboutUs} />
            <Stack.Screen name="EditStakcs" component={EditStakcs} />
        </Stack.Navigator>
    )
}


function AuthStack() {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={({ route }) => ({
                headerShown: false,
            })} >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="OnboardingA" component={OnboardingA} />
            <Stack.Screen name="OnboardingB" component={OnboardingB} />
            <Stack.Screen name="OnboardingC" component={OnboardingC} />
            <Stack.Screen name="OnboardingD" component={OnboardingD} />
            <Stack.Screen name="OnboardingE" component={OnboardingE} />
            <Stack.Screen name="OnboardingF" component={OnboardingF} />
            <Stack.Screen name="OnboardingG" component={OnboardingG} />
            <Stack.Screen name="OnboardingH" component={OnboardingH} />
            <Stack.Screen name="OnboardingI" component={OnboardingI} />
            <Stack.Screen name="OnboardingJ" component={OnboardingJ} />
            <Stack.Screen name="OnboardingK" component={OnboardingK} />
            <Stack.Screen name="OnboardingL" component={OnboardingL} />
            <Stack.Screen name="OnboardingM" component={OnboardingM} />
            <Stack.Screen name="OnboardingN" component={OnboardingN} />
            <Stack.Screen name="OnboardingO" component={OnboardingO} />
        </Stack.Navigator>
    )
}



function EditStakcs() {
    return (
        <Stack.Navigator
            initialRouteName="EditName"
            screenOptions={({ route }) => ({
                headerShown: false,
            })} >
            <Stack.Screen name="EditName" component={EditName} />
            <Stack.Screen name="EditDob" component={EditDob} />
            <Stack.Screen name="EditAddress" component={EditAddress} />
            <Stack.Screen name="EditGender" component={EditGender} />
            <Stack.Screen name="EditOrientation" component={EditOrientation} />
            <Stack.Screen name="EditVeteran" component={EditVeteran} />
            <Stack.Screen name="EditIncomeRange" component={EditIncomeRange} />
            <Stack.Screen name="EditMaritalStatus" component={EditMaritalStatus} />
            <Stack.Screen name="EditReligion" component={EditReligion} />
            <Stack.Screen name="EditDisability" component={EditDisability} />
            <Stack.Screen name="EditPoliticalAffiliation" component={EditPoliticalAffiliation} />
        </Stack.Navigator>
    )
}





export default function RootNavigation() {
    const token = useSelector((state) => state?.userInfo?.isToken)
    const dispatch = useDispatch()
    const [isConnected, setIsConnected] = useState(true);
    const [checking, setChecking] = useState(true);
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state?.isConnected);
            setChecking(false);
        });
        // Initial fetch in case event listener misses it
        NetInfo.fetch().then(state => {
            setIsConnected(state?.isConnected);
            setChecking(false);
        });
        return () => unsubscribe();
    }, []);

    // Show splash always on app start
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    if (checking) return null;

    if (!isConnected) {
        return <NoInternet onRetry={() => {
            setChecking(true);
            NetInfo.fetch().then(state => {
                setIsConnected(state.isConnected);
                setChecking(false);
            });
        }} />;
    }

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            animation: 'fade',
            gestureEnabled: true,
            animationEnabled: true,
            transitionSpec: {
                open: springConfig,
                close: springConfig,
            },
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromRightAndroid,
        }}
        // initialRouteName='AuthStack'
        >
            {showSplash ? (
                <Stack.Screen name="Splash" component={Splash} />
            ) : token ? (
                <Stack.Screen name="StackScreens" component={StackScreens} />
            ) : (
                <Stack.Screen name="AuthStack" component={AuthStack} />
            )}
        </Stack.Navigator>
    );
}