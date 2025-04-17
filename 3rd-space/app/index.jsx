// This is the main entry point for the React Native application.
// It imports the necessary libraries and components, and registers the main application component.

import { StyleSheet, Text } from 'react-native'
import { Link } from 'expo-router'


// Themed componenets
import ThemedView from '../components/ThemedView'
import ThemedLogo from '../components/ThemedLogo'
import Spacer from '../components/Spacer'
import ThemedText from '../components/ThemedText'


const Home = () => {
  return (
    <ThemedView style = {styles.container}>

        <ThemedLogo  style = {styles.img} />
        <Spacer height = {10} />
        

        <ThemedText style = {styles.title}>The Number 1</ThemedText>

        <Spacer height = {10} />

        <ThemedText> Dating App </ThemedText>
        
        <Spacer height = {10} />

        <Link href = "/about" style = {styles.link}>
            <ThemedText> About page</ThemedText> </Link>
        <Link href = "/contact" style = {styles.link}> 
            <ThemedText> Contact Page </ThemedText> </Link>
        

      
    </ThemedView>
  )
}

export default Home

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
        width: 200,
        height: 200
    },
    link: {
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'blue',
    }


})


