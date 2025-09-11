import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootNavigation from './navigations'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GOOGLE_CLIENT_ID } from "@env"



const Root = () => {

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: GOOGLE_CLIENT_ID,
            offlineAccess: true
        });
    }, []);


    return (
        <NavigationContainer>
            <RootNavigation />
        </NavigationContainer>
    )
}

export default Root
