import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { supabase } from '../src/config/supabase';
import { OnboardingProvider } from '../contexts/onboardingContext';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  const router = useRouter();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      console.log('SessionData:', sessionData);
      console.log('✅ URL:', SUPABASE_URL);
      console.log('✅ KEY:', SUPABASE_ANON_KEY);

      // ✅ Step 1: Redirect to login if not authenticated
      if (sessionError || !sessionData?.session?.user) {
        console.error('User not authenticated');
        router.replace('/auth/LoginSignupScreen');
        return;
      }

      const user = sessionData.session.user;

      // ✅ Step 2: Fetch profile
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError || !profile) {
        router.replace('/onboarding/WelcomeScreen');
        return;
      }

      // ✅ Step 3: Check if onboarding is complete
      const isProfileComplete =
        profile.username &&
        profile.interests?.length > 0 &&
        profile.date_preferences;

      if (!isProfileComplete) {
        router.replace('/onboarding/WelcomeScreen');
      }

      // ✅ else: user is authenticated and fully onboarded
    };

    checkOnboardingStatus();
  }, []);

  return (
    <OnboardingProvider>
      <StatusBar value="auto" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.navBackground },
          headerTintColor: theme.title,
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'index' }} />
        <Stack.Screen name="about" options={{ title: 'About' }} />
        <Stack.Screen name="contact" options={{ title: 'Contact' }} />
      </Stack>
    </OnboardingProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});