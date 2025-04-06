import React, { createContext, useState, useContext, ReactNode } from 'react';

type OnboardingData = {
  firstName: string;
  lastName: string;
};

type OnboardingContextType = {
  onboardingData: OnboardingData;
  setOnboardingData: (data: Partial<OnboardingData>) => void;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [onboardingData, setData] = useState<OnboardingData>({
    firstName: '',
    lastName: '',
  });

  const setOnboardingData = (data: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...data }));
  };

  return (
    <OnboardingContext.Provider value={{ onboardingData, setOnboardingData }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
};