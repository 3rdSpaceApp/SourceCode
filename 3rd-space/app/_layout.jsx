import { StatusBar, StyleSheet, Text, View, useColorScheme } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Colors } from '../constants/Colors'

const RootLayout = () => {
    const colorScheme = useColorScheme()
    console.log(colorScheme)
    const theme = Colors[colorScheme] ?? Colors.light 
    console.log(theme)
    return (
            <>
            <StatusBar value = "auto" /> 
            <Stack screenOptions={{
                headerStyle: {
                    backgroundColor: theme.navBackground,
                },
                headerTintColor: theme.title,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}> 
                <Stack.Screen name = "index" options = {{title: "Home"}} />
                <Stack.Screen name = "about" options = {{title: 'About'}} />
                <Stack.Screen name = "contact" options = {{title: 'Contact'}} />
            </Stack>
            </>
            

    )
}

export default RootLayout

const styles = StyleSheet.create({})