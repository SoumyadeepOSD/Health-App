/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Button, Text, Card, ActivityIndicator } from 'react-native-paper';
import { useUserProfile } from '../hooks/useUserProfile';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../store/authStore';

const Home = () => {
  const navigation = useNavigation<any>();
  const { accessToken, userId, logout } = useAuthStore.getState();
  const { data: userProfile, isLoading, isError } = useUserProfile();

  useEffect(() => {
    if (!accessToken || !userId) {
      navigation.replace('Login');
    }
  }, [accessToken, userId, navigation]);

  const handleNavigate = () => {
    navigation.navigate('About');
  };

  const handleLogout = () => {
    logout();
    navigation.replace('Login');
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator animating size="large" />
        <Text style={{ marginTop: 16 }}>Loading profile...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text variant="titleMedium">❌ Error loading profile</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>🏠 Home</Text>

      <Card style={styles.card}>
        <Card.Content style={styles.profileContainer}>
          {userProfile?.avatar_url ? (
            <Avatar.Image size={100} source={{ uri: userProfile.avatar_url }} />
          ) : (
            <Avatar.Icon size={100} icon="account" />
          )}
          <View style={{ marginTop: 16 }}>
            <Text variant="titleMedium">Full Name: {userProfile?.full_name}</Text>
            <Text variant="bodyMedium">Email: {userProfile?.email}</Text>
          </View>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        icon="information"
        onPress={handleNavigate}
        style={styles.button}
      >
        Go to About
      </Button>

      <Button
        mode="outlined"
        icon="logout"
        onPress={handleLogout}
        style={styles.button}
      >
        Logout
      </Button>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    marginBottom: 20,
    color: 'white',
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#1f1f1f',
  },
  profileContainer: {
    alignItems: 'center',
  },
  button: {
    marginVertical: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
});
