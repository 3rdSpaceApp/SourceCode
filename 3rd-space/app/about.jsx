import { StyleSheet, Text, Image, useColorScheme} from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

// Components and themes
import { Colors } from '../constants/Colors'
import ThemedText from '../components/ThemedText'
import Spacer from '../components/Spacer'
import ThemedView from '../components/ThemedView'


const About = () => {


    const colorScheme = useColorScheme()
    console.log(colorScheme)
    const theme = Colors[colorScheme] ?? Colors.light 
    console.log(theme)

    return (
        <ThemedView style = {[styles.container, {backgroundColor: theme.background}]}>
        <ThemedText style = {styles.title}>About Page</ThemedText>

        <Link href = "/" style = {styles.link}> 
            <ThemedText> Back Home </ThemedText></Link>
        </ThemedView>
    )
}

export default About

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    }, 
    title: {
        fontWeight: 'bold',
        fontSize: 18, 
    }, 
    card: {
        backgroundColor: "EEEEEE",
        padding: 20,
        borderRadius: 10,
        boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.1)',
    },

    img: {
        marginVertical: 20
    },

    link: {
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'red',
    }

})

