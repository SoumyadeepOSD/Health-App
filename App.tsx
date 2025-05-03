/* eslint-disable react-native/no-inline-styles */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingBaseLayout from './screens/onboarding-screen/base-layout';
import ProfileSetupScreen from './screens/other-screen/profileSetup';
import SplashScreen from './screens/splash-screen/splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { ActivityIndicator, PaperProvider } from 'react-native-paper';
import Signup from './screens/auth-screeen/signup';
import Login from './screens/auth-screeen/login';
import { loadStoreAuth } from './store/authStore';
import { queryClient } from './lib/queryClient';
import About from './screens/about';
import Home from './screens/home';
import React, { useEffect, useState } from 'react';
import { CustomDarkTheme } from './constant/theme';


const App = () => {
  const Stack = createNativeStackNavigator();
  const [loading, setLoading] = useState(true);
  // const accessToken = useAuthStore.getState().accessToken;

  useEffect(() => {
    const init = async () => {
      await loadStoreAuth();
      setLoading(false);
    };
    init();
  }, []);
  if (loading) { return <ActivityIndicator size="large" style={{ flex: 1 }} />; }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <PaperProvider theme={CustomDarkTheme}>
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={SplashScreen} options={{
              headerShown: false,
            }} />
            <Stack.Screen name="Onboarding" component={OnboardingBaseLayout} options={{
              headerShown: false,
            }} />
            <Stack.Screen name="Signup" component={Signup} options={{
              headerShown: false,
            }} />

            <Stack.Screen name="Home" component={Home} options={{
              headerShown: false,
            }} />

            <Stack.Screen name="Login" component={Login} options={{
              headerShown: false,
            }} />

            < Stack.Screen name="ProfileCompletion" component={ProfileSetupScreen} options={{
              headerShown: false,
            }} />

            <Stack.Screen name="About" component={About} options={{
              headerShown: false,
            }} />
          </Stack.Navigator>
        </PaperProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
