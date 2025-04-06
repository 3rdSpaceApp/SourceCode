import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useOnboarding } from '../../context/OnboardingContext.tsx';


type OnboardingStackParamList = {
    Step2_AvatarUpload: undefined;
};

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'Step2_AvatarUpload'>;

const Step1_NameUsername = () => {
  const navigation = useNavigation<NavigationProp>();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { setOnboardingData } = useOnboarding();

  const handleNext = () => {
    if (firstName && lastName) {
      // Save to context/store here
      setOnboardingData({firstName, lastName});
      navigation.navigate('Step2_AvatarUpload');
    }
  };
  useEffect(() => {
    console.log('✅ Step1_NameUsername mounted');
  }, []); 

  console.log('Rendering Step1_NameUsername');
  return (
    
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
    <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}> <Text>TEST RENDER</Text>
        
        <Text style={styles.stepText}>Step 1 of 5</Text>
        <Text style={styles.title}>What's your name?</Text>
        <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
            returnKeyType="next"
        />
        <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
            returnKeyType="done"
        />
        <Button title="Next" onPress={handleNext} disabled={!firstName || !lastName} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

  );
};

export default Step1_NameUsername;

const styles = StyleSheet.create({
    
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  stepText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
    textAlign: 'center',
  },
  
});
