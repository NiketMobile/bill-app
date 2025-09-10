import { LogBox, Platform, View } from 'react-native'
import React from 'react'
import Root from "./src/navigations/root"
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast, { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';
import { scale } from './src/utils/appScale';
import { colors } from './src/constant/colors';
import { fonts } from './src/constant/fonts';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from './src/redux/store';



const App = () => {
  const isIos = Platform.OS == "ios"

  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'green', marginTop: isIos ? 40 : 40 }}
        contentContainerStyle={{ paddingHorizontal: 10, }}
        text1Style={{
          fontSize: scale(14.5),
          fontWeight: '400',
          fontFamily: fonts.regular
        }}
      />
    ),
    info: (props) => (
      <InfoToast
        {...props}
        style={{ borderLeftColor: 'blue', marginTop: isIos ? 40 : 40 }}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        text1Style={{
          fontSize: scale(14.5),
          fontWeight: '400',
          fontFamily: fonts.regular
        }}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: colors.red, marginTop: isIos ? 40 : 40 }}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        text1Style={{
          fontSize: scale(14.5),
          fontWeight: '400',
          fontFamily: fonts.regular
        }}
        text2Style={{
          fontSize: scale(14.5),
          fontWeight: '400',
          fontFamily: fonts.regular
        }}
      />
    ),
  };

  LogBox.ignoreLogs([
    'VirtualizedLists should never be nested inside plain ScrollViews',
  ]);

  return (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <Root />
            <Toast config={toastConfig} position='top' topOffset={14} />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </View>
  )
}

export default App
