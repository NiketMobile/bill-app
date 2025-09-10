import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";
import { scale } from "../../../utils/appScale"; // assuming you have scale util
import { useNavigation } from "@react-navigation/native";
import { images } from "../../../constant/images";
import Wrapper from "../../../components/wrapper";
import { colors } from "../../../constant/colors";

const { width, height } = Dimensions.get("window");

const imagesData = [
  require("../../../assets/images/Splash.png"),
  require("../../../assets/images/Splash1.png"),
  require("../../../assets/images/Splash2.png"),
];

const logo = require("../../../assets/images/logo.png");

const Splash = () => {
  const navigation = useNavigation()
  const [isToken, setIsToken] = useState(false)

  const opacity1 = useSharedValue(1);
  const opacity2 = useSharedValue(0);
  const opacity3 = useSharedValue(0);


  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('AuthStack', { screen: 'Login' });
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigation]);


  useEffect(() => {
    opacity1.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000 }),
        withTiming(0.3, { duration: 1000 }),
        withTiming(0.3, { duration: 1000 })
      ),
      -1
    );

    opacity2.value = withRepeat(
      withSequence(
        withTiming(0.3, { duration: 1000 }),
        withTiming(1, { duration: 1000 }),
        withTiming(0.3, { duration: 1000 })
      ),
      -1
    );

    opacity3.value = withRepeat(
      withSequence(
        withTiming(0.3, { duration: 1000 }),
        withTiming(0.3, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1
    );
  }, []);

  const animatedStyle1 = useAnimatedStyle(() => ({ opacity: opacity1.value }));
  const animatedStyle2 = useAnimatedStyle(() => ({ opacity: opacity2.value }));
  const animatedStyle3 = useAnimatedStyle(() => ({ opacity: opacity3.value }));

  return (
    <Wrapper barStyle="dark-content" isFullView={true}>
      <View style={styles.container}>
        <Animated.Image
          source={imagesData[0]}
          style={[styles.image, animatedStyle1]}
          resizeMode="cover"
        />
        <Animated.Image
          source={imagesData[1]}
          style={[styles.image, animatedStyle2]}
          resizeMode="cover"
        />
        <Animated.Image
          source={imagesData[2]}
          style={[styles.image, animatedStyle3]}
          resizeMode="cover"
        />
        <View style={styles.logoContainer}>
          <Image
            source={images.logo_v1}
            style={{
              width: scale(270),
              height: scale(170),
              resizeMode: "contain",
            }}
          />
        </View>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Splash;
