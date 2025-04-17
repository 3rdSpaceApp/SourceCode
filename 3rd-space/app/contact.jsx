import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
// Components and themes

import ThemedText from '../components/ThemedText'
import Spacer from '../components/Spacer'
import ThemedView from '../components/ThemedView'

const Contact = () => {
  return (
    <ThemedView style = {styles.container}>
      <ThemedText style = {styles.title}> Contact Page</ThemedText>

       <Link href = "/" style = {styles.link}> 
       <ThemedText>Back Home</ThemedText> </Link>
    </ThemedView>
  )
}

export default Contact

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

