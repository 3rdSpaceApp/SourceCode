import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../utils/supabaseClient.ts';

export default function SignupScreen (){
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (password !== confirmPassword){
            Alert.alert('Error', "Passwords do not match");
            return;
        }

        setLoading(true)
        const {error} = await supabase.auth.signUp({email, password});

        if (error) {
            Alert.alert('Signup failed', error.message);
        }
        else {
            Alert.alert ("Check your email", "A confirmation link has been sent");
            navigation.navigate("Onboarding", { screen: "Step1_NameUsername" });
        }

    };
   return (
    <View style = {styles.container}>
        <Text style = {styles.title}> Create an Account </Text>
        <TextInput
            placeholder='Email'
            autoCapitalize='none'
            keyboardType='email-address'
            value = {email}
            onChangeText={setEmail}
            style = {styles.input}
        />
        <TextInput
            placeholder='Password'
            secureTextEntry
            value = {password}
            onChangeText={setPassword}
            style = {styles.input}
        />
        <TextInput
            placeholder='Confirm Password'
            secureTextEntry
            value = {confirmPassword}
            onChangeText={setConfirmPassword}
            style = {styles.input}
        />
        <Button title = {loading ? 'Signing up...': "Sign Up"} onPress={handleSignup} disabled = {loading} />
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style = {styles.link}> Already have an account? Log in. </Text>
        </TouchableOpacity>
    </View>
   );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center"
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding:  10,
        borderRadius: 6,
        marginBottom: 12
    }, 
    link: {
        marginTop: 16,
        textAlign: 'center',
        color: "#007AFF"
    },


    
});