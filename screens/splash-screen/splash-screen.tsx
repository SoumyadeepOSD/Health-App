import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import images from '../../assets/images';
import { useNavigation } from '@react-navigation/native';
import { loadStoreAuth, useAuthStore } from '../../store/authStore';
import { ActivityIndicator } from 'react-native-paper';
import { useUserProfile } from '../../hooks/useUserProfile';

export const isJwtExpiredError = (err: unknown) =>
  (err as Error)?.message?.toLowerCase().includes('jwt');

const SplashScreen = () => {
  const navigator = useNavigation<any>();
  const [storeLoaded, setStoreLoaded] = useState(false);

  // Load auth state first
  useEffect(() => {
    loadStoreAuth().then(() => setStoreLoaded(true));
  }, []);

  const { accessToken, logout } = useAuthStore.getState();

  // Fetch profile after store is ready
  const { data: profile, error, isFetching } = useUserProfile(storeLoaded);

  useEffect(() => {
    if (!storeLoaded || isFetching) return;

    if (error && isJwtExpiredError(error)) {
      console.log('JWT expired — navigating to Login');
      logout();
      navigator.replace('Login');
      return;
    }

    if (accessToken) {
      // ✅ Use fetched profile data, not Zustand
      if (profile?.is_profile_completed) {
        navigator.replace('Home');
      } else {
        navigator.replace('ProfileCompletion');
      }
    } else {
      navigator.replace('Onboarding');
    }
  }, [error, profile, accessToken, navigator, isFetching, storeLoaded, logout]);

  return (
    <SafeAreaView style={Styles.CONTAINER}>
      <View>
        <Image source={images.appLogo} style={Styles.IMAGE} />
        <Text style={Styles.TEXT}>HealthVibe</Text>
        {isFetching && (
          <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const Styles = StyleSheet.create({
  CONTAINER: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
  },
  TEXT: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  IMAGE: {
    width: 100,
    height: 100,
  },
});
