import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import EnviarFeedback from '../screens/EnviarFeedback';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../components/Loading';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const stored = await AsyncStorage.getItem('user_logged');
      setInitialRoute(stored ? 'Home' : 'Login');
    };

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await AsyncStorage.setItem('user_logged', 'true');
      } else {
        await AsyncStorage.removeItem('user_logged');
      }
    });

    checkLoginStatus().finally(() => setLoading(false));

    return unsubscribe;
  }, []);

  if (loading || initialRoute === null) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={initialRoute}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="EnviarFeedback" component={EnviarFeedback} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
