import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../lib/firebase';
import FeedbackList from '../components/FeedbackList';
import { useAppNavigation } from '../hooks/useAppNavigation';
import { HeaderHome } from '../components/Header';
import Layout from '../components/Layout';
import Loading from '../components/Loading';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const navigation = useAppNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <View style={styles.container}>
        <HeaderHome />
        <View style={styles.main}>
          <Text style={styles.welcome}>Bem-vindo(a), {user?.displayName}</Text>
          <FeedbackList />
        </View>

        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('EnviarFeedback')}
        >
          <Text style={styles.fabIcon}>＋</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  main: {
    flex: 1,
    padding: 20,
  },
  welcome: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    color: '#111827',
  },
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
  fabIcon: {
    color: '#fff',
    fontSize: 28,
    lineHeight: 32,
    marginTop: -2,
  },
});
