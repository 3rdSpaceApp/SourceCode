import { View, useColorScheme, StyleSheet} from 'react-native'
import {Colors} from '../constants/Colors'
import React from 'react'

const ThemedCard = ({ style, ...props }) => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light

    return (
        <View style = {[{
            backgroundColor: theme.uibackground}, style.card]}
            {...props}
        />
         
    )
}

export default ThemedCard

const styles = StyleSheet.create({
    card: {
        backgroundColor: "EEEEEE",
        padding: 20,
        borderRadius: 10,
        boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.1)',
    },
})