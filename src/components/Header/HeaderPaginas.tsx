import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppNavigation } from '../../hooks/useAppNavigation';

export default function HeaderPaginas() {
  const navigation = useAppNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Enviar Feedback</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1F2937',
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    marginTop: -5,
  },
  backText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
