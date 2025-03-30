import { useMutation } from '@apollo/client';
import { LOGIN, SIGNUP } from './mutations';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuth = () => {
  const [loginMutation] = useMutation(LOGIN);
  const [signupMutation] = useMutation(SIGNUP);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await loginMutation({ variables: { email, password } });
      await AsyncStorage.setItem('authToken', data.login.token);
      return data.login.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const { data } = await signupMutation({ variables: { name, email, password } });
      await AsyncStorage.setItem('authToken', data.signup.token);
      return data.signup.user;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('authToken');
  };

  return { login, signup, logout };
};