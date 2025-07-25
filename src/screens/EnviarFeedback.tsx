import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { useAppNavigation } from '../hooks/useAppNavigation';

export default function EnviarFeedback() {
  const [comentario, setComentario] = useState('');
  const [nota, setNota] = useState('');
  const navigation = useAppNavigation();

  const handleEnviar = async () => {
    const usuario = auth.currentUser;

    if (!comentario || !nota) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      await addDoc(collection(db, 'feedbacks'), {
        comentario,
        nota: Number(nota),
        usuarioId: usuario?.uid,
        criadoEm: serverTimestamp(),
      });

      Alert.alert('Sucesso', 'Feedback enviado com sucesso!');
      navigation.replace('Home');
    } catch (error) {
      console.error('Erro ao enviar feedback:', error);
      Alert.alert('Erro', 'Não foi possível enviar o feedback.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Comentário</Text>
      <TextInput
        style={styles.input}
        value={comentario}
        onChangeText={setComentario}
        placeholder="Digite seu feedback"
        multiline
      />

      <Text style={styles.label}>Nota (0 a 5)</Text>
      <TextInput
        style={styles.input}
        value={nota}
        onChangeText={setNota}
        placeholder="Ex: 5"
        keyboardType="numeric"
      />

      <Button title="Enviar" onPress={handleEnviar} color="#16a34a" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
});
