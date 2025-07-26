import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface FabButtonProps {
  onPress: () => void;
  iconName?: string;
  iconSize?: number;
}

const FabButton: React.FC<FabButtonProps> = ({
  onPress,
  iconName = 'plus',
  iconSize = 24,
}) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <Icon name={iconName} size={iconSize} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1F2937',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default FabButton;
