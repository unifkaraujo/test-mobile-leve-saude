import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../lib/firebase';
import FeedbackList from '../components/FeedbackList';
import { useAppNavigation } from '../hooks/useAppNavigation';
import { HeaderHome } from '../components/Header';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import FabButton from '../components/FabButton';

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

        <FabButton onPress={() => navigation.navigate('EnviarFeedback')} />
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
});
