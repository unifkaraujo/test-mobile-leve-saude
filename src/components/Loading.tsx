// components/LoadingIndicator.tsx
import React from 'react';
import { View, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';

interface LoadingProps {
  size?: 'small' | 'large' | number;
  color?: string;
  containerStyle?: ViewStyle;
}

const Loading: React.FC<LoadingProps> = ({
  size = 'large',
  color = '#000000',
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
