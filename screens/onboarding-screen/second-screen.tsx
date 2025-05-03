/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import { Text, useTheme, Surface } from 'react-native-paper';
import images from '../../assets/images';

const { width } = Dimensions.get('window');

const SecondScreen = () => {
  const { colors } = useTheme();

  return (
    <Surface style={{ width, height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.surface }}>
      <Image source={images.onboardingSecondScreenImage} style={{ width: '70%', height: '70%', marginTop: 100 }} />
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: colors.primary }}>Lift</Text>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: colors.secondary }}>Your Limits</Text>
      </View>
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: colors.secondary }}>Build Your</Text>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: colors.primary }}>Strength!</Text>
      </View>
    </Surface>
  );
};

export default SecondScreen;
