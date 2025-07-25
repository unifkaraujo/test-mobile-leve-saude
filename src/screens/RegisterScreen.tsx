import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useAppNavigation } from '../hooks/useAppNavigation';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigation = useAppNavigation();

  const handleCadastro = async () => {
    if (!email || !senha) {
      return Alert.alert('Preencha todos os campos');
    }

    setCarregando(true);
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      navigation.navigate('Home');
    } catch (error: any) {
      Alert.alert('Erro ao cadastrar', error.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Criar conta</Text>

      <TextInput
        placeholder="E-mail"
        placeholderTextColor="#888"
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#888"
        style={styles.input}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity
        style={[styles.botao, carregando && { opacity: 0.7 }]}
        onPress={handleCadastro}
        disabled={carregando}
      >
        <Text style={styles.botaoTexto}>
          {carregando ? 'Cadastrando...' : 'Cadastrar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Já tem conta? Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 20,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#111827',
    textAlign: 'center',
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
  botao: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 16,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    color: '#2563eb',
    textAlign: 'center',
  },
});
