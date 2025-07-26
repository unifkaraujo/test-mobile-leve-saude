import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { auth } from '../lib/firebase';
import { format } from 'date-fns';

interface Feedback {
  id: string;
  comentario: string;
  nota: number;
  criadoEm: Date;
}

function Stars({ count }: { count: number }) {
  return <Text>{Array.from({ length: count }, () => '⭐').join('')}</Text>;
}

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, 'feedbacks'),
        where('usuarioId', '==', user.uid),
      );

      const snapshot = await getDocs(q);
      const lista: Feedback[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        comentario: doc.data().comentario,
        nota: doc.data().nota,
        criadoEm: doc.data().criadoEm.toDate(),
      }));

      setFeedbacks(lista);
      setLoading(false);
    };

    fetchFeedbacks();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seus Feedbacks</Text>

      {loading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <FlatList
          data={feedbacks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.starsRow}>
                <Stars count={item.nota} />
              </View>

              <Text style={styles.comentario}>{item.comentario}</Text>

              <Text style={styles.data}>
                {format(new Date(item.criadoEm), 'dd/MM/yyyy, HH:mm:ss')}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F4F6',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: '#111827',
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    borderLeftWidth: 2,
    borderLeftColor: '#374151',
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  comentario: {
    fontSize: 16,
    lineHeight: 22,
    color: '#374151',
    marginBottom: 12,
    fontWeight: '500',
  },
  data: {
    fontSize: 13,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
});
