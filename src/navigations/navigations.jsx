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
            initialRouteName="Login"
            screenOptions={({ route }) => ({
                headerShown: false,
            })} >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="OnboardingA" component={OnboardingA} />
            <Stack.Screen name="OnboardingB" component={OnboardingB} />
            <Stack.Screen name="OnboardingC" component={OnboardingC} />
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
            initialRouteName='Splash'
        >
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="AuthStack" component={AuthStack} />
            <Stack.Screen name="TabsStack" component={TabsStack} />
        </Stack.Navigator>
    );
}