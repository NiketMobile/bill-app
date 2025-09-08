import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Root from "./src/navigations/root"
import { SafeAreaProvider } from 'react-native-safe-area-context'

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Root />
      </SafeAreaProvider>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})