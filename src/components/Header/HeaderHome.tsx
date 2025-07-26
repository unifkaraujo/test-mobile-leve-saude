import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { signOut } from 'firebase/auth';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import { auth } from '../../lib/firebase';

export default function HeaderHome() {
  const navigation = useAppNavigation();

  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace('Login');
  };

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Dashboard</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
