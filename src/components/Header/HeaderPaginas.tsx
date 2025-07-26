import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppNavigation } from '../../hooks/useAppNavigation';

export default function HeaderPaginas() {
  const navigation = useAppNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Icon name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Enviar Feedback</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1F2937',
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
});
