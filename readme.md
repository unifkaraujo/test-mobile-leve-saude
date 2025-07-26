# 📱 App Mobile (Leve Saúde)

Aplicativo feito em React Native com objetivo de permitir que usuários enviem feedbacks e consultem os feedbacks enviados.

## ✅ Funcionalidades

- Autenticação com Firebase (email e senha)
- Envio de feedback com nota e comentário
- Listagem de feedbacks enviados pelo usuário logado
- Persistência dos dados com Firebase Firestore
- Estilização com `StyleSheet`
- EAS Build configurado (modo desenvolvimento)
- Uso de TypeScript, Eslint e Prettier

## 🚀 Instalação

```bash
git clone https://github.com/unifkaraujo/test-mobile-leve-saude.git
cd test-mobile-leve-saude
npm install
```

## 📲 Executando em ambiente de desenvolvimento

```bash
npx expo start --dev-client
```

É necessário ter o app com o build de desenvolvimento instalado:
🔗 [Baixar APK (modo desenvolvimento)](https://expo.dev/accounts/kaiquescpc/projects/test-mobile-leve-saude/builds/48a62fc1-0e1d-4fed-a6a4-84d675812d37)

**Observação importante:**

Na primeira vez que executar o app em modo desenvolvimento, pode ser necessário escanear o QR code com o Expo Go para que a conexão com o servidor seja estabelecida. Após isso, o app instalado via build de desenvolvimento funcionará normalmente sem precisar do QR code.

## 🧪 Como testar

1. Crie um cadastro ou faça login com seu e-mail e senha

2. Envie um feedback (nota + comentário)

3. Acesse a tela de listagem para visualizar seus feedbacks
