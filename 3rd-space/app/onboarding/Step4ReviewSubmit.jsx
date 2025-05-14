

import React, { useState, useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { createClient } from '@supabase/supabase-js';
import { useOnboarding } from '../../contexts/onboardingContext';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';


const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export default function Step4ReviewSubmit() {
  const router = useRouter();
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchUserId = async () => {
    try {
      // Step 1: Try getting session
      const { data: sessionData } = await supabase.auth.getSession();
      let user = sessionData?.session?.user;

      // Step 2: Fallback to getUser if session is null
      if (!user) {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData?.user) {
          console.error('User not authenticated');
          router.replace('/auth/LoginSignupScreen');
          return;
        }
        user = userData.user;
      }

      updateOnboardingData({ id: user.id });
    } catch (err) {
      console.error('Failed to fetch user:', err.message);
      router.replace('/auth/LoginSignupScreen');
    } finally {
      setLoading(false);
    }
  };

  fetchUserId();
}, []);
  const handleSubmit = async () => {
  if (!onboardingData.id) {
    console.error('Missing user ID. Cannot submit.');
    return;
  }

  try {
    const { error } = await supabase
      .from('users')
      .update({
        full_name: onboardingData.full_name,
        username: onboardingData.username,
        email: onboardingData.email,
        bio: '',
        interests: onboardingData.interests,
        location: onboardingData.location,
        date_preferences: onboardingData.date_preferences,
      })
      .eq('id', onboardingData.id);

    if (error) throw error;

    console.log('User data submitted successfully');
    router.push('/home');
  } catch (err) {
    console.error('Error submitting data:', err.message);
  }
};

  // ...UI code here, e.g. a review page and submit button
  return (
    <React.Fragment>
      {/* Add your review UI here */}
            <View>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </React.Fragment>
  );
}