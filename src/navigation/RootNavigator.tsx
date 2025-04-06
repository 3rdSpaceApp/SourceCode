
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator.tsx';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Step1_NameUsername from '../screens/onboarding/Step1_NameUsername.tsx';


const Stack = createNativeStackNavigator();


const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Auth">
      <Stack.Screen name="Auth" component={AuthNavigator} />
    </Stack.Navigator>
  );
};

export default RootNavigator;