import { initializeApp } from 'firebase/app';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import * as FirebaseAuth from 'firebase/auth';

const reactNativePersistence = (FirebaseAuth as any).getReactNativePersistence;

const firebaseConfig = {
  apiKey: 'AIzaSyDP6i7mCJi_I4HTr5Z-zztf2MtrJxvo-h0',
  authDomain: 'feedbackhub-117ad.firebaseapp.com',
  projectId: 'feedbackhub-117ad',
  storageBucket: 'feedbackhub-117ad.firebasestorage.app',
  messagingSenderId: '254165561284',
  appId: '1:254165561284:web:1130f8dff8764c59d4be91',
};

const app = initializeApp(firebaseConfig);

const auth = FirebaseAuth.initializeAuth(app, {
  persistence: reactNativePersistence(ReactNativeAsyncStorage),
});

export { auth };
export const db = getFirestore(app);
