import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

interface IndicatorProps {
  isActive: boolean;
}

const Indicator: React.FC<IndicatorProps> = ({ isActive }) => {
  const { colors } = useTheme();
  const scale = useRef(new Animated.Value(1)).current;
  const animatedColor = isActive ? colors.primary : colors.surfaceDisabled;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: isActive ? 1.4 : 1,
      useNativeDriver: true,
      friction: 4,
    }).start();
  }, [isActive, scale]);

  return (
    <Animated.View
      style={[
        styles.dot,
        {
          backgroundColor: animatedColor,
          transform: [{ scale }],
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
});

export default Indicator;
