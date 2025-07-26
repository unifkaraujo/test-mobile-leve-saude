import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { db, auth } from '../lib/firebase';
import { useAppNavigation } from '../hooks/useAppNavigation';
import { setDoc, doc } from 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';

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

        <View style={styles.inputContainer}>
          <MaterialIcons
            name="person"
            size={20}
            color="#9ca3af"
            style={styles.icon}
          />
          <TextInput
            placeholder="Nome"
            placeholderTextColor="#9ca3af"
            style={styles.input}
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons
            name="email"
            size={20}
            color="#9ca3af"
            style={styles.icon}
          />
          <TextInput
            placeholder="E-mail"
            placeholderTextColor="#9ca3af"
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons
            name="lock"
            size={20}
            color="#9ca3af"
            style={styles.icon}
          />
          <TextInput
            placeholder="Senha"
            placeholderTextColor="#9ca3af"
            style={styles.input}
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        <TouchableOpacity
          style={[styles.botao, carregando && styles.botaoDesabilitado]}
          onPress={handleCadastro}
          disabled={carregando}
        >
          <View style={styles.botaoContent}>
            <Text style={styles.botaoTexto}>Cadastrar</Text>
            {carregando && <ActivityIndicator size="small" color="#fff" />}
          </View>
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
    gap: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#111827',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    color: '#111827',
    fontSize: 16,
  },
  botao: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  botaoDesabilitado: {
    opacity: 0.5,
  },
  botaoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    color: '#646cff',
    textAlign: 'center',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  linkIcon: {
    marginLeft: 4,
  },
});
