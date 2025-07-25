import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
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

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, 'feedbacks'),
        where('usuarioId', '==', user.uid)
      );

      const snapshot = await getDocs(q);
      const lista: Feedback[] = snapshot.docs.map(doc => ({
        id: doc.id,
        comentario: doc.data().comentario,
        nota: doc.data().nota,
        criadoEm: doc.data().criadoEm.toDate(),
      }));

      setFeedbacks(lista);
    };

    fetchFeedbacks();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seus Feedbacks</Text>
      <FlatList
        data={feedbacks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nota}>Nota: {item.nota}⭐</Text>
            <Text style={styles.comentario}>{item.comentario}</Text>
            <Text style={styles.data}>{format(item.criadoEm, 'dd/MM/yyyy')}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
  },
  nota: { fontWeight: '600', marginBottom: 4 },
  comentario: { marginBottom: 6 },
  data: { fontSize: 12, color: '#555' },
});
