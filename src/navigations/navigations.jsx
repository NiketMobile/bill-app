import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/tabScreens/home';
import Article from '../screens/tabScreens/article';
import Bill from '../screens/tabScreens/bill';
import Liked from '../screens/tabScreens/liked';
import Profile from '../screens/tabScreens/profile';
import { CustomTab } from './customTab';
import Login from '../screens/authScreens/login';
import Splash from '../screens/stackScreens/splash';
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



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabsStack() {

    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTab {...props} />}
            screenOptions={{ headerShown: false }} >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Article" component={Article} />
            <Tab.Screen name="Bill" component={Bill} />
            <Tab.Screen name="Liked" component={Liked} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    )
}

function AuthStack() {

    return (
        <Stack.Navigator
            initialRouteName="OnboardingO"
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


export default function RootNavigation() {
    // const dispatch = useDispatch()
    // const token = useSelector((state) => state?.userInfo.isToken);
    // const [isConnected, setIsConnected] = useState(true);
    // const [checking, setChecking] = useState(true);

    // useEffect(() => {
    //     const unsubscribe = NetInfo.addEventListener(state => {
    //         setIsConnected(state?.isConnected);
    //         setChecking(false);
    //     });
    //     // Initial fetch in case event listener misses it
    //     NetInfo.fetch().then(state => {
    //         setIsConnected(state?.isConnected);
    //         setChecking(false);
    //     });

    //     return () => unsubscribe();
    // }, []);

    // if (checking ) return null;

    // if (!isConnected) {
    //     return <NoInternet onRetry={() => {
    //         setChecking(true);
    //         NetInfo.fetch().then(state => {
    //             setIsConnected(state.isConnected);
    //             setChecking(false);
    //         });
    //     }} />;
    // }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}
            initialRouteName='AuthStack'
        >
            {/* <Stack.Screen name="Splash" component={Splash} /> */}
            <Stack.Screen name="AuthStack" component={AuthStack} />
            <Stack.Screen name="TabsStack" component={TabsStack} />
        </Stack.Navigator>
    );
}