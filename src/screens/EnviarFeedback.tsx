import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { useAppNavigation } from '../hooks/useAppNavigation';
import { HeaderPaginas } from '../components/Header';
import Layout from '../components/Layout';

export default function EnviarFeedback() {
  const [comentario, setComentario] = useState('');
  const [nota, setNota] = useState('');
  const navigation = useAppNavigation();

  const [loading, setLoading] = useState(false);

  const handleEnviar = async () => {
    const usuario = auth.currentUser;

    if (!comentario || !nota) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    if (comentario.trim().length < 10) {
      Alert.alert('Erro', 'O comentário deve ter no mínimo 10 caracteres.');
      return;
    }

    const numeroNota = Number(nota);

    if (isNaN(numeroNota) || numeroNota < 1 || numeroNota > 5) {
      Alert.alert('Erro', 'A nota deve ser um número entre 1 e 5.');
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, 'feedbacks'), {
        comentario,
        nota: Number(nota),
        usuarioId: usuario?.uid,
        criadoEm: serverTimestamp(),
      });

      Alert.alert('Sucesso', 'Feedback enviado com sucesso!');
      navigation.replace('Home');
      setLoading(false);
    } catch (error) {
      console.error('Erro ao enviar feedback:', error);
      Alert.alert('Erro', 'Não foi possível enviar o feedback.');
      setLoading(false);
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <HeaderPaginas />

        <View style={styles.main}>
          <Text style={styles.label}>Comentário</Text>
          <TextInput
            style={[styles.input, styles.multiline]}
            value={comentario}
            onChangeText={setComentario}
            placeholder="Digite seu feedback"
            placeholderTextColor="#6b7280"
            multiline
          />

          <Text style={styles.label}>Nota (1 a 5)</Text>
          <TextInput
            style={styles.input}
            value={nota}
            onChangeText={(text) => {
              const clean = text.replace(/[^0-9]/g, '');
              if (clean === '' || (Number(clean) >= 1 && Number(clean) <= 5)) {
                setNota(clean);
              }
            }}
            placeholder="Ex: 5"
            placeholderTextColor="#6b7280"
            keyboardType="numeric"
          />

          <TouchableOpacity
            style={[styles.botao, loading && styles.buttonDisabled]}
            onPress={handleEnviar}
            disabled={loading}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.botaoTexto}>Enviar</Text>
              {loading && (
                <ActivityIndicator
                  size="small"
                  color="#fff"
                  style={{ marginLeft: 8 }}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1F2937',
  },
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  main: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
    color: '#111827',
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  botao: {
    backgroundColor: '#1F2937',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonDisabled: {
    opacity: 0.6,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
