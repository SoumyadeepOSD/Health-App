/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { IconButton, Text, useTheme, Surface } from 'react-native-paper';
import FirstScreen from './first-screen';
import SecondScreen from './second-screen';
import ThirdScreen from './third-screen';
import { useNavigation } from '@react-navigation/native';
import Indicator from '../../components/onboarding/indicator';
import { useAuthStore } from '../../store/authStore';

const { width } = Dimensions.get('window');
const accessToken = useAuthStore.getState().accessToken;

const OnboardingBaseLayout = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const scrollRef = useRef<any | null>(null);
  const navigation = useNavigation<any>();
  const { colors } = useTheme();

  const handleSwipe = (event: any) => {
    const pageOffset = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(pageOffset / width);
    setPageIndex(currentIndex);
  };

  const onRightSwipe = () => {
    if (pageIndex < 2) {
      scrollRef.current?.scrollTo({ x: (pageIndex + 1) * width, animated: true });
    }
  };

  const onGetStarted = () => accessToken ? navigation.replace('Login') : navigation.replace('Signup');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        onScroll={handleSwipe}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      >
        <FirstScreen />
        <SecondScreen />
        <ThirdScreen />
      </ScrollView>

      <Surface style={{ width, paddingVertical: 20, alignItems: 'center', elevation: 4 }}>
        <Text style={{ color: colors.onSurfaceVariant, fontSize: 16 }}>Skip</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 12 }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Indicator isActive={i === pageIndex} key={i} />
          ))}
        </View>

        <IconButton
          icon={pageIndex < 2 ? 'arrow-right-thin-circle-outline' : 'check-circle'}
          iconColor={colors.primary}
          size={40}
          onPress={pageIndex < 2 ? onRightSwipe : onGetStarted}
        />
      </Surface>
    </View>
  );
};

export default OnboardingBaseLayout;
