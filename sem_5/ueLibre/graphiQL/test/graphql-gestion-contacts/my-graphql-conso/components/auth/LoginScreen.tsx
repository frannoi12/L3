import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useMutation } from '@apollo/client';
import { LOGIN } from '@/api/mutations';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FormulaireLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { loading, error }] = useMutation(LOGIN);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    try {
      const { data } = await login({ variables: { email, password } });
      // console.log({data});
      // console.log(data.login.token);
      // console.log(data.login.user);
      

      if (data.login.token !== "  ") {
        await AsyncStorage.setItem('token', data.login.token);
        await AsyncStorage.setItem('user', JSON.stringify(data.login.user));
        Alert.alert("Connexion réussie", "Bienvenue !");
        navigation.replace('dashboard');
      } else {
        Alert.alert("Erreur", "Identifiants incorrects.");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Erreur", error?.message || "Problème de connexion.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Button title={loading ? 'Chargement...' : 'Se connecter'} onPress={handleLogin} disabled={loading} />
      {error && <Text style={styles.error}>{error.message}</Text>}
      <Button title="Pas encore de compte ? S'inscrire" onPress={() => navigation.navigate('register')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    // marginTop: 100
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default FormulaireLoginScreen;
