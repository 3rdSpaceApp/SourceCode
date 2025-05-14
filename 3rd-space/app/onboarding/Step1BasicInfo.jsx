import React, { useState } from 'react';
import { StyleSheet, TextInput, Button } from 'react-native';
import { useRouter } from 'expo-router';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import ThemedCard from '../../components/ThemedCard';
import Spacer from '../../components/Spacer';
import { useOnboarding } from '../../contexts/onboardingContext';

export default function Step1BasicInfo() {
  const router = useRouter();
  const { onboardingData, updateOnboardingData } = useOnboarding();

  const [fullName, setFullName] = useState(onboardingData.full_name);
  const [username, setUsername] = useState(onboardingData.username);
  const [email, setEmail] = useState(onboardingData.email);

  const handleNext = () => {
    updateOnboardingData({
      full_name: fullName,
      username,
      email,
    });
    router.push('/onboarding/Step2Preferences');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedCard style={styles.card}>
        <ThemedText title style={styles.title}>Step 1: Basic Info</ThemedText>
        <Spacer />
        <TextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
        />
        <Spacer height={10} />
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <Spacer height={10} />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />
        <Spacer height={30} />
        <Button title="Next" onPress={handleNext} />
      </ThemedCard>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});