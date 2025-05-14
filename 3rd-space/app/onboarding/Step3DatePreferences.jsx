import React, { useState } from 'react';
import { StyleSheet, TextInput, Button } from 'react-native';
import { useRouter } from 'expo-router';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import ThemedCard from '../../components/ThemedCard';
import Spacer from '../../components/Spacer';
import { useOnboarding } from '../../contexts/onboardingContext';

export default function Step3DatePreferences() {
  const router = useRouter();
  const { onboardingData, updateOnboardingData } = useOnboarding();

  const [venueTypes, setVenueTypes] = useState(onboardingData.date_preferences?.venue_types?.join(', ') || '');
  const [activities, setActivities] = useState(onboardingData.date_preferences?.activities?.join(', ') || '');

  const handleNext = () => {
    const preferences = {
      venue_types: venueTypes.split(',').map((v) => v.trim()),
      activities: activities.split(',').map((a) => a.trim()),
    };

    updateOnboardingData({ date_preferences: preferences });
    router.push('/onboarding/Step4ReviewSubmit'); // or wherever the next step is
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedCard style={styles.card}>
        <ThemedText title style={styles.title}>Step 3: Date Preferences</ThemedText>
        <Spacer />
        <TextInput
          placeholder="Preferred venues (e.g. cafes, parks)"
          value={venueTypes}
          onChangeText={setVenueTypes}
          style={styles.input}
        />
        <Spacer height={10} />
        <TextInput
          placeholder="Activities you enjoy (e.g. hiking, games)"
          value={activities}
          onChangeText={setActivities}
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