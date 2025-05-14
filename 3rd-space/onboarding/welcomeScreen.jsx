import { StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import ThemedLogo from '../../components/ThemedLogo';
import Spacer from '../../components/Spacer';
import ThemedCard from '../../components/ThemedCard';

export default function WelcomeScreen() {
  const router = useRouter();
  return (
    <ThemedView style={styles.container}>
      <ThemedCard style={styles.card}>
        <ThemedLogo style={styles.logo} />
        <Spacer height={20} />
        <ThemedText title={true} style={styles.title}>
          Welcome to 3rd Space
        </ThemedText>
        <Spacer height={10} />
        <ThemedText style={styles.subtitle}>
          Your journey to meaningful connections starts here.
        </ThemedText>
        <Spacer height={30} />
        <Button title="Get Started" onPress={() => router.push('/onboarding/Step1BasicInfo')} />
      </ThemedCard>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    alignItems: 'center',
    padding: 30,
    borderRadius: 12,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});