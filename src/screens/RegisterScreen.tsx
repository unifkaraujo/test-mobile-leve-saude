import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { db, auth } from '../lib/firebase';
import { useAppNavigation } from '../hooks/useAppNavigation';
import { setDoc, doc } from 'firebase/firestore';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigation = useAppNavigation();

  const handleCadastro = async () => {
    if (!nome || !email || !senha) {
      return Alert.alert('Preencha todos os campos');
    }

    setCarregando(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        senha,
      );

      await updateProfile(userCredential.user, {
        displayName: nome,
      });

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        nome,
        email,
        criadoEm: new Date(),
      });

      navigation.navigate('Home');
    } catch (error: any) {
      Alert.alert('Erro ao cadastrar', error.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.titulo}>Criar conta</Text>

        <TextInput
          placeholder="Nome"
          placeholderTextColor="#888"
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />

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
          style={[styles.botao, carregando && styles.botaoDesabilitado]}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  form: {
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: 400,
    padding: 24,
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  botaoDesabilitado: {
    opacity: 0.7,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    color: '#2563eb',
    textAlign: 'center',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
