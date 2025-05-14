import React, { createContext, useContext, useState } from 'react';

const OnboardingContext = createContext();

export const OnboardingProvider = ({ children }) => {
  const [onboardingData, setOnboardingData] = useState({
    full_name: '',
    username: '',
    email: '',
    avatar_url: '',
    bio: '',
    interests: [],
    location: null,
    date_preferences: {},
    date_of_birth: '',
  });

  const updateOnboardingData = (newData) => {
    setOnboardingData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <OnboardingContext.Provider value={{ onboardingData, updateOnboardingData }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => useContext(OnboardingContext);