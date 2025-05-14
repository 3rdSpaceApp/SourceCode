import React, { useState } from 'react';
import { StyleSheet, TextInput, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useOnboarding } from '../../contexts/onboardingContext';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import ThemedCard from '../../components/ThemedCard';
import Spacer from '../../components/Spacer';


export default function Step2Preferences() {
  const router = useRouter();
  const { onboardingData, updateOnboardingData } = useOnboarding();

  const [interests, setInterests] = useState(onboardingData.interests.join(', '));
  const [location, setLocation] = useState('');

  const handleNext = () => {
    const interestList = interests.split(',').map((i) => i.trim());
    updateOnboardingData({
      interests: interestList,
      location,
    });
    router.push('/onboarding/Step3DatePreferences');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedCard style={styles.card}>
        <ThemedText title style={styles.title}>Step 2: Preferences</ThemedText>
        <Spacer />
        <TextInput
          placeholder="Enter interests (comma separated)"
          value={interests}
          onChangeText={setInterests}
          style={styles.input}
        />
        <Spacer height={10} />
        <TextInput
          placeholder="Location (City, State)"
          value={location}
          onChangeText={setLocation}
          style={styles.input}
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