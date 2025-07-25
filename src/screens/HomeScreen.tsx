import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import FeedbackList from '../components/FeedbackList';
import { useAppNavigation } from '../hooks/useAppNavigation';

export default function Home() {
  const user = auth.currentUser;
  const navigation = useAppNavigation();

  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bem-vindo(a), {user?.email}</Text>

      <FeedbackList />

      <Button
        title="Enviar Feedback"
        onPress={() => navigation.navigate('EnviarFeedback')}
        color="#2563eb"
      />


      <Button title="Sair" onPress={handleLogout} color="#dc2626" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  welcome: { fontSize: 18, fontWeight: '600', marginBottom: 20 },
});
